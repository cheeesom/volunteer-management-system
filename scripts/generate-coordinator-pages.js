const fs = require("fs");
const path = require("path");

const AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=faces";
const OUT = path.join(__dirname, "..", "pages", "coordinator");

fs.mkdirSync(OUT, { recursive: true });

const icons = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
  projects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18v12H3z"/><path d="M3 11h18M8 7V5h8v2"/></svg>`,
  applications: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="3"/></svg>`,
  volunteers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  tasks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg>`,
  attendance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l3 3v17H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  certificate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="4"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>`,
  message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 1 1-4-7.2L21 3l-1 4.6a8.4 8.4 0 0 1 1 3.9z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.8"/><path d="M12 17h.01"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`,
};

function sidebar(active) {
  const item = (nav, href, label, icon) => `
          <a class="sidebar-link${active === nav ? " is-active" : ""}" href="${href}" data-nav="${nav}">
            ${icon}
            ${label}
          </a>`;

  return `
      <div class="sidebar-overlay" aria-hidden="true"></div>
      <aside class="sidebar" aria-label="Main navigation">
        <a class="sidebar-brand" href="dashboard.html">
          <img src="../../assets/logo/logo.svg" alt="" />
          <span class="sidebar-brand-text">Volunity</span>
        </a>
        <nav class="sidebar-nav">
${item("dashboard", "dashboard.html", "Dashboard", icons.dashboard)}
${item("projects", "projects.html", "Projects", icons.projects)}
${item("applications", "applications.html", "Applications", icons.applications)}
${item("volunteers", "volunteers.html", "Volunteers", icons.volunteers)}
${item("tasks", "tasks.html", "Tasks", icons.tasks)}
${item("attendance", "attendance.html", "Attendance", icons.attendance)}
${item("reports", "reports.html", "Reports", icons.reports)}
${item("certificate", "certificate.html", "Certificate", icons.certificate)}
${item("message", "message.html", "Message", icons.message)}
        </nav>
        <div class="sidebar-divider"></div>
        <div class="sidebar-footer">
          <a class="sidebar-link" href="#">${icons.settings} Settings</a>
          <a class="sidebar-link" href="#">${icons.help} Help &amp; Support</a>
          <a class="sidebar-link is-danger" href="../login.html">${icons.logout} Logout</a>
        </div>
      </aside>`;
}

function topbar(titleHtml) {
  return `
        <header class="topbar">
          <div class="topbar-left">
            <button class="topbar-toggle" type="button" data-sidebar-toggle aria-label="Toggle navigation">
              <span></span><span></span><span></span>
            </button>
            <div class="topbar-title">${titleHtml}</div>
          </div>
          <div class="topbar-right">
            <a class="topbar-icon-btn" href="#" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
              <span class="topbar-badge">1</span>
            </a>
            <a class="topbar-profile" href="#" aria-label="Account">
              <img class="topbar-avatar" src="${AVATAR}" alt="" />
              <span class="topbar-user">
                <span class="topbar-user-name">Sarah Johnson</span>
                <span class="topbar-user-role">Project Coordinator</span>
              </span>
              <svg class="topbar-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
          </div>
        </header>`;
}

function wrap({ title, nav, cssExtra = "", content, scripts = "", titleHtml }) {
  const extraCss = cssExtra
    ? `<link rel="stylesheet" href="../../css/${cssExtra}" />`
    : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Volunity Coordinator</title>
    <link rel="stylesheet" href="../../css/layout.css" />
    <link rel="stylesheet" href="../../css/coordinator.css" />
    ${extraCss}
  </head>
  <body data-nav="${nav}">
    <div class="app-shell">
${sidebar(nav)}
      <div class="app-main">
${topbar(titleHtml || title)}
        <div class="page-content">
${content}
        </div>
      </div>
    </div>
    <script src="../../js/layout.js"></script>
${scripts}
  </body>
</html>
`;
}

function pagination(text, active = 1, total = 4) {
  const nums = Array.from({ length: Math.min(total, 4) }, (_, i) => i + 1)
    .map(
      (n) =>
        `<button class="page-btn${n === active ? " is-active" : ""}" type="button">${n}</button>`,
    )
    .join("");
  return `
          <div class="pagination-bar">
            <span>${text}</span>
            <div class="pagination">
              <button class="page-btn" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
              ${nums}
              <button class="page-btn" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
            </div>
          </div>`;
}

/* ===================== DASHBOARD ===================== */
const dashboard = wrap({
  title: "Dashboard",
  nav: "dashboard",
  cssExtra: "coordinator-dashboard.css",
  content: `
          <div class="page-intro-row">
            <div>
              <h2>Welcome back, Sarah!</h2>
              <p>Here's what's happening with your projects today.</p>
            </div>
            <button class="date-pill" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>
              May 1 – May 31, 2026
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>

          <section class="metric-row">
            <article class="metric-card">
              <div class="metric-card__top">
                <div class="metric-card__icon metric-card__icon--blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18v12H3z"/><path d="M3 11h18M8 7V5h8v2"/></svg></div>
                <p class="metric-card__label">Active Projects</p>
              </div>
              <p class="metric-card__value">12</p>
              <p class="metric-card__meta">+3 from last week</p>
            </article>
            <article class="metric-card">
              <div class="metric-card__top">
                <div class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                <p class="metric-card__label">Assigned Volunteers</p>
              </div>
              <p class="metric-card__value">156</p>
              <p class="metric-card__meta">+18 from last week</p>
            </article>
            <article class="metric-card">
              <div class="metric-card__top">
                <div class="metric-card__icon metric-card__icon--amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg></div>
                <p class="metric-card__label">Pending Task</p>
              </div>
              <p class="metric-card__value">28</p>
              <p class="metric-card__meta">+5 from last week</p>
            </article>
            <article class="metric-card">
              <div class="metric-card__top">
                <div class="metric-card__icon metric-card__icon--rose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
                <p class="metric-card__label">Completed Task</p>
              </div>
              <p class="metric-card__value">84</p>
              <p class="metric-card__meta">+12 from last week</p>
            </article>
          </section>

          <div class="coord-mid-grid">
            <section class="card">
              <div class="card-header">
                <h3 class="card-title">Project Progress Overview</h3>
                <a class="card-link" href="projects.html">View all</a>
              </div>
              <ul class="progress-list">
                ${[
                  ["Community Clean Up", 80],
                  ["Youth Education Program", 50],
                  ["Food Donation Drive", 40],
                  ["Tree Planting Initiative", 100],
                  ["Health Awareness Campaign", 20],
                ]
                  .map(
                    ([name, pct]) => `
                <li class="progress-item">
                  <div class="progress-item__head"><span>${name}</span><strong>${pct}%</strong></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                </li>`,
                  )
                  .join("")}
              </ul>
            </section>

            <section class="card">
              <div class="card-header"><h3 class="card-title">Today's Activities</h3></div>
              <ul class="timeline-list">
                <li><span class="timeline-dot"></span><div><strong>Team meeting</strong><p>Community Clean Up</p></div><time>09:00 AM</time></li>
                <li><span class="timeline-dot"></span><div><strong>Review volunteer application</strong><p>Shortlist new volunteers</p></div><time>01:00 PM</time></li>
                <li><span class="timeline-dot"></span><div><strong>Site visit - Clean Water Initiative</strong><p>Location: Ikorodu Community</p></div><time>01:00 PM</time></li>
                <li><span class="timeline-dot"></span><div><strong>Update project tasks</strong><p>Review and assign pending tasks</p></div><time>04:30 PM</time></li>
              </ul>
            </section>

            <section class="card">
              <div class="card-header">
                <h3 class="card-title">Recent Notifications</h3>
                <a class="card-link" href="#">View all</a>
              </div>
              <ul class="feed-list">
                <li><span class="feed-icon feed-icon--amber">!</span><div><strong>Task "Community Survey" overdue</strong><p>Due May 18 · 10m ago</p></div></li>
                <li><span class="feed-icon feed-icon--green">+</span><div><strong>12 new Volunteer applications</strong><p>1h ago</p></div></li>
                <li><span class="feed-icon feed-icon--rose">!</span><div><strong>Attendance not marked for 8 volunteers</strong><p>5h ago</p></div></li>
                <li><span class="feed-icon feed-icon--amber">!</span><div><strong>Task "Community Survey" overdue</strong><p>1h ago</p></div></li>
              </ul>
            </section>
          </div>

          <div class="coord-bottom-grid">
            <section class="card">
              <div class="card-header">
                <h3 class="card-title">Upcoming Deadlines</h3>
                <a class="card-link" href="#">View Calendar</a>
              </div>
              <div class="mini-table-wrap">
                <table class="mini-table">
                  <thead><tr><th>Task/Milestone</th><th>Project</th><th>Due Date</th></tr></thead>
                  <tbody>
                    ${Array.from({ length: 5 })
                      .map(
                        () =>
                          `<tr><td>Community Survey</td><td>Water Initiative</td><td>May 21, 2026</td></tr>`,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </section>

            <section class="card avail-card">
              <div class="card-header"><h3 class="card-title">Volunteer Availability</h3></div>
              <div class="donut-block">
                <div class="donut" aria-label="156 total volunteers">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="44" fill="none" stroke="#c8e6c9" stroke-width="14" stroke-dasharray="122 276" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="44" fill="none" stroke="#42a5f5" stroke-width="14" stroke-dasharray="110 276" stroke-dashoffset="-122" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="44" fill="none" stroke="#ffb74d" stroke-width="14" stroke-dasharray="44 276" stroke-dashoffset="-232" transform="rotate(-90 60 60)"/>
                  </svg>
                  <div class="donut-center"><strong>156</strong><span>Total</span></div>
                </div>
                <ul class="donut-legend">
                  <li><span class="swatch swatch--green"></span>Available <strong>68 (44%)</strong></li>
                  <li><span class="swatch swatch--blue"></span>Busy <strong>62 (40%)</strong></li>
                  <li><span class="swatch swatch--amber"></span>Unavailable <strong>26 (17%)</strong></li>
                </ul>
              </div>
              <button class="btn btn--outline" type="button" style="margin-top:14px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>
                View Volunteer Calendar
              </button>
            </section>

            <section class="card">
              <div class="card-header">
                <h3 class="card-title">Recent Activities</h3>
                <a class="card-link" href="#">View all</a>
              </div>
              <ul class="feed-list">
                <li><span class="feed-icon feed-icon--amber">✓</span><div><strong>Jane Doe completed a task</strong><p>2h ago</p></div></li>
                <li><span class="feed-icon feed-icon--green">+</span><div><strong>New Volunteer registered</strong><p>John Michael · 5h ago</p></div></li>
                <li><span class="feed-icon feed-icon--rose">✓</span><div><strong>25 volunteers marked attendance</strong><p>12h ago</p></div></li>
                <li><span class="feed-icon feed-icon--blue">+</span><div><strong>New project added</strong><p>1d ago</p></div></li>
              </ul>
            </section>
          </div>
`,
});

/* ===================== PROJECTS ===================== */
const projectsData = [
  {
    title: "Beach Clean up Drive",
    desc: "A community-wide clean-up exercise to promote a cleaner and healthier environment.",
    dates: "May 20 - Jun 2, 2026",
    loc: "Lagos, Nigeria",
    status: "Active",
    statusClass: "active",
    pct: 72,
    vols: 120,
    tasks: 38,
    att: 85,
    img: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=240&h=180&fit=crop",
  },
  {
    title: "Community Food Drive",
    desc: "Pack and distribute food packages to families across underserved communities.",
    dates: "Apr 2 - Apr 18, 2026",
    loc: "Ibadan, Nigeria",
    status: "Completed",
    statusClass: "completed",
    pct: 100,
    vols: 60,
    tasks: 20,
    att: 100,
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=240&h=180&fit=crop",
  },
  {
    title: "Beach Clean up Drive",
    desc: "Coastal restoration and litter collection along Rivers State shorelines.",
    dates: "Jun 10 - Jun 24, 2026",
    loc: "Rivers, Nigeria",
    status: "Planned",
    statusClass: "planned",
    pct: 0,
    vols: 0,
    tasks: 0,
    att: 0,
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=240&h=180&fit=crop",
  },
];

const projects = wrap({
  title: "Projects",
  nav: "projects",
  cssExtra: "coordinator-projects.css",
  content: `
          <div class="page-intro">
            <h2>My Projects</h2>
            <p>Here's what's happening with your projects today.</p>
          </div>

          <section class="metric-row">
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18v12H3z"/><path d="M3 11h18"/></svg></div><p class="metric-card__label">Total Projects</p></div><p class="metric-card__value">4</p><p class="metric-card__meta is-muted">Assigned to you</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><p class="metric-card__label">Active Projects</p></div><p class="metric-card__value">2</p><p class="metric-card__meta is-muted">Currently running</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg></div><p class="metric-card__label">Completed</p></div><p class="metric-card__value">1</p><p class="metric-card__meta is-muted">This year</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--rose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><p class="metric-card__label">Planned</p></div><p class="metric-card__value">1</p><p class="metric-card__meta is-muted">Upcoming projects</p></article>
          </section>

          <h3 class="section-label">Projects</h3>
          <div class="project-list">
${projectsData
  .map(
    (p) => `
            <article class="project-card">
              <button class="icon-btn project-more" type="button" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
              <img class="project-thumb" src="${p.img}" alt="" />
              <div class="project-body">
                <div class="project-title-row">
                  <h4 class="project-title">${p.title}</h4>
                  <span class="badge badge--${p.statusClass}">${p.status}</span>
                </div>
                <p class="project-desc">${p.desc}</p>
                <div class="project-meta">
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>${p.dates}</span>
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.5-9C.6 8.4 2.4 4.5 6 4.1 8.4 3.8 10.6 5 12 7c1.4-2 3.6-3.2 6-2.9 3.6.4 5.4 4.3 3.5 7.9C19 16.4 12 21 12 21z"/></svg>${p.loc}</span>
                </div>
                <div class="project-progress">
                  <div class="progress-item__head"><span>Progress</span><strong>${p.pct}%</strong></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${p.pct}%"></div></div>
                </div>
                <div class="project-stats">
                  <span>${p.vols} Volunteers</span>
                  <span>${p.tasks} Tasks</span>
                  <span>${p.att}% Attendance</span>
                </div>
                <a class="btn btn--outline btn--sm" href="project-detail.html">View Project <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg></a>
              </div>
            </article>`,
  )
  .join("")}
          </div>
${pagination("Showing 1 to 3 of 4 projects", 1, 3)}
`,
});

/* ===================== PROJECT DETAIL ===================== */
const volunteersAssign = [
  ["Amara Okafor", "Logistics Team", "team-orange", "Available", "available"],
  ["Jane Doe", "Clean up Team", "team-yellow", "Available", "available"],
  ["John Michael", "Health Team", "team-green", "Unavailable", "unavailable"],
  ["Sarah Williams", "Logistics Team", "team-orange", "Available", "available"],
  ["Dave Brown", "Clean up Team", "team-yellow", "Available", "available"],
  ["Emily Johnson", "Health Team", "team-green", "Unavailable", "unavailable"],
  ["Michael John", "Logistics Team", "team-orange", "Available", "available"],
];

const projectDetail = wrap({
  title: "Project Information",
  nav: "projects",
  cssExtra: "coordinator-project-detail.css",
  titleHtml: `<nav class="breadcrumb"><a href="projects.html">Projects</a><span class="breadcrumb-sep">/</span><span>Project Information</span></nav>`,
  content: `
          <section class="card project-hero">
            <div class="project-hero-media">
              <img src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900&h=360&fit=crop" alt="" />
            </div>
            <div class="project-hero-body">
              <div class="project-hero-top">
                <div>
                  <div class="project-title-row">
                    <h2 class="project-hero-title">Beach Clean up Drive</h2>
                    <span class="badge badge--active">Active</span>
                  </div>
                  <p class="project-desc">A community-wide clean-up exercise to promote a cleaner and healthier environment.</p>
                  <div class="project-meta">
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>May 20 - Jun 2, 2026</span>
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.5-9C.6 8.4 2.4 4.5 6 4.1 8.4 3.8 10.6 5 12 7c1.4-2 3.6-3.2 6-2.9 3.6.4 5.4 4.3 3.5 7.9C19 16.4 12 21 12 21z"/></svg>Lagos, Nigeria</span>
                  </div>
                </div>
                <button class="btn-ghost" type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                  Edit Project
                </button>
              </div>
              <div class="project-summary-row">
                <div class="summary-pill"><span class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span><div><strong>120</strong><span>Volunteers</span></div></div>
                <div class="summary-pill"><span class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg></span><div><strong>38/52</strong><span>Task Completed</span></div></div>
                <div class="summary-pill"><span class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5M8 19v-8M12 19v-5M16 19V9M20 19v-3"/></svg></span><div><strong>90%</strong><span>Attendance</span></div></div>
              </div>
            </div>
          </section>

          <div class="detail-grid">
            <section class="card assign-panel">
              <div class="card-header">
                <div>
                  <h3 class="card-title">Assign Volunteers</h3>
                  <p class="card-subtitle">Add and assign volunteers to this project</p>
                </div>
              </div>
              <div class="filter-bar">
                <label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg><input placeholder="Search volunteers..." /></label>
                <select class="filter-select"><option>All Roles</option></select>
                <button class="btn btn--primary btn--sm" type="button">+ Add Volunteer</button>
              </div>
              <div class="selection-bar">Selected: <strong id="selectedCount">0</strong> volunteers <button type="button" class="card-link" id="clearSelection">Clear</button></div>
              <ul class="assign-list" id="assignList">
${volunteersAssign
  .map(
    ([name, team, teamClass, status, statusClass], i) => `
                <li class="assign-row">
                  <input type="checkbox" class="assign-check" data-index="${i}" />
                  <div class="person-cell">
                    <img class="person-avatar" src="https://i.pravatar.cc/72?img=${i + 10}" alt="" />
                    <div><p class="person-name">${name}</p></div>
                  </div>
                  <span class="team-label ${teamClass}">${team}</span>
                  <span class="badge badge--${statusClass === "available" ? "active" : "absent"}">${status}</span>
                  <button class="icon-btn" type="button" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
                </li>`,
  )
  .join("")}
              </ul>
              ${pagination("Showing 1 to 7 of 120 volunteers", 1, 4)}
              <div class="assign-actions">
                <button class="btn btn--outline" type="button" style="width:auto">Cancel</button>
                <button class="btn btn--primary" type="button" style="width:auto">Assign to project</button>
              </div>
            </section>

            <section class="card timeline-panel">
              <div class="card-header">
                <div>
                  <h3 class="card-title">Project Timeline</h3>
                  <p class="card-subtitle">Set up and track key milestones for this project</p>
                </div>
              </div>
              <button class="btn btn--primary btn--sm" type="button" style="margin-bottom:16px">+ Add Milestone</button>
              <ol class="milestone-list">
                <li class="milestone is-done"><span class="milestone-dot"></span><div class="milestone-body"><div class="milestone-head"><strong>Planning &amp; Preparation</strong><span class="badge badge--success">Completed</span></div><p>July 10 – July 19</p></div></li>
                <li class="milestone is-done"><span class="milestone-dot"></span><div class="milestone-body"><div class="milestone-head"><strong>Community Mobilization</strong><span class="badge badge--success">Completed</span></div><p>July 20 – July 22</p></div></li>
                <li class="milestone is-progress"><span class="milestone-dot"></span><div class="milestone-body"><div class="milestone-head"><strong>Clean Water Access Activity</strong><span class="badge badge--info">In Progress</span></div><p>July 23 – July 30</p></div></li>
                <li class="milestone"><span class="milestone-dot"></span><div class="milestone-body"><div class="milestone-head"><strong>Impact Evaluation</strong><span class="badge badge--neutral">Pending</span></div><p>July 31 – Aug 2</p></div></li>
                <li class="milestone"><span class="milestone-dot"></span><div class="milestone-body"><div class="milestone-head"><strong>Project Closure &amp; Reporting</strong><span class="badge badge--neutral">Pending</span></div><p>August 3</p></div></li>
              </ol>
            </section>
          </div>
`,
  scripts: `<script>
(function(){
  const checks = document.querySelectorAll('.assign-check');
  const countEl = document.getElementById('selectedCount');
  const clearBtn = document.getElementById('clearSelection');
  function update(){ countEl.textContent = [...checks].filter(c=>c.checked).length; }
  checks.forEach(c=>c.addEventListener('change', update));
  clearBtn?.addEventListener('click', ()=>{ checks.forEach(c=>c.checked=false); update(); });
})();
</script>`,
});

/* ===================== APPLICATIONS ===================== */
const apps = [
  ["Ogunlade M7", "Ogun, Nigeria", "Community Clean Up Initiative", ["Logistics", "First Aid"], "+2", "Weekends", "May 10, 2026", "Pending", "pending"],
  ["Jane Doe", "Lagos, Nigeria", "Youth Mentorship Program", ["Teaching"], "+1", "Weekdays", "May 11, 2026", "Awaiting Info", "awaiting"],
  ["John Michael", "Abuja, Nigeria", "Food Donation Drive", ["Logistics"], "+3", "Weekends", "May 12, 2026", "Pending", "pending"],
  ["Sarah Williams", "Ibadan, Nigeria", "Tree Planting Initiative", ["First Aid"], "+1", "Evenings", "May 13, 2026", "Awaiting Info", "awaiting"],
  ["Emily Johnson", "Kaduna, Nigeria", "Community Health Outreach", ["Healthcare"], "+2", "Weekends", "May 14, 2026", "Pending", "pending"],
];

const applications = wrap({
  title: "Applications",
  nav: "applications",
  content: `
          <div class="page-intro">
            <h2>Volunteer Applications</h2>
            <p>Review volunteers who have applied to join your projects.</p>
          </div>
          <section class="metric-row">
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/></svg></div><p class="metric-card__label">Pending Applications</p></div><p class="metric-card__value">18</p><p class="metric-card__meta is-muted">Awaiting review</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg></div><p class="metric-card__label">Approved Today</p></div><p class="metric-card__value">7</p><p class="metric-card__meta is-muted">Added to projects</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l3 3v17H6z"/></svg></div><p class="metric-card__label">Rejected</p></div><p class="metric-card__value">3</p><p class="metric-card__meta is-muted">Not selected</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--rose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><p class="metric-card__label">Awaiting More Info</p></div><p class="metric-card__value">8</p><p class="metric-card__meta is-muted">Requested details</p></article>
          </section>
          <div class="filter-bar">
            <label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg><input placeholder="Search volunteer..." /></label>
            <select class="filter-select"><option>All Projects</option></select>
            <select class="filter-select"><option>All Statuses</option></select>
            <select class="filter-select"><option>All Skills</option></select>
            <select class="filter-select"><option>All Availability</option></select>
            <select class="filter-select"><option>Newest First</option></select>
          </div>
          <div class="data-table-wrap">
            <table class="data-table">
              <thead><tr><th>Volunteer</th><th>Applied For</th><th>Skills</th><th>Availability</th><th>Applied On</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
${apps
  .map(
    ([name, loc, project, skills, extra, avail, date, status, sc], i) => `
                <tr>
                  <td><div class="person-cell"><img class="person-avatar" src="https://i.pravatar.cc/72?img=${i + 20}" alt="" /><div><p class="person-name">${name}</p><p class="person-sub">${loc}</p></div></div></td>
                  <td>${project}</td>
                  <td><div class="skill-tags">${skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}<span class="skill-tag">${extra}</span></div></td>
                  <td>${avail}</td>
                  <td>${date}</td>
                  <td><span class="badge badge--${sc}">${status}</span></td>
                  <td><div style="display:flex;gap:6px;align-items:center"><button class="btn-ghost" type="button" style="height:34px">Review</button><button class="icon-btn" type="button"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button></div></td>
                </tr>`,
  )
  .join("")}
              </tbody>
            </table>
          </div>
${pagination("Showing 1 to 5 of 18 Applications")}
`,
});

/* ===================== VOLUNTEERS ===================== */
const vols = [
  ["Jane Doe", "May 12, 2024", "jane.d@gmail.com", "07034567890", "Teaching", "+1", "Weekends", "120 hrs", "Active", "active"],
  ["John Michael", "Jun 2, 2024", "john.m@gmail.com", "08012345678", "Logistics", "+2", "Tuesdays", "86 hrs", "Active", "active"],
  ["Amara Okafor", "Apr 20, 2024", "amara@gmail.com", "09150804518", "Outreach", "+1", "Evenings", "98 hrs", "Active", "active"],
  ["Sarah Williams", "Mar 8, 2024", "sarah.w@gmail.com", "07099887766", "First Aid", "+3", "Weekends", "75 hrs", "Inactive", "inactive"],
  ["Dave Brown", "Feb 14, 2024", "dave.b@gmail.com", "08122334455", "Coding", "+1", "Weekdays", "66 hrs", "Active", "active"],
  ["Emily Johnson", "Jan 30, 2024", "emily.j@gmail.com", "09011223344", "Teaching", "+2", "Weekends", "54 hrs", "Inactive", "inactive"],
  ["Michael John", "Dec 12, 2023", "mike.j@gmail.com", "07055667788", "Media", "+1", "Fridays", "110 hrs", "Active", "active"],
  ["Ada Okoro", "Nov 5, 2023", "ada.o@gmail.com", "08133445566", "Healthcare", "+2", "Weekends", "42 hrs", "Active", "active"],
];

const volunteers = wrap({
  title: "Volunteers",
  nav: "volunteers",
  content: `
          <div class="page-intro-row">
            <div>
              <h2>All Volunteers</h2>
              <p>Manage and view all registered volunteers</p>
            </div>
            <div class="toolbar-actions">
              <button class="btn-ghost" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>Export</button>
              <button class="btn btn--primary btn--sm" type="button">+ Add Volunteer</button>
            </div>
          </div>
          <div class="filter-bar">
            <label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg><input placeholder="Search volunteers by name, email or skills..." /></label>
            <select class="filter-select"><option>All Status</option></select>
            <select class="filter-select"><option>All Availability</option></select>
            <select class="filter-select"><option>All Status</option></select>
            <button class="btn-filter" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>Filters</button>
          </div>
          <div class="data-table-wrap">
            <table class="data-table">
              <thead><tr><th>Volunteer</th><th>Email</th><th>Phone</th><th>Skills</th><th>Availability</th><th>Total hours</th><th>Status</th><th></th></tr></thead>
              <tbody>
${vols
  .map(
    ([name, joined, email, phone, skill, extra, avail, hours, status, sc], i) => `
                <tr>
                  <td><div class="person-cell"><img class="person-avatar" src="https://i.pravatar.cc/72?img=${i + 30}" alt="" /><div><p class="person-name">${name}</p><p class="person-sub">Joined ${joined}</p></div></div></td>
                  <td>${email}</td>
                  <td>${phone}</td>
                  <td><div class="skill-tags"><span class="skill-tag">${skill}</span><span class="skill-tag">${extra}</span></div></td>
                  <td>${avail}</td>
                  <td>${hours}</td>
                  <td><span class="badge badge--${sc}">${status}</span></td>
                  <td><button class="icon-btn" type="button"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button></td>
                </tr>`,
  )
  .join("")}
              </tbody>
            </table>
          </div>
          <div class="pagination-bar">
            <span>Showing 1 to 8 of 24 volunteers</span>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <div class="pagination">
                <button class="page-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button class="page-btn is-active" type="button">1</button>
                <button class="page-btn" type="button">2</button>
                <button class="page-btn" type="button">3</button>
                <button class="page-btn" type="button">4</button>
                <button class="page-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg></button>
              </div>
              <select class="filter-select" style="min-width:110px"><option>10 per page</option></select>
            </div>
          </div>
`,
});

/* ===================== TASKS ===================== */
const taskRows = [
  ["Design awareness flyer", "Create a flyer for community awareness", "Community Clean Up", "Jane Doe", "May 10, 2026", "High", "high", "To Do", "todo"],
  ["Prepare volunteer kits", "Assemble materials for weekend event", "Community Clean Up", "John Michael", "May 12, 2026", "Medium", "medium", "In Progress", "info"],
  ["Confirm venue booking", "Call community center and confirm hall", "Youth Mentorship", "Amara Okafor", "May 14, 2026", "High", "high", "Declined", "declined"],
  ["Draft impact report", "Summarize hours and outcomes", "Food Donation Drive", "Sarah Williams", "May 16, 2026", "Low", "low", "Completed", "completed"],
  ["Site safety checklist", "Walkthrough and mark hazards", "Tree Planting", "Dave Brown", "May 18, 2026", "Medium", "medium", "In Progress", "info"],
  ["Social media posts", "Schedule posts for event week", "Health Outreach", "Emily Johnson", "May 19, 2026", "Low", "low", "To Do", "todo"],
  ["Volunteer briefing deck", "Prepare slides for orientation", "Community Clean Up", "Michael John", "May 20, 2026", "High", "high", "Overdue", "absent"],
  ["Collect feedback forms", "Digitize responses after event", "Youth Mentorship", "Ada Okoro", "May 22, 2026", "Medium", "medium", "To Do", "todo"],
];

const tasks = wrap({
  title: "Tasks",
  nav: "tasks",
  cssExtra: "coordinator-tasks.css",
  content: `
          <div class="page-intro-row">
            <div>
              <h2>All Task</h2>
              <p>View and manage all tasks across projects</p>
            </div>
            <button class="btn btn--primary btn--sm" type="button">+ New Task</button>
          </div>
          <div class="filter-bar">
            <label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg><input placeholder="Search tasks by title or keyword..." /></label>
            <select class="filter-select"><option>All Project</option></select>
            <select class="filter-select"><option>All Status</option></select>
            <select class="filter-select"><option>All Priority</option></select>
            <button class="btn-filter" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>Filter</button>
          </div>
          <div class="status-tabs" role="tablist">
            <button class="status-tab is-active" type="button">All (24)</button>
            <button class="status-tab" type="button">To Do (8)</button>
            <button class="status-tab" type="button">In Progress (9)</button>
            <button class="status-tab" type="button">Completed (7)</button>
            <button class="status-tab" type="button">Overdue (2)</button>
          </div>
          <div class="data-table-wrap">
            <table class="data-table">
              <thead><tr><th><input type="checkbox" /></th><th>Task</th><th>Project</th><th>Assigned To</th><th>Due Date</th><th>Priority</th><th>Status</th><th></th></tr></thead>
              <tbody>
${taskRows
  .map(
    ([title, sub, project, person, due, pri, pc, status, sc], i) => `
                <tr>
                  <td><input type="checkbox" /></td>
                  <td><p class="person-name">${title}</p><p class="person-sub">${sub}</p></td>
                  <td>${project}</td>
                  <td><div class="person-cell"><img class="person-avatar" src="https://i.pravatar.cc/72?img=${i + 40}" alt="" /><div><p class="person-name">${person}</p><p class="person-sub">Volunteer</p></div></div></td>
                  <td>${due}</td>
                  <td><span class="badge badge--${pc}">${pri}</span></td>
                  <td><span class="badge badge--${sc === "info" ? "awaiting" : sc}">${status}</span></td>
                  <td><button class="icon-btn" type="button"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button></td>
                </tr>`,
  )
  .join("")}
              </tbody>
            </table>
          </div>
          <div class="pagination-bar">
            <span>Showing 1 to 8 of 24 tasks</span>
            <div style="display:flex;gap:10px;align-items:center">
              <div class="pagination">
                <button class="page-btn is-active" type="button">1</button>
                <button class="page-btn" type="button">2</button>
                <button class="page-btn" type="button">3</button>
              </div>
              <select class="filter-select" style="min-width:100px"><option>8 per page</option></select>
            </div>
          </div>
`,
  scripts: `<script>
document.querySelectorAll('.status-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.status-tab').forEach(t=>t.classList.toggle('is-active', t===tab));
  });
});
</script>`,
});

/* ===================== ATTENDANCE ===================== */
const attRows = [
  ["Jane Doe", "Community Clean Up", "May 20, 2026", "09:02 AM", "01:02 PM", "4.0", "Present", "present"],
  ["John Michael", "Youth Education Program", "May 20, 2026", "09:18 AM", "01:10 PM", "3.9", "Late", "late"],
  ["Amara Okafor", "Community Clean Up", "May 19, 2026", "09:00 AM", "01:00 PM", "4.0", "Present", "present"],
  ["Sarah Williams", "Food Donation Drive", "May 19, 2026", "—", "—", "0", "Absent", "absent"],
  ["Dave Brown", "Tree Planting Initiative", "May 18, 2026", "08:55 AM", "12:55 PM", "4.0", "Present", "present"],
];

const attendance = wrap({
  title: "Attendance",
  nav: "attendance",
  content: `
          <div class="page-intro-row">
            <div>
              <h2>Attendance</h2>
              <p>Track check-ins and hours across all projects.</p>
            </div>
            <button class="btn btn--primary btn--sm" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg> Export</button>
          </div>
          <section class="metric-row" style="grid-template-columns:repeat(3,1fr)">
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div><p class="metric-card__label">Today's Check-ins</p></div><p class="metric-card__value">18</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><p class="metric-card__label">Hours This Week</p></div><p class="metric-card__value">342</p></article>
            <article class="metric-card"><div class="metric-card__top"><div class="metric-card__icon metric-card__icon--blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5M8 19v-8M12 19v-5M16 19V9M20 19v-3"/></svg></div><p class="metric-card__label">Attendance Rate</p></div><p class="metric-card__value">92%</p></article>
          </section>
          <div class="filter-bar">
            <label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg><input placeholder="Search volunteer by name, project..." /></label>
            <select class="filter-select"><option>All Projects</option></select>
            <button class="date-pill" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>May 1 - May 31, 2026</button>
          </div>
          <div class="data-table-wrap">
            <table class="data-table">
              <thead><tr><th>Volunteer</th><th>Project</th><th>Date</th><th>Check-in</th><th>Check-out</th><th>Hours</th><th>Status</th></tr></thead>
              <tbody>
${attRows
  .map(
    ([name, project, date, cin, cout, hours, status, sc], i) => `
                <tr>
                  <td><div class="person-cell"><img class="person-avatar" src="https://i.pravatar.cc/72?img=${i + 50}" alt="" /><p class="person-name">${name}</p></div></td>
                  <td><a class="card-link" href="project-detail.html">${project}</a></td>
                  <td>${date}</td>
                  <td>${cin}</td>
                  <td>${cout}</td>
                  <td>${hours}</td>
                  <td><span class="badge badge--${sc}">${status}</span></td>
                </tr>`,
  )
  .join("")}
              </tbody>
            </table>
          </div>
          <div class="pagination-bar">
            <span>Showing 1 to 5 of 24 records</span>
            <div style="display:flex;gap:10px;align-items:center">
              <div class="pagination">
                <button class="page-btn is-active" type="button">1</button>
                <button class="page-btn" type="button">2</button>
                <button class="page-btn" type="button">3</button>
              </div>
              <select class="filter-select" style="min-width:100px"><option>5 per page</option></select>
            </div>
          </div>
`,
});

/* ===================== REPORTS ===================== */
const reports = wrap({
  title: "Reports",
  nav: "reports",
  cssExtra: "coordinator-reports.css",
  content: `
          <div class="page-intro">
            <h2>Reports</h2>
            <p>Monitor all reports delivered to volunteers</p>
          </div>
          <div class="filter-bar">
            <select class="filter-select"><option>May 31, 2026</option></select>
            <select class="filter-select"><option>All Projects</option></select>
          </div>
          <div class="report-list">
            ${[
              ["Volunteer Activity Summary", "Hours, attendance, and engagement by volunteer", "blue", "chart"],
              ["Project Impact Report", "Outcomes and progress across all project", "green", "folder"],
              ["Attendance Report", "Check-in records for a date range or project", "rose", "cal"],
              ["Donations Summary", "Contributions received over the selected period", "gray", "heart"],
            ]
              .map(
                ([title, desc, tone]) => `
            <article class="report-card">
              <div class="report-icon report-icon--${tone}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5M8 19v-8M12 19v-5M16 19V9M20 19v-3"/></svg></div>
              <div class="report-body">
                <h3>${title}</h3>
                <p>${desc}</p>
              </div>
              <div class="report-actions">
                <button class="btn-ghost" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg> PDF</button>
                <button class="btn-ghost" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg> CSV</button>
              </div>
            </article>`,
              )
              .join("")}
          </div>
`,
});

const stub = (title, nav, blurb) =>
  wrap({
    title,
    nav,
    content: `
          <div class="page-intro">
            <h2>${title}</h2>
            <p>${blurb}</p>
          </div>
          <section class="card">
            <p class="card-subtitle" style="margin:0">This section is ready for API integration. Use the shared coordinator layout for the full experience.</p>
          </section>
`,
  });

const files = {
  "dashboard.html": dashboard,
  "projects.html": projects,
  "project-detail.html": projectDetail,
  "applications.html": applications,
  "volunteers.html": volunteers,
  "tasks.html": tasks,
  "attendance.html": attendance,
  "reports.html": reports,
  "certificate.html": stub(
    "Certificates",
    "certificate",
    "Issue and manage volunteer certificates.",
  ),
  "message.html": stub(
    "Messages",
    "message",
    "Coordinate with volunteers and project teams.",
  ),
};

for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), html);
  console.log("wrote", name);
}
