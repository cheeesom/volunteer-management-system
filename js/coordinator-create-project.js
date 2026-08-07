/**
 * Create project — POST /api/v1/projects (COORDINATOR only)
 * Body: { title, description, startDate, endDate }
 */
(function () {
  const api = window.VolunityAPI;
  if (!api) return;

  const user = api.requireAuth({ role: "COORDINATOR", loginPath: "../login.html" });
  if (!user) return;

  const nameEl = document.querySelector(".topbar-user-name");
  if (nameEl && user.firstName) {
    nameEl.textContent = `${user.firstName}${user.lastName ? " " + user.lastName : ""}`;
  }

  const form = document.getElementById("createProjectForm");
  const statusEl = document.getElementById("createProjectStatus");
  const submitBtn = form?.querySelector('[type="submit"]');

  if (!form) return;

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.className =
      "signup-status" + (type ? ` signup-status--${type}` : "");
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.dataset.originalText =
      submitBtn.dataset.originalText || submitBtn.textContent;
    submitBtn.textContent = isLoading
      ? "Creating…"
      : submitBtn.dataset.originalText;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("");

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!title || !description || !startDate || !endDate) {
      setStatus("Please fill in all required fields.", "error");
      return;
    }

    if (endDate < startDate) {
      setStatus("End date must be on or after the start date.", "error");
      return;
    }

    setLoading(true);

    try {
      const { response, data } = await api.apiRequest("/api/v1/projects", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          title,
          description,
          startDate,
          endDate,
        }),
      });

      if (!response.ok || !data?.success) {
        setStatus(
          data?.message || "Could not create project. Please try again.",
          "error",
        );
        return;
      }

      setStatus(data?.message || "Project created successfully.", "success");
      setTimeout(() => {
        window.location.href = "./projects.html";
      }, 700);
    } catch (err) {
      console.error(err);
      setStatus(
        "Unable to reach the server. Check your connection and try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  });
})();
