(async function init() {
  async function loadIncludes() {
    const includeNodes = document.querySelectorAll('[data-include]');
    for (const node of includeNodes) {
      const url = node.getAttribute('data-include');
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        node.innerHTML = await res.text();
      } catch (err) {
        node.innerHTML = '<div style="padding:12px;color:#ff6b6b">Failed to load include: ' + url + '</div>';
        console.warn('Include load failed for', url, err);
      }
    }
  }

  await loadIncludes();

  // Highlight active nav link by current page
  (function setActiveNavByPath() {
    const current = (location.pathname.split('/').pop() || '').toLowerCase();
    const links = document.querySelectorAll('.nav .nav-link');
    links.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href.endsWith('.html')) {
        if (href === current) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  })();

  // Populate header user info from saved profile
  (function updateHeaderProfile() {
    function readProfile() {
      const loginEmail = localStorage.getItem('ch_email') || '';
      let data = {};
      try {
        const wizRaw = localStorage.getItem('profileWizardData');
        if (wizRaw) {
          const wiz = JSON.parse(wizRaw);
          Object.keys(wiz || {}).forEach(key => {
            const stepData = wiz[key];
            if (stepData && typeof stepData === 'object') {
              data = {
                ...data,
                ...stepData
              };
            }
          });
        }
      } catch (_) {}
      // Fallback to legacy key
      if (!data.fullName && !data.email) {
        try {
          const legacy = JSON.parse(localStorage.getItem('ch_profile') || '{}');
          data = {
            ...legacy,
            ...data
          };
        } catch (_) {}
      }
      // Normalize possible older field name
      data.degree = data.degree || data.program || '';
      return {
        fullName: (data.fullName || '').trim(),
        degree: (data.degree || '').trim(),
        email: (data.email || loginEmail).trim()
      };
    }

    const profile = readProfile();
    const userAnchor = document.querySelector('.actions .user');
    if (!userAnchor) return;
    const nameEl = userAnchor.querySelector('.name');
    const roleEl = userAnchor.querySelector('.role');
    const imgEl = userAnchor.querySelector('img');

    if (nameEl) nameEl.textContent = profile.fullName || profile.email || 'Student';
    if (roleEl) roleEl.textContent = profile.degree || 'Student';
    if (imgEl && profile.fullName) {
      // Use a deterministic avatar seed for consistency
      const seed = encodeURIComponent(profile.fullName);
      imgEl.src = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
      imgEl.alt = profile.fullName + ' avatar';
    }
  })();

  const app = document.getElementById('app');
  const sidebar = document.getElementById('sidebar');
  const btnToggle = document.getElementById('btn-toggle-sidebar');
  function isMobile() { return window.matchMedia('(max-width: 820px)').matches; }

  function ensureBackdrop() {
    let backdrop = document.getElementById('sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebar-backdrop';
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', () => closeMobileSidebar());
    }
    return backdrop;
  }
  function openMobileSidebar() {
    sidebar.classList.add('open');
    const backdrop = ensureBackdrop();
    backdrop.classList.add('active');
    document.body.classList.add('mobile-sidebar-open');
  }
  function closeMobileSidebar() {
    sidebar.classList.remove('open');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('mobile-sidebar-open');
  }

  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      if (isMobile()) {
        if (sidebar.classList.contains('open')) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      } else if (app) {
        app.classList.toggle('sidebar-collapsed');
      }
    });
  }

  // Bind mobile back button inside sidebar
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');
  if (btnCloseSidebar) {
    btnCloseSidebar.addEventListener('click', () => {
      if (isMobile()) closeMobileSidebar();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (isMobile() && e.key === 'Escape') {
      closeMobileSidebar();
    }
  });

  // Logout handler: clear session/localStorage (preserve theme) and redirect
  (function bindLogout() {
    const btnLogout = document.getElementById('btn-logout');
    if (!btnLogout) return;
    btnLogout.addEventListener('click', () => {
      const theme = localStorage.getItem('ch_theme');
      try {
        localStorage.clear();
      } catch (_) {}
      if (theme) {
        try {
          localStorage.setItem('ch_theme', theme);
        } catch (_) {}
      }
      window.location.href = '../login.html';
    });
  })();

  // Theme toggling
  (function themeInit() {
    const root = document.documentElement;
    const btnTheme = document.getElementById('btn-theme');
    const icon = btnTheme ? btnTheme.querySelector('i') : null;
    const saved = localStorage.getItem('ch_theme');
    if (saved === 'light') root.setAttribute('data-theme', 'light');

    function isLight() {
      return root.getAttribute('data-theme') === 'light';
    }

    function syncIcon() {
      if (!icon) return;
      icon.className = isLight() ? 'ph ph-sun' : 'ph ph-moon';
    }
    syncIcon();
    if (btnTheme) {
      btnTheme.addEventListener('click', () => {
        if (isLight()) {
          root.removeAttribute('data-theme');
          localStorage.setItem('ch_theme', 'dark');
        } else {
          root.setAttribute('data-theme', 'light');
          localStorage.setItem('ch_theme', 'light');
        }
        syncIcon();
        // Update chart colors on theme switch
        try {
          refreshChartsTheme();
        } catch (_) {}
      });
    }
  })();

  // Link topbar icons to student pages
  (function linkTopbarIcons() {
    const links = {
      btnProfile: 'profile.html',
      btnSettings: 'settings.html',
      btnNotifications: 'index.html'
    };
    const map = [
      ['btn-profile', links.btnProfile],
      ['btn-settings', links.btnSettings],
      ['btn-notifications', links.btnNotifications]
    ];
    map.forEach(([id, href]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          window.location.href = href;
        });
      }
    });
  })();

  const data = {
    kpis: {
      placed: {
        value: 412,
        trend: '+12.3% vs last year'
      },
      drives: {
        value: 18,
        trend: '3 closing soon'
      },
      ctc: {
        value: '₹ 32 LPA',
        trend: '+2 LPA'
      },
      companies: {
        value: 56,
        trend: '8 new'
      }
    },
    trend: {
      labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      values: [38, 52, 69, 102, 156, 210]
    },
    dept: {
      labels: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT'],
      values: [62, 48, 31, 22, 18, 44]
    },
    drives: [{
        company: 'Infosys',
        role: 'System Engineer',
        date: '25 Jan 2026',
        ctc: '₹ 4.2 LPA',
        status: 'Open'
      },
      {
        company: 'TCS',
        role: 'Ninja',
        date: '28 Jan 2026',
        ctc: '₹ 3.5 LPA',
        status: 'Open'
      },
      {
        company: 'Amazon',
        role: 'SDE Intern',
        date: '02 Feb 2026',
        ctc: '₹ 1.2 LPM',
        status: 'Upcoming'
      },
      {
        company: 'Accenture',
        role: 'ASE',
        date: '05 Feb 2026',
        ctc: '₹ 4.5 LPA',
        status: 'Upcoming'
      }
    ],
    applications: [{
        company: 'Infosys',
        role: 'System Engineer',
        stage: 'HR Round',
        updated: 'Today'
      },
      {
        company: 'TCS',
        role: 'Ninja',
        stage: 'Technical',
        updated: 'Yesterday'
      },
      {
        company: 'Wipro',
        role: 'Project Engineer',
        stage: 'Assessment',
        updated: '2 days ago'
      },
      {
        company: 'Zoho',
        role: 'Developer',
        stage: 'Applied',
        updated: '2 days ago'
      }
    ],
    announcements: [{
        type: 'info',
        title: 'Mock Interviews',
        meta: 'CSE block, 23 Jan, 10AM-4PM'
      },
      {
        type: 'warning',
        title: 'Resume Workshop',
        meta: 'ECE Seminar Hall, 24 Jan, 3PM'
      },
      {
        type: 'info',
        title: 'Hackathon 2026',
        meta: 'Register by 27 Jan'
      }
    ],
    events: [{
        type: 'success',
        title: 'Infosys Drive',
        meta: '25 Jan, Hall A'
      },
      {
        type: 'info',
        title: 'TCS Orientation',
        meta: '28 Jan, Online'
      },
      {
        type: 'success',
        title: 'Amazon Coding Test',
        meta: '02 Feb, Lab 2'
      }
    ]
  };

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  setText('kpi-placed', data.kpis.placed.value);
  setText('kpi-placed-trend', data.kpis.placed.trend);
  setText('kpi-drives', data.kpis.drives.value);
  setText('kpi-drives-trend', data.kpis.drives.trend);
  setText('kpi-ctc', data.kpis.ctc.value);
  setText('kpi-ctc-trend', data.kpis.ctc.trend);
  setText('kpi-companies', data.kpis.companies.value);
  setText('kpi-companies-trend', data.kpis.companies.trend);

  function td(text) {
    const d = document.createElement('td');
    d.textContent = text;
    return d;
  }

  function badge(status) {
    const b = document.createElement('span');
    const cls = status === 'Open' ? 'success' : status === 'Upcoming' ? 'info' : 'warning';
    b.className = 'badge ' + cls;
    b.textContent = status;
    const d = document.createElement('td');
    d.appendChild(b);
    return d;
  }

  const tbDrives = document.querySelector('#table-drives tbody');
  if (tbDrives) {
    data.drives.forEach(row => {
      const tr = document.createElement('tr');
      tr.append(td(row.company));
      tr.append(td(row.role));
      tr.append(td(row.date));
      tr.append(td(row.ctc));
      tr.append(badge(row.status));
      tbDrives.append(tr);
    });
  }

  const tbApps = document.querySelector('#table-applications tbody');
  if (tbApps) {
    data.applications.forEach(row => {
      const tr = document.createElement('tr');
      tr.append(td(row.company));
      tr.append(td(row.role));
      tr.append(td(row.stage));
      tr.append(td(row.updated));
      tbApps.append(tr);
    });
  }

  function renderList(id, items) {
    const ul = document.getElementById(id);
    if (!ul) return;
    items.forEach(it => {
      const li = document.createElement('li');
      const dot = document.createElement('span');
      dot.className = 'dot ' + it.type;
      const wrap = document.createElement('div');
      const title = document.createElement('div');
      const meta = document.createElement('div');
      title.textContent = it.title;
      meta.textContent = it.meta;
      meta.className = 'meta';
      wrap.append(title, meta);
      li.append(dot, wrap);
      ul.append(li);
    });
  }
  renderList('list-announcements', data.announcements);
  renderList('list-events', data.events);

  // Make events list clickable to navigate to events page
  const eventsUl = document.getElementById('list-events');
  if (eventsUl) {
    eventsUl.addEventListener('click', () => {
      window.location.href = 'events.html';
    });
  }

  // Helpers to read CSS variables for theming
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function gridColor() {
    return document.documentElement.getAttribute('data-theme') === 'light' ?
      'rgba(15,23,42,0.08)' :
      'rgba(255,255,255,0.06)';
  }

  let chartTrendInstance = null;
  let chartDeptInstance = null;

  const trendCtx = document.getElementById('chartTrend');
  if (trendCtx && window.Chart) {
    chartTrendInstance = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: data.trend.labels,
        datasets: [{
          label: 'Students Placed',
          data: data.trend.values,
          borderColor: cssVar('--primary') || '#5b8cff',
          tension: 0.35,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: cssVar('--primary') || '#5b8cff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              color: gridColor()
            },
            ticks: {
              color: cssVar('--muted') || '#9aa4c7'
            }
          },
          y: {
            grid: {
              color: gridColor()
            },
            ticks: {
              color: cssVar('--muted') || '#9aa4c7'
            }
          }
        }
      }
    });
  }

  const deptCtx = document.getElementById('chartDept');
  if (deptCtx && window.Chart) {
    chartDeptInstance = new Chart(deptCtx, {
      type: 'bar',
      data: {
        labels: data.dept.labels,
        datasets: [{
          label: 'Placed',
          data: data.dept.values,
          backgroundColor: cssVar('--success') || '#2cc88d',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: cssVar('--muted') || '#9aa4c7'
            }
          },
          y: {
            grid: {
              color: gridColor()
            },
            ticks: {
              color: cssVar('--muted') || '#9aa4c7'
            }
          }
        }
      }
    });
  }

  function refreshChartsTheme() {
    if (chartTrendInstance) {
      const ds = chartTrendInstance.data.datasets[0];
      ds.borderColor = cssVar('--primary') || '#5b8cff';
      ds.pointBackgroundColor = cssVar('--primary') || '#5b8cff';
      chartTrendInstance.options.scales.x.grid.color = gridColor();
      chartTrendInstance.options.scales.y.grid.color = gridColor();
      chartTrendInstance.options.scales.x.ticks.color = cssVar('--muted') || '#9aa4c7';
      chartTrendInstance.options.scales.y.ticks.color = cssVar('--muted') || '#9aa4c7';
      chartTrendInstance.update();
    }
    if (chartDeptInstance) {
      const ds = chartDeptInstance.data.datasets[0];
      ds.backgroundColor = cssVar('--success') || '#2cc88d';
      chartDeptInstance.options.scales.y.grid.color = gridColor();
      chartDeptInstance.options.scales.x.ticks.color = cssVar('--muted') || '#9aa4c7';
      chartDeptInstance.options.scales.y.ticks.color = cssVar('--muted') || '#9aa4c7';
      chartDeptInstance.update();
    }
  }
})();