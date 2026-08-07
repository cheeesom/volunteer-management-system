/**
 * Coordinator Projects list
 * GET /api/v1/projects?page=1&limit=10
 */
(function () {
  const api = window.VolunityAPI;
  if (!api) return;

  const user = api.requireAuth({
    role: "COORDINATOR",
    loginPath: "../login.html",
  });
  if (!user) return;

  const nameEl = document.querySelector(".topbar-user-name");
  if (nameEl && user.firstName) {
    nameEl.textContent = `${user.firstName}${user.lastName ? " " + user.lastName : ""}`;
  }

  const LIMIT = 10;
  let currentPage = 1;

  const loadingEl = document.getElementById("projectsLoading");
  const emptyEl = document.getElementById("projectsEmpty");
  const filledEl = document.getElementById("projectsFilled");
  const listEl = document.getElementById("projectList");
  const errorEl = document.getElementById("projectsError");
  const countLabel = document.getElementById("projectsCountLabel");
  const paginationEl = document.getElementById("projectsPagination");

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      // already YYYY-MM-DD
      const parts = String(iso).split("-");
      if (parts.length === 3) {
        const dt = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return dt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      return iso;
    }
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function statusMeta(status) {
    const key = String(status || "DRAFT").toUpperCase();
    if (key === "ACTIVE") return { label: "Active", cls: "active" };
    if (key === "COMPLETED") return { label: "Completed", cls: "completed" };
    if (key === "CANCELLED" || key === "CANCELED")
      return { label: "Cancelled", cls: "absent" };
    if (key === "PLANNED") return { label: "Planned", cls: "planned" };
    // DRAFT and unknown → Planned (matches design language for upcoming)
    return { label: "Planned", cls: "planned" };
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function progressForStatus(status) {
    const key = String(status || "").toUpperCase();
    if (key === "COMPLETED") return 100;
    if (key === "ACTIVE") return 50;
    if (key === "CANCELLED" || key === "CANCELED") return 0;
    return 0;
  }

  function renderCard(project) {
    const { label, cls } = statusMeta(project.status);
    const title = escapeHtml(project.title);
    const desc = escapeHtml(project.description || "No description provided.");
    const range = `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`;
    const detailHref = `project-detail.html?id=${encodeURIComponent(project.id)}`;
    const pct = progressForStatus(project.status);

    return `
      <article class="project-card">
        <button class="icon-btn project-more" type="button" aria-label="More">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
        </button>
        <div class="project-thumb project-thumb--placeholder" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18v12H3z"/><path d="M3 11h18M8 7V5h8v2"/></svg>
        </div>
        <div class="project-body">
          <div class="project-title-row">
            <h4 class="project-title">${title}</h4>
            <span class="badge badge--${cls}">${label}</span>
          </div>
          <p class="project-desc">${desc}</p>
          <div class="project-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>
              ${range}
            </span>
          </div>
          <div class="project-progress">
            <div class="progress-item__head"><span>Progress</span><strong>${pct}%</strong></div>
            <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
          </div>
          <a class="btn btn--outline btn--sm" href="${detailHref}">
            View Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>
          </a>
        </div>
      </article>
    `;
  }

  function showEmpty() {
    loadingEl.hidden = true;
    emptyEl.hidden = false;
    filledEl.hidden = true;
  }

  function updateStats(projects, pagination) {
    const total = pagination?.total ?? projects.length;
    const active = projects.filter(
      (p) => String(p.status).toUpperCase() === "ACTIVE",
    ).length;
    const completed = projects.filter(
      (p) => String(p.status).toUpperCase() === "COMPLETED",
    ).length;
    const planned = projects.filter((p) => {
      const s = String(p.status).toUpperCase();
      return s === "DRAFT" || s === "PLANNED";
    }).length;

    document.getElementById("statTotal").textContent = String(total);
    document.getElementById("statActive").textContent = String(active);
    document.getElementById("statCompleted").textContent = String(completed);
    document.getElementById("statDraft").textContent = String(planned);
  }

  function renderPagination(pagination) {
    if (!paginationEl) return;

    const page = Number(pagination.page) || 1;
    const totalPages = Number(pagination.totalPages) || 1;
    const total = Number(pagination.total) || 0;
    const limit = Number(pagination.limit) || LIMIT;
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    countLabel.textContent = `Showing ${start} to ${end} of ${total} projects`;

    if (totalPages <= 1) {
      paginationEl.innerHTML = "";
      return;
    }

    const maxButtons = 5;
    let from = Math.max(1, page - Math.floor(maxButtons / 2));
    let to = Math.min(totalPages, from + maxButtons - 1);
    from = Math.max(1, to - maxButtons + 1);

    let buttons = `
      <button class="page-btn" type="button" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
    `;

    for (let n = from; n <= to; n++) {
      buttons += `<button class="page-btn${n === page ? " is-active" : ""}" type="button" data-page="${n}">${n}</button>`;
    }

    buttons += `
      <button class="page-btn" type="button" data-page="${page + 1}" ${page >= totalPages ? "disabled" : ""} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    `;

    paginationEl.innerHTML = buttons;
    paginationEl.querySelectorAll("[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = Number(btn.dataset.page);
        if (!next || next < 1 || next > totalPages || next === currentPage) return;
        loadProjects(next);
      });
    });
  }

  function showList(projects, pagination) {
    loadingEl.hidden = true;
    emptyEl.hidden = true;
    filledEl.hidden = false;

    updateStats(projects, pagination);
    listEl.innerHTML = projects.map(renderCard).join("");
    renderPagination(pagination || { total: projects.length, page: 1, limit: LIMIT, totalPages: 1 });
  }

  async function loadProjects(page = 1) {
    currentPage = page;
    errorEl.hidden = true;
    loadingEl.hidden = false;
    emptyEl.hidden = true;
    filledEl.hidden = true;

    try {
      const { response, data } = await api.apiRequest(
        `/api/v1/projects?page=${page}&limit=${LIMIT}`,
        {
          method: "GET",
          auth: true,
        },
      );

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to load projects");
      }

      const projects = Array.isArray(data?.data) ? data.data : [];
      const pagination = data?.pagination || {
        total: projects.length,
        page,
        limit: LIMIT,
        totalPages: projects.length ? 1 : 0,
      };

      if (!projects.length && Number(pagination.total || 0) === 0) {
        showEmpty();
        return;
      }

      showList(projects, pagination);
    } catch (err) {
      console.error(err);
      loadingEl.hidden = true;
      errorEl.hidden = false;
      errorEl.textContent =
        err.message || "Unable to load projects. Please try again.";
      emptyEl.hidden = false;
    }
  }

  loadProjects(1);
})();
