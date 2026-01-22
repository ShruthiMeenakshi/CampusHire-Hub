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

  const sidebar = document.getElementById('sidebar');
  const btnToggle = document.getElementById('btn-toggle-sidebar');
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  const data = {
    kpis: {
      placed: { value: 412, trend: '+12.3% vs last year' },
      drives: { value: 18, trend: '3 closing soon' },
      ctc: { value: '₹ 32 LPA', trend: '+2 LPA' },
      companies: { value: 56, trend: '8 new' }
    },
    trend: {
      labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      values: [38, 52, 69, 102, 156, 210]
    },
    dept: {
      labels: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT'],
      values: [62, 48, 31, 22, 18, 44]
    },
    drives: [
      { company: 'Infosys', role: 'System Engineer', date: '25 Jan 2026', ctc: '₹ 4.2 LPA', status: 'Open' },
      { company: 'TCS', role: 'Ninja', date: '28 Jan 2026', ctc: '₹ 3.5 LPA', status: 'Open' },
      { company: 'Amazon', role: 'SDE Intern', date: '02 Feb 2026', ctc: '₹ 1.2 LPM', status: 'Upcoming' },
      { company: 'Accenture', role: 'ASE', date: '05 Feb 2026', ctc: '₹ 4.5 LPA', status: 'Upcoming' }
    ],
    applications: [
      { company: 'Infosys', role: 'System Engineer', stage: 'HR Round', updated: 'Today' },
      { company: 'TCS', role: 'Ninja', stage: 'Technical', updated: 'Yesterday' },
      { company: 'Wipro', role: 'Project Engineer', stage: 'Assessment', updated: '2 days ago' },
      { company: 'Zoho', role: 'Developer', stage: 'Applied', updated: '2 days ago' }
    ],
    announcements: [
      { type: 'info', title: 'Mock Interviews', meta: 'CSE block, 23 Jan, 10AM-4PM' },
      { type: 'warning', title: 'Resume Workshop', meta: 'ECE Seminar Hall, 24 Jan, 3PM' },
      { type: 'info', title: 'Hackathon 2026', meta: 'Register by 27 Jan' }
    ],
    events: [
      { type: 'success', title: 'Infosys Drive', meta: '25 Jan, Hall A' },
      { type: 'info', title: 'TCS Orientation', meta: '28 Jan, Online' },
      { type: 'success', title: 'Amazon Coding Test', meta: '02 Feb, Lab 2' }
    ]
  };

  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setText('kpi-placed', data.kpis.placed.value);
  setText('kpi-placed-trend', data.kpis.placed.trend);
  setText('kpi-drives', data.kpis.drives.value);
  setText('kpi-drives-trend', data.kpis.drives.trend);
  setText('kpi-ctc', data.kpis.ctc.value);
  setText('kpi-ctc-trend', data.kpis.ctc.trend);
  setText('kpi-companies', data.kpis.companies.value);
  setText('kpi-companies-trend', data.kpis.companies.trend);

  function td(text) { const d = document.createElement('td'); d.textContent = text; return d; }
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

  const trendCtx = document.getElementById('chartTrend');
  if (trendCtx && window.Chart) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: data.trend.labels,
        datasets: [{
          label: 'Students Placed',
          data: data.trend.values,
          borderColor: '#5b8cff',
          tension: 0.35,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: '#5b8cff'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9aa4c7' } },
          y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9aa4c7' } }
        }
      }
    });
  }

  const deptCtx = document.getElementById('chartDept');
  if (deptCtx && window.Chart) {
    new Chart(deptCtx, {
      type: 'bar',
      data: {
        labels: data.dept.labels,
        datasets: [{
          label: 'Placed',
          data: data.dept.values,
          backgroundColor: '#2cc88d',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#9aa4c7' } },
          y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9aa4c7' } }
        }
      }
    });
  }
})();
