/* ===== DRIVES PAGE - MAIN INITIALIZATION ===== */
(async function init() {
  // Load includes (sidebar, topbar) dynamically
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

  // Setup sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const btnToggle = document.getElementById('btn-toggle-sidebar');
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  /* ===== DRIVES DATA ===== */
  const drivesData = [
    {
      id: 1,
      company: 'Infosys',
      role: 'System Engineer',
      ctc: '₹4.2 LPA',
      date: '25 Jan 2026',
      status: 'open',
      applied: false
    },
    {
      id: 2,
      company: 'TCS',
      role: 'Ninja',
      ctc: '₹3.5 LPA',
      date: '28 Jan 2026',
      status: 'open',
      applied: false
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'SDE Intern',
      ctc: '₹1.2 LPM',
      date: '02 Feb 2026',
      status: 'upcoming',
      applied: false
    },
    {
      id: 4,
      company: 'Accenture',
      role: 'Associate Software Engineer',
      ctc: '₹4.5 LPA',
      date: '05 Feb 2026',
      status: 'upcoming',
      applied: false
    },
    {
      id: 5,
      company: 'Microsoft',
      role: 'Software Engineer',
      ctc: '₹8.5 LPA',
      date: '08 Feb 2026',
      status: 'open',
      applied: false
    },
    {
      id: 6,
      company: 'Google',
      role: 'Associate Developer',
      ctc: '₹2.5 LPM',
      date: '10 Feb 2026',
      status: 'upcoming',
      applied: false
    },
    {
      id: 7,
      company: 'Wipro',
      role: 'Project Engineer',
      ctc: '₹3.8 LPA',
      date: '12 Feb 2026',
      status: 'open',
      applied: false
    },
    {
      id: 8,
      company: 'IBM',
      role: 'Graduate Trainee',
      ctc: '₹4.0 LPA',
      date: '15 Feb 2026',
      status: 'closed',
      applied: false
    },
    {
      id: 9,
      company: 'Cognizant',
      role: 'Programmer Analyst',
      ctc: '₹3.2 LPA',
      date: '18 Feb 2026',
      status: 'upcoming',
      applied: false
    },
    {
      id: 10,
      company: 'Capgemini',
      role: 'Technology Analyst',
      ctc: '₹4.1 LPA',
      date: '20 Feb 2026',
      status: 'open',
      applied: false
    },
    {
      id: 11,
      company: 'HCL Technologies',
      role: 'System Engineer',
      ctc: '₹3.6 LPA',
      date: '22 Feb 2026',
      status: 'closed',
      applied: false
    },
    {
      id: 12,
      company: 'Deloitte',
      role: 'Analyst',
      ctc: '₹4.3 LPA',
      date: '25 Feb 2026',
      status: 'upcoming',
      applied: false
    }
  ];

  /* ===== LOCALSTORAGE MANAGEMENT ===== */
  
  /**
   * Load applied drives from localStorage
   */
  function loadAppliedDrives() {
    const stored = localStorage.getItem('appliedDrives');
    if (stored) {
      try {
        const appliedIds = JSON.parse(stored);
        drivesData.forEach(drive => {
          if (appliedIds.includes(drive.id)) {
            drive.applied = true;
            drive.status = 'applied';
          }
        });
      } catch (err) {
        console.warn('Error loading applied drives from localStorage:', err);
      }
    }
  }

  /**
   * Save applied drive to localStorage
   */
  function saveAppliedDrive(driveId) {
    const stored = localStorage.getItem('appliedDrives');
    const appliedIds = stored ? JSON.parse(stored) : [];
    
    if (!appliedIds.includes(driveId)) {
      appliedIds.push(driveId);
      localStorage.setItem('appliedDrives', JSON.stringify(appliedIds));
    }
  }

  /* ===== DRIVE CARD CREATION ===== */
  
  /**
   * Create a drive card DOM element
   */
  function createDriveCard(drive) {
    const card = document.createElement('div');
    card.className = 'drive-card';
    card.dataset.id = drive.id;
    card.dataset.status = drive.status;
    card.dataset.company = drive.company.toLowerCase();
    card.dataset.role = drive.role.toLowerCase();

    const isApplied = drive.applied;
    const buttonDisabled = isApplied || drive.status === 'closed';
    const buttonClass = isApplied ? 'secondary' : 'primary';
    const buttonText = isApplied ? 'Applied' : 'Apply Now';

    card.innerHTML = `
      <div class="drive-card-header">
        <div class="company-info">
          <h3 class="company-name">${escapeHtml(drive.company)}</h3>
          <p class="role-text">${escapeHtml(drive.role)}</p>
        </div>
        <span class="status-badge ${drive.status}">
          ${capitalizeFirstLetter(drive.status === 'applied' ? 'applied' : drive.status)}
        </span>
      </div>

      <div class="drive-card-body">
        <div class="drive-detail-row">
          <span class="detail-label">Package</span>
          <span class="detail-value highlight">${escapeHtml(drive.ctc)}</span>
        </div>
        <div class="drive-detail-row">
          <span class="detail-label">Drive Status</span>
          <span class="detail-value">${capitalizeFirstLetter(drive.status === 'applied' ? 'applied' : drive.status)}</span>
        </div>
      </div>

      <div class="drive-card-footer">
        <span class="drive-date">
          <i class="ph ph-calendar"></i>
          ${escapeHtml(drive.date)}
        </span>
        <button 
          class="apply-btn ${buttonClass}" 
          ${buttonDisabled ? 'disabled' : ''} 
          data-drive-id="${drive.id}"
        >
          ${buttonText}
        </button>
      </div>
    `;

    // Attach apply button event listener
    if (!buttonDisabled) {
      const btn = card.querySelector('.apply-btn');
      btn.addEventListener('click', () => handleApplyClick(drive.id, card));
    }

    return card;
  }

  /**
   * Handle apply button click
   */
  function handleApplyClick(driveId, cardElement) {
    const drive = drivesData.find(d => d.id === driveId);
    if (!drive || drive.applied) return;

    // Update data
    drive.applied = true;
    drive.status = 'applied';

    // Save to localStorage
    saveAppliedDrive(driveId);

    // Update button
    const btn = cardElement.querySelector('.apply-btn');
    btn.textContent = 'Applied';
    btn.disabled = true;
    btn.classList.remove('primary');
    btn.classList.add('secondary');

    // Update status badge
    const badge = cardElement.querySelector('.status-badge');
    badge.className = 'status-badge applied';
    badge.textContent = 'Applied';

    // Add feedback
    showApplyFeedback(drive.company);
  }

  /**
   * Show apply feedback toast
   */
  function showApplyFeedback(companyName) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #2cc88d 0%, #20a066 100%);
      color: white;
      padding: 14px 20px;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(44, 200, 141, 0.3);
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = `Applied to ${companyName} successfully!`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ===== RENDERING & FILTERING ===== */
  
  /**
   * Render drives based on filters and search
   */
  function renderDrives(searchTerm = '', filterStatus = 'all') {
    const container = document.getElementById('drives-container');
    const emptyState = document.getElementById('empty-state');

    if (!container) return;

    // Filter drives
    let filteredDrives = drivesData.filter(drive => {
      // Status filter
      const statusMatch = filterStatus === 'all' || drive.status === filterStatus;

      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const searchMatch = 
        drive.company.toLowerCase().includes(searchLower) ||
        drive.role.toLowerCase().includes(searchLower);

      return statusMatch && searchMatch;
    });

    // Clear container
    container.innerHTML = '';

    // Show/hide empty state
    if (filteredDrives.length === 0) {
      emptyState.style.display = 'flex';
    } else {
      emptyState.style.display = 'none';

      // Render cards
      filteredDrives.forEach(drive => {
        const card = createDriveCard(drive);
        container.appendChild(card);
      });
    }
  }

  /* ===== EVENT LISTENERS ===== */
  
  /**
   * Setup search input listener
   */
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      const activeFilter = document.querySelector('.filter-pill.active');
      const filterStatus = activeFilter ? activeFilter.dataset.filter : 'all';
      renderDrives(searchTerm, filterStatus);
    });
  }

  /**
   * Setup filter pill listeners
   */
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active state
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Re-render
      const searchTerm = searchInput ? searchInput.value : '';
      const filterStatus = pill.dataset.filter;
      renderDrives(searchTerm, filterStatus);
    });
  });

  /* ===== UTILITY FUNCTIONS ===== */
  
  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Capitalize first letter
   */
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ===== INITIALIZATION ===== */
  
  // Load applied drives from localStorage
  loadAppliedDrives();

  // Initial render
  renderDrives();

  // Add keyframe animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

})();
