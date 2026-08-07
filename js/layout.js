/**
 * Shared app layout behavior
 * - Sidebar open/close (mobile + desktop collapse)
 */
(function () {
  const shell = document.querySelector(".app-shell");
  const toggle = document.querySelector("[data-sidebar-toggle]");
  const overlay = document.querySelector(".sidebar-overlay");

  if (!shell || !toggle) return;

  function isMobile() {
    return window.matchMedia("(max-width: 960px)").matches;
  }

  function closeSidebar() {
    shell.classList.remove("sidebar-open");
    shell.classList.add("sidebar-collapsed");
  }

  function openSidebar() {
    shell.classList.remove("sidebar-collapsed");
    shell.classList.add("sidebar-open");
  }

  function toggleSidebar() {
    if (isMobile()) {
      if (shell.classList.contains("sidebar-open")) {
        shell.classList.remove("sidebar-open");
      } else {
        shell.classList.add("sidebar-open");
      }
      return;
    }

    shell.classList.toggle("sidebar-collapsed");
  }

  toggle.addEventListener("click", toggleSidebar);

  if (overlay) {
    overlay.addEventListener("click", () => {
      shell.classList.remove("sidebar-open");
    });
  }

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      shell.classList.remove("sidebar-open");
    }
  });

  // Mark active nav link from data-nav attribute or current path
  const activeKey = document.body.dataset.nav;
  if (activeKey) {
    document.querySelectorAll(".sidebar-link[data-nav]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === activeKey);
    });
  }
})();
