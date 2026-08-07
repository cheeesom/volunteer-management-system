const fs = require("fs");
const path = require("path");

const AVATAR =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=faces";

function sidebar(active) {
  const link = (nav, href, label, svg) => `
          <a class="sidebar-link${active === nav ? " is-active" : ""}" href="${href}" data-nav="${nav}">
            ${svg}
            ${label}
          </a>`;

  return `
      <div class="sidebar-overlay" aria-hidden="true"></div>
      <aside class="sidebar" aria-label="Main navigation">
        <a class="sidebar-brand" href="dashboard.html">
          <img src="../assets/logo/logo.svg" alt="" />
          <span class="sidebar-brand-text">Volunity</span>
        </a>
        <nav class="sidebar-nav">
${link(
  "dashboard",
  "dashboard.html",
  "Dashboard",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`
)}
${link(
  "profile",
  "profile.html",
  "Profile",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6"/></svg>`
)}
${link(
  "explore",
  "explore.html",
  "Explore",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="3"/></svg>`
)}
${link(
  "tasks",
  "tasks.html",
  "Tasks",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg>`
)}
${link(
  "checkin",
  "checkin.html",
  "Check In",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>`
)}
${link(
  "notifications",
  "notifications.html",
  "Notifications",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>`
)}
${link(
  "certificates",
  "certificates.html",
  "Certificates",
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="4"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>`
)}
        </nav>
        <div class="sidebar-divider"></div>
        <div class="sidebar-footer">
          <a class="sidebar-link" href="#" data-nav="settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
            Settings
          </a>
          <a class="sidebar-link" href="#" data-nav="help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.8"/><path d="M12 17h.01"/></svg>
            Help &amp; Support
          </a>
          <a class="sidebar-link is-danger" href="login.html" data-nav="logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
            Logout
          </a>
        </div>
      </aside>`;
}

function topbar(title) {
  return `
        <header class="topbar">
          <div class="topbar-left">
            <button class="topbar-toggle" type="button" data-sidebar-toggle aria-label="Toggle navigation">
              <span></span><span></span><span></span>
            </button>
            <h1 class="topbar-title">${title}</h1>
          </div>
          <div class="topbar-right">
            <a class="topbar-icon-btn" href="notifications.html" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
              <span class="topbar-badge">1</span>
            </a>
            <a class="topbar-profile" href="profile.html" aria-label="Account">
              <img class="topbar-avatar" src="${AVATAR}" alt="" />
              <span class="topbar-user">
                <span class="topbar-user-name">Amara Okafor</span>
                <span class="topbar-user-role">Volunteer</span>
              </span>
              <svg class="topbar-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
          </div>
        </header>`;
}

function wrap({ title, nav, css, content, scripts = "" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Volunity</title>
    <link rel="stylesheet" href="../css/layout.css" />
    <link rel="stylesheet" href="../css/${css}" />
  </head>
  <body data-nav="${nav}">
    <div class="app-shell">
${sidebar(nav)}
      <div class="app-main">
${topbar(title)}
        <div class="page-content">
${content}
        </div>
      </div>
    </div>
    <script src="../js/layout.js"></script>
${scripts}
  </body>
</html>
`;
}

const pagesDir = path.join(__dirname, "..", "pages");

const profile = wrap({
  title: "My Profile",
  nav: "profile",
  css: "profile.css",
  content: `
          <section class="card profile-hero">
            <div class="profile-avatar-wrap">
              <img class="profile-avatar" src="${AVATAR.replace("w=96&h=96", "w=220&h=220")}" alt="Amara Okafor" />
              <button class="profile-avatar-edit" type="button" aria-label="Change photo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </button>
            </div>
            <div class="profile-hero-body">
              <div class="profile-hero-top">
                <div>
                  <h2 class="profile-name">Amara Okafor</h2>
                  <span class="badge badge--success">Active Volunteer</span>
                </div>
                <button class="btn-edit" type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                  Edit Profile
                </button>
              </div>
              <div class="profile-contact">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 7l8 6 8-6"/></svg>
                  amaraokafor@gmail.com
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg>
                  +234 9150804518
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.5-9C.6 8.4 2.4 4.5 6 4.1 8.4 3.8 10.6 5 12 7c1.4-2 3.6-3.2 6-2.9 3.6.4 5.4 4.3 3.5 7.9C19 16.4 12 21 12 21z"/></svg>
                  Lagos Nigeria
                </span>
              </div>
            </div>
          </section>

          <section class="card profile-about">
            <div class="card-header"><h3 class="card-title">About Me</h3></div>
            <p>I'm passionate about community development and making a positive impact. I love volunteering and contributing my time and skills to meaningful causes.</p>
          </section>

          <div class="profile-grid">
            <section class="card">
              <div class="card-header"><h3 class="card-title">Personal Information</h3></div>
              <div class="info-rows">
                <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6"/></svg>Full Name</span><span class="info-value">Amara Okafor</span></div>
                <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>Date of Birth</span><span class="info-value">May 12, 1998</span></div>
                <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>Gender</span><span class="info-value">Female</span></div>
                <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>Skill</span><span class="info-value">Community Outreach, Event Planning</span></div>
                <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Availability</span><span class="info-value">Weekends, Evening</span></div>
                <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>Member Since</span><span class="info-value">April 20, 2024</span></div>
              </div>
            </section>

            <div class="profile-stack">
              <section class="card">
                <div class="card-header"><h3 class="card-title">Emergency Contact</h3></div>
                <div class="info-rows">
                  <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6"/></svg>Contact</span><span class="info-value">John Okafor</span></div>
                  <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>Relationship</span><span class="info-value">Brother</span></div>
                  <div class="info-row"><span class="info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg>Phone Number</span><span class="info-value">09150804518</span></div>
                </div>
              </section>
              <section class="card">
                <div class="card-header"><h3 class="card-title">Address</h3></div>
                <p class="address-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.5-9C.6 8.4 2.4 4.5 6 4.1 8.4 3.8 10.6 5 12 7c1.4-2 3.6-3.2 6-2.9 3.6.4 5.4 4.3 3.5 7.9C19 16.4 12 21 12 21z"/></svg>
                  12 Freedom way Yaba, Lagos, Nigeria.
                </p>
              </section>
            </div>
          </div>
`,
});

const opportunities = [
  {
    title: "Beach Clean-up Drive",
    desc: "Join us to clean Lagos beaches and protect marine life for future generations.",
    loc: "Lagos, Nigeria",
    date: "May 24, 2026",
    dur: "4 hrs",
    cap: "25 / 50 volunteers",
    tag: "Environment",
    tagClass: "environment",
    img: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
  },
  {
    title: "Food Drive Volunteering",
    desc: "Help pack and distribute food packages to families in need across the community.",
    loc: "Abuja, Nigeria",
    date: "May 27, 2026",
    dur: "3 hrs",
    cap: "18 / 40 volunteers",
    tag: "Community",
    tagClass: "community",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
  },
  {
    title: "Youth Mentorship Program",
    desc: "Mentor young learners and share your skills in a supportive online environment.",
    loc: "Online",
    date: "May 30, 2026",
    dur: "2 hrs",
    cap: "12 / 20 volunteers",
    tag: "Education",
    tagClass: "education",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  },
  {
    title: "Tree Planting Initiative",
    desc: "Plant trees and restore green spaces while learning about local biodiversity.",
    loc: "Ibadan, Nigeria",
    date: "Jun 2, 2026",
    dur: "5 hrs",
    cap: "30 / 60 volunteers",
    tag: "Environment",
    tagClass: "environment",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
  {
    title: "Community Health Outreach",
    desc: "Support health screenings and awareness campaigns in underserved neighborhoods.",
    loc: "Kaduna, Nigeria",
    date: "Jun 7, 2026",
    dur: "6 hrs",
    cap: "15 / 35 volunteers",
    tag: "Health",
    tagClass: "health",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    title: "Education Support Program",
    desc: "Assist with tutoring and classroom support for students preparing for exams.",
    loc: "Port Harcourt, Nigeria",
    date: "Jun 5, 2026",
    dur: "3 hrs",
    cap: "10 / 25 volunteers",
    tag: "Education",
    tagClass: "education",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
  },
];

const explore = wrap({
  title: "Explore",
  nav: "explore",
  css: "explore.css",
  content: `
          <section class="page-intro">
            <h2>Explore Opportunities</h2>
            <p>Discover volunteer opportunities and make an impact in your community.</p>
          </section>

          <div class="filter-bar">
            <label class="search-field">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
              <input type="search" placeholder="Search by keyword..." />
            </label>
            <select class="filter-select" aria-label="Category">
              <option>All Categories</option>
              <option>Environment</option>
              <option>Community</option>
              <option>Education</option>
              <option>Health</option>
            </select>
            <select class="filter-select" aria-label="Location">
              <option>All Locations</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Ibadan</option>
              <option>Online</option>
            </select>
            <select class="filter-select" aria-label="Date">
              <option>All Dates</option>
              <option>This week</option>
              <option>This month</option>
            </select>
            <button class="btn-filter" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>
              Filter
            </button>
          </div>

          <div class="opp-grid">
${opportunities
  .map(
    (o) => `
            <article class="opp-card">
              <div class="opp-media">
                <img src="${o.img}" alt="" />
                <span class="opp-tag opp-tag--${o.tagClass}">${o.tag}</span>
              </div>
              <div class="opp-body">
                <h3 class="opp-title">${o.title}</h3>
                <p class="opp-desc">${o.desc}</p>
                <div class="opp-meta">
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.5-9C.6 8.4 2.4 4.5 6 4.1 8.4 3.8 10.6 5 12 7c1.4-2 3.6-3.2 6-2.9 3.6.4 5.4 4.3 3.5 7.9C19 16.4 12 21 12 21z"/></svg>${o.loc}</span>
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg>${o.date}</span>
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${o.dur}</span>
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>${o.cap}</span>
                </div>
                <button class="btn btn--primary" type="button">Apply Now</button>
              </div>
            </article>`
  )
  .join("")}
          </div>

          <div class="pagination-bar">
            <span>Showing 1 to 6 of 18 opportunities</span>
            <div class="pagination">
              <button class="page-btn" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
              <button class="page-btn is-active" type="button">1</button>
              <button class="page-btn" type="button">2</button>
              <button class="page-btn" type="button">3</button>
              <button class="page-btn" type="button">4</button>
              <button class="page-btn" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
            </div>
          </div>
`,
});

const tasks = wrap({
  title: "My Tasks",
  nav: "tasks",
  css: "tasks.css",
  content: `
          <div class="task-tabs" role="tablist">
            <button class="task-tab is-active" type="button" role="tab" aria-selected="true" data-tab="progress">In Progress</button>
            <button class="task-tab" type="button" role="tab" aria-selected="false" data-tab="completed">Completed</button>
          </div>

          <div class="task-panel" data-panel="progress">
            <ul class="task-list">
              <li class="task-card">
                <img class="task-thumb" src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=200&h=160&fit=crop" alt="" />
                <div>
                  <h3 class="task-title">Beach Clean up Drive</h3>
                  <p class="task-meta">May 26, 2026, Lagos, Nigeria</p>
                </div>
                <span class="badge badge--success">In Progress</span>
              </li>
              <li class="task-card">
                <img class="task-thumb" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=160&fit=crop" alt="" />
                <div>
                  <h3 class="task-title">Tree Planting</h3>
                  <p class="task-meta">May 28, 2026, Abuja, Nigeria</p>
                </div>
                <span class="badge badge--upcoming">Upcoming</span>
              </li>
              <li class="task-card">
                <img class="task-thumb" src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&h=160&fit=crop" alt="" />
                <div>
                  <h3 class="task-title">Community Food Drive</h3>
                  <p class="task-meta">May 30, 2026, Ibadan, Nigeria</p>
                </div>
                <span class="badge badge--upcoming">Upcoming</span>
              </li>
            </ul>
          </div>

          <div class="task-panel" data-panel="completed" hidden>
            <ul class="task-list">
              <li class="task-card">
                <img class="task-thumb" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=160&fit=crop" alt="" />
                <div>
                  <h3 class="task-title">Youth Mentorship Session</h3>
                  <p class="task-meta">May 10, 2026, Online</p>
                </div>
                <span class="badge badge--neutral">Completed</span>
              </li>
              <li class="task-card">
                <img class="task-thumb" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=160&fit=crop" alt="" />
                <div>
                  <h3 class="task-title">Health Awareness Booth</h3>
                  <p class="task-meta">April 22, 2026, Lagos, Nigeria</p>
                </div>
                <span class="badge badge--neutral">Completed</span>
              </li>
            </ul>
          </div>
`,
  scripts: `<script>
document.querySelectorAll(".task-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".task-tab").forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });
    document.querySelectorAll(".task-panel").forEach((panel) => {
      panel.hidden = panel.dataset.panel !== tab.dataset.tab;
    });
  });
});
</script>`,
});

const checkin = wrap({
  title: "Check In",
  nav: "checkin",
  css: "checkin.css",
  content: `
          <section class="checkin-intro">
            <h2>Event Check in</h2>
            <p>Scan the coordinator's QR code to mark your attendance</p>
          </section>

          <div class="checkin-layout">
            <div>
              <section class="card scanner-card">
                <div class="qr-frame" aria-hidden="true">
                  <span class="qr-corner qr-corner--tl"></span>
                  <span class="qr-corner qr-corner--tr"></span>
                  <span class="qr-corner qr-corner--bl"></span>
                  <span class="qr-corner qr-corner--br"></span>
                  <span class="qr-scanline"></span>
                  <div class="qr-placeholder">
                    ${Array.from({ length: 25 }, (_, i) => `<span class="${[0,1,2,4,5,6,8,10,12,14,16,18,20,21,22,24].includes(i) ? "filled" : ""}"></span>`).join("")}
                  </div>
                </div>
                <p class="scanner-hint">Position the QR code within the frame to scan.</p>
                <div class="or-divider">OR</div>
                <label class="manual-label" for="checkinCode">Enter code manually.</label>
                <form class="manual-row" action="checkin-success.html" method="get">
                  <input id="checkinCode" name="code" type="text" inputmode="numeric" maxlength="6" placeholder="Enter 6 digit check-in code." required />
                  <button class="btn btn--outline" type="submit">Check in</button>
                </form>
              </section>

              <section class="card gps-card" style="margin-top:18px">
                <h3 class="card-title">Can't scan right now?</h3>
                <p class="card-subtitle">Use GPS to check in at the event location.</p>
                <a class="btn btn--primary" href="checkin-success.html">Check in with GPS</a>
                <p class="gps-note">You must be at the event location.</p>
              </section>
            </div>

            <section class="card">
              <div class="card-header"><h3 class="card-title">Check-in Instructions</h3></div>
              <ol class="instruct-list">
                <li class="instruct-item">
                  <span class="instruct-num">1</span>
                  <div>
                    <h4 class="instruct-title">Get the QR Code</h4>
                    <p class="instruct-text">Ask the event coordinators for the QR code available.</p>
                  </div>
                  <div class="instruct-icon instruct-icon--amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v6M14 20h3"/></svg></div>
                </li>
                <li class="instruct-item">
                  <span class="instruct-num">2</span>
                  <div>
                    <h4 class="instruct-title">Scan or Enter Code</h4>
                    <p class="instruct-text">Scan the QR code or enter the 6-digit code provided.</p>
                  </div>
                  <div class="instruct-icon instruct-icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/></svg></div>
                </li>
                <li class="instruct-item">
                  <span class="instruct-num">3</span>
                  <div>
                    <h4 class="instruct-title">Check in Successful</h4>
                    <p class="instruct-text">You'll see a confirmation once your attendance is recorded.</p>
                  </div>
                  <div class="instruct-icon instruct-icon--blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg></div>
                </li>
              </ol>
              <div class="impact-banner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
                <span>Your check-in helps us track attendance and measure impact.</span>
              </div>
            </section>
          </div>
`,
});

const checkinSuccess = wrap({
  title: "Check In",
  nav: "checkin",
  css: "checkin.css",
  content: `
          <div class="checkin-success">
            <div class="success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2>You're Checked In!</h2>
            <p>Your attendance has been recorded for this project</p>
            <div class="card success-project">
              <h3>Beach Cleanup Drive</h3>
              <p>Checked in at 9:04 AM · Estimated time: 4 Hours</p>
            </div>
            <a class="btn btn--primary" href="dashboard.html">Back to Dashboard</a>
          </div>
`,
});

const notifications = wrap({
  title: "Notifications",
  nav: "notifications",
  css: "notifications.css",
  content: `
          <div class="notif-toolbar">
            <button class="mark-read" type="button" id="markAllRead">Mark all as read</button>
          </div>
          <ul class="notif-list" id="notifList">
            <li class="notif-card">
              <div class="notif-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>
              <div>
                <h3 class="notif-title">Application approved</h3>
                <p class="notif-text">Your spot for Beach Cleanup Drive is Confirmed . 2h ago</p>
              </div>
            </li>
            <li class="notif-card">
              <div class="notif-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>
              <div>
                <h3 class="notif-title">Task Assigned</h3>
                <p class="notif-text">You've been assigned to Tree Planting . 5h ago</p>
              </div>
            </li>
            <li class="notif-card">
              <div class="notif-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>
              <div>
                <h3 class="notif-title">Certificate Ready</h3>
                <p class="notif-text">Your certificate has been issued . Yesterday</p>
              </div>
            </li>
          </ul>
`,
  scripts: `<script>
document.getElementById("markAllRead")?.addEventListener("click", () => {
  document.querySelectorAll(".notif-card").forEach((c) => c.classList.add("is-read"));
});
</script>`,
});

const certificates = wrap({
  title: "Certificates",
  nav: "certificates",
  css: "certificates.css",
  content: `
          <div class="certs-header">
            <div>
              <h2>My Certificates</h2>
              <p>View and download the certificates you have earned for your contributions.</p>
            </div>
            <button class="btn-filter" type="button" style="height:42px;padding:0 16px;border:1px solid var(--line);border-radius:10px;background:#fff;font:inherit;font-size:0.85rem;font-weight:600;display:inline-flex;align-items:center;gap:8px;cursor:pointer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>
              Filters
            </button>
          </div>

          <div class="cert-stats">
            <div class="cert-stat">
              <div class="cert-stat__icon cert-stat__icon--total"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="4"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg></div>
              <div><p class="cert-stat__value">4</p><p class="cert-stat__label">Total Certificates</p></div>
            </div>
            <div class="cert-stat">
              <div class="cert-stat__icon cert-stat__icon--done"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>
              <div><p class="cert-stat__value">3</p><p class="cert-stat__label">Completed</p></div>
            </div>
            <div class="cert-stat">
              <div class="cert-stat__icon cert-stat__icon--progress"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
              <div><p class="cert-stat__value">1</p><p class="cert-stat__label">In Progress</p></div>
            </div>
            <div class="cert-stat">
              <div class="cert-stat__icon cert-stat__icon--upcoming"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
              <div><p class="cert-stat__value">0</p><p class="cert-stat__label">Upcoming</p></div>
            </div>
          </div>

          <div class="cert-grid">
            <article class="cert-card">
              <button class="cert-more" type="button" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
              <div class="cert-preview cert-preview--green"><div><strong>Certificate of Appreciation</strong>Community Clean up<br/>Volunity</div><div>May 20, 2025</div></div>
              <div class="cert-body">
                <div class="cert-title-row"><h3 class="cert-title">Community Clean up</h3><span class="badge badge--success">Completed</span></div>
                <p class="cert-issued">Issued on May 20, 2025</p>
                <p class="cert-desc">Awarded for outstanding participation in the community clean-up initiative and dedicated volunteer service.</p>
                <div class="cert-actions"><button class="cert-download" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>Download</button></div>
              </div>
            </article>
            <article class="cert-card">
              <button class="cert-more" type="button" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
              <div class="cert-preview cert-preview--purple"><div><strong>Certificate of Service</strong>Food Donation Drive<br/>Volunity</div><div>Apr 12, 2025</div></div>
              <div class="cert-body">
                <div class="cert-title-row"><h3 class="cert-title">Food Donation Drive</h3><span class="badge badge--success">Completed</span></div>
                <p class="cert-issued">Issued on April 12, 2025</p>
                <p class="cert-desc">Recognizing your contribution packing and distributing meals to families across the community.</p>
                <div class="cert-actions"><button class="cert-download" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>Download</button></div>
              </div>
            </article>
            <article class="cert-card">
              <button class="cert-more" type="button" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
              <div class="cert-preview cert-preview--blue"><div><strong>Certificate of Excellence</strong>Youth Mentorship<br/>Volunity</div><div>Mar 5, 2025</div></div>
              <div class="cert-body">
                <div class="cert-title-row"><h3 class="cert-title">Youth Mentorship</h3><span class="badge badge--success">Completed</span></div>
                <p class="cert-issued">Issued on March 5, 2025</p>
                <p class="cert-desc">Presented for mentoring young learners and supporting educational growth in the program.</p>
                <div class="cert-actions"><button class="cert-download" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>Download</button></div>
              </div>
            </article>
            <article class="cert-card">
              <button class="cert-more" type="button" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
              <div class="cert-preview cert-preview--orange"><div><strong>Certificate Pending</strong>Tree Planting Drive<br/>Volunity</div><div>In progress</div></div>
              <div class="cert-body">
                <div class="cert-title-row"><h3 class="cert-title">Tree Planting Drive</h3><span class="badge badge--progress">In Progress</span></div>
                <p class="cert-issued">Expected June 2026</p>
                <p class="cert-desc">Complete the remaining volunteer hours on this project to unlock your certificate.</p>
                <div class="cert-actions"><button class="cert-locked" type="button" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>Not Yet Earned</button></div>
              </div>
            </article>
          </div>

          <div class="pagination-bar" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:0.8rem;color:var(--muted)">
            <span>Showing 1 to 4 of 4 certificates</span>
            <div class="pagination" style="display:flex;align-items:center;gap:6px">
              <button class="page-btn" type="button" aria-label="Previous" style="min-width:34px;height:34px;border:1px solid var(--line);border-radius:8px;background:#fff;display:inline-flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M15 18l-6-6 6-6"/></svg></button>
              <button type="button" style="min-width:34px;height:34px;border:none;border-radius:8px;background:var(--green-primary);color:#fff;font-weight:600">1</button>
              <button class="page-btn" type="button" aria-label="Next" style="min-width:34px;height:34px;border:1px solid var(--line);border-radius:8px;background:#fff;display:inline-flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg></button>
            </div>
          </div>
`,
});

const files = {
  "profile.html": profile,
  "explore.html": explore,
  "tasks.html": tasks,
  "checkin.html": checkin,
  "checkin-success.html": checkinSuccess,
  "notifications.html": notifications,
  "certificates.html": certificates,
};

for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(pagesDir, name), html, "utf8");
  console.log("wrote", name);
}
