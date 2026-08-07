/**
 * Coordinator Projects list — GET /api/v1/projects
 * Shows empty state when none exist. Coordinators only.
 */
(function () {
  const api = window.VolunityAPI;
  if (!api) return;

  const user = api.requireAuth({ role: "COORDINATOR", loginPath: "../login.html" });
  if (!user) return;

  // Reflect logged-in coordinator in topbar when present
  const nameEl = document.querySelector(".topbar-user-name");
  if (nameEl && user.firstName) {
    nameEl.textContent = `${user.firstName}${user.lastName ? " " + user.lastName : ""}`;
  }

  const loadingEl = document.getElementById("projectsLoading");
  const emptyEl = document.getElementById("projectsEmpty");
  const filledEl = document.getElementById("projectsFilled");
  const listEl = document.getElementById("projectList");
  const errorEl = document.getElementById("projectsError");

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
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
    return { label: "Draft", cls: "planned" };
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCard(project) {
    const { label, cls } = statusMeta(project.status);
    const title = escapeHtml(project.title);
    const desc = escapeHtml(project.description || "No description provided.");
    const range = `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`;
    const detailHref = `project-detail.html?id=${encodeURIComponent(project.id)}`;

    return `
      <article class="project-card">
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

  function showList(projects) {
    loadingEl.hidden = true;
    emptyEl.hidden = true;
    filledEl.hidden = false;

    const total = projects.length;
    const active = projects.filter((p) => String(p.status).toUpperCase() === "ACTIVE").length;
    const completed = projects.filter((p) => String(p.status).toUpperCase() === "COMPLETED").length;
    const draft = projects.filter((p) => {
      const s = String(p.status).toUpperCase();
      return s === "DRAFT" || s === "PLANNED";
    }).length;

    document.getElementById("statTotal").textContent = String(total);
    document.getElementById("statActive").textContent = String(active);
    document.getElementById("statCompleted").textContent = String(completed);
    document.getElementById("statDraft").textContent = String(draft);
    document.getElementById("projectsCountLabel").textContent =
      `Showing ${total} project${total === 1 ? "" : "s"}`;

    listEl.innerHTML = projects.map(renderCard).join("");
  }

  async function loadProjects() {
    errorEl.hidden = true;
    try {
      const { response, data } = await api.apiRequest("/api/v1/projects", {
        method: "GET",
        auth: true,
      });

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to load projects");
      }

      const projects = Array.isArray(data?.data) ? data.data : [];
      // "My Projects" — only show projects created by this coordinator
      const mine = projects.filter((p) => p.createdBy === user.id);
      if (mine.length === 0) showEmpty();
      else showList(mine);
    } catch (err) {
      console.error(err);
      loadingEl.hidden = true;
      errorEl.hidden = false;
      errorEl.textContent =
        err.message || "Unable to load projects. Please try again.";
      // Still offer create CTA via empty state if fetch fails after auth
      emptyEl.hidden = false;
    }
  }

  loadProjects();
})();
