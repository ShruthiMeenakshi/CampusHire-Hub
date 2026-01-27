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
              data = { ...data, ...stepData };
            }
          });
        }
      } catch (_) {}
      // Fallback to legacy key
      if (!data.fullName && !data.email) {
        try {
          const legacy = JSON.parse(localStorage.getItem('ch_profile') || '{}');
          data = { ...legacy, ...data };
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
      const seed = encodeURIComponent(profile.fullName);
      imgEl.src = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
      imgEl.alt = profile.fullName + ' avatar';
    }
  })();

  // Set active nav link for My Applications
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'my-applications.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

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

  const applications = [
    {
      company: 'Infosys',
      logo: 'I',
      role: 'System Engineer',
      ctc: '₹ 4.2 LPA',
      status: 'In Progress',
      currentStage: 'HR Round',
      lastUpdated: 'Today',
      rounds: [
        {
          name: 'Aptitude Test',
          status: 'completed',
          difficulty: 'Medium',
          description: 'Tests logical reasoning, quantitative aptitude, and verbal ability.'
        },
        {
          name: 'Technical Round',
          status: 'completed',
          difficulty: 'Hard',
          description: 'Assesses technical knowledge in programming, data structures, and system design.'
        },
        {
          name: 'Coding Round',
          status: 'completed',
          difficulty: 'Medium',
          description: 'Live coding session to solve algorithmic problems.'
        },
        {
          name: 'HR Round',
          status: 'current',
          difficulty: 'Easy',
          description: 'Behavioral interview focusing on communication skills and cultural fit.'
        }
      ],
      resources: {
        aptitude: ['https://example.com/aptitude-practice', 'https://example.com/logical-reasoning'],
        coding: ['https://leetcode.com/company/infosys', 'https://hackerrank.com/infosys'],
        interview: ['https://example.com/infosys-interview-exp', 'https://example.com/hr-questions']
      },
      nextAction: {
        round: 'HR Round',
        topics: ['Communication Skills', 'Company Research', 'Behavioral Questions'],
        resources: ['https://example.com/hr-prep', 'https://example.com/mock-interview']
      },
      notes: 'Great technical rounds. Need to work on communication.',
      insights: {
        totalApplied: 1200,
        shortlistingRatio: '15%',
        avgTimeBetweenRounds: '2-3 days'
      }
    },
    {
      company: 'TCS',
      logo: 'T',
      role: 'Ninja',
      ctc: '₹ 3.5 LPA',
      status: 'In Progress',
      currentStage: 'Technical Interview',
      lastUpdated: 'Yesterday',
      rounds: [
        {
          name: 'Aptitude Test',
          status: 'completed',
          difficulty: 'Medium',
          description: 'Comprehensive test covering verbal, quantitative, and reasoning skills.'
        },
        {
          name: 'Coding Round',
          status: 'completed',
          difficulty: 'Hard',
          description: 'Two coding problems to be solved in 90 minutes.'
        },
        {
          name: 'Technical Interview',
          status: 'current',
          difficulty: 'Medium',
          description: 'Technical discussion on projects, algorithms, and domain knowledge.'
        },
        {
          name: 'Managerial Round',
          status: 'pending',
          difficulty: 'Medium',
          description: 'Discussion with manager about role expectations and team fit.'
        },
        {
          name: 'HR Round',
          status: 'pending',
          difficulty: 'Easy',
          description: 'Final round focusing on salary negotiation and offer discussion.'
        }
      ],
      resources: {
        aptitude: ['https://example.com/tcs-aptitude', 'https://example.com/ninja-prep'],
        coding: ['https://codechef.com/tcs', 'https://geeksforgeeks.org/tcs-coding'],
        interview: ['https://example.com/tcs-experiences', 'https://example.com/technical-questions']
      },
      nextAction: {
        round: 'Technical Interview',
        topics: ['Data Structures', 'Algorithms', 'Project Explanation'],
        resources: ['https://example.com/ds-algo', 'https://example.com/system-design']
      },
      notes: 'Coding round was challenging. Prepare DSA thoroughly.',
      insights: {
        totalApplied: 2500,
        shortlistingRatio: '12%',
        avgTimeBetweenRounds: '1 week'
      }
    },
    {
      company: 'Wipro',
      logo: 'W',
      role: 'Project Engineer',
      ctc: '₹ 3.8 LPA',
      status: 'Pending',
      currentStage: 'Online Assessment',
      lastUpdated: '2 days ago',
      rounds: [
        {
          name: 'Online Assessment',
          status: 'current',
          difficulty: 'Medium',
          description: 'Written test with aptitude, technical, and coding questions.'
        },
        {
          name: 'Technical Interview',
          status: 'pending',
          difficulty: 'Medium',
          description: 'Technical evaluation of programming skills and domain knowledge.'
        },
        {
          name: 'HR Interview',
          status: 'pending',
          difficulty: 'Easy',
          description: 'Discussion on career goals and company culture fit.'
        }
      ],
      resources: {
        aptitude: ['https://example.com/wipro-assessment', 'https://example.com/technical-mcq'],
        coding: ['https://example.com/wipro-coding', 'https://hackerearth.com/wipro'],
        interview: ['https://example.com/wipro-interviews', 'https://example.com/project-engineer-tips']
      },
      nextAction: {
        round: 'Online Assessment',
        topics: ['Aptitude', 'Basic Programming', 'Technical MCQs'],
        resources: ['https://example.com/assessment-guide', 'https://example.com/practice-tests']
      },
      notes: 'Focus on basic programming concepts and aptitude.',
      insights: {
        totalApplied: 1800,
        shortlistingRatio: '18%',
        avgTimeBetweenRounds: '3-4 days'
      }
    },
    {
      company: 'Zoho',
      logo: 'Z',
      role: 'Developer',
      ctc: '₹ 6.0 LPA',
      status: 'Under Review',
      currentStage: 'Applied',
      lastUpdated: '2 days ago',
      rounds: [
        {
          name: 'Application Review',
          status: 'current',
          difficulty: 'Easy',
          description: 'Initial screening of application and resume.'
        },
        {
          name: 'Aptitude Test',
          status: 'pending',
          difficulty: 'Medium',
          description: 'Written test covering programming logic and aptitude.'
        },
        {
          name: 'Programming Round',
          status: 'pending',
          difficulty: 'Hard',
          description: 'Advanced coding problems and algorithm challenges.'
        },
        {
          name: 'Technical Interview',
          status: 'pending',
          difficulty: 'Medium',
          description: 'In-depth technical discussion and problem-solving.'
        },
        {
          name: 'HR Interview',
          status: 'pending',
          difficulty: 'Easy',
          description: 'Final interview focusing on culture fit and expectations.'
        }
      ],
      resources: {
        aptitude: ['https://example.com/zoho-aptitude', 'https://example.com/programming-logic'],
        coding: ['https://example.com/zoho-puzzles', 'https://geeksforgeeks.org/zoho'],
        interview: ['https://example.com/zoho-experiences', 'https://example.com/developer-interviews']
      },
      nextAction: {
        round: 'Application Review',
        topics: ['Resume Preparation', 'Basic Coding', 'Company Research'],
        resources: ['https://example.com/resume-tips', 'https://example.com/zoho-culture']
      },
      notes: 'Zoho has unique programming puzzles. Practice extensively.',
      insights: {
        totalApplied: 800,
        shortlistingRatio: '25%',
        avgTimeBetweenRounds: '1-2 weeks'
      }
    },
    {
      company: 'Amazon',
      logo: 'A',
      role: 'SDE Intern',
      ctc: '₹ 1.2 LPM',
      status: 'Completed',
      currentStage: 'Coding Test',
      lastUpdated: '3 days ago',
      rounds: [
        {
          name: 'Online Assessment',
          status: 'completed',
          difficulty: 'Hard',
          description: 'Two coding problems and behavioral questions.'
        },
        {
          name: 'Coding Test',
          status: 'completed',
          difficulty: 'Hard',
          description: 'Virtual interview with coding challenges and system design.'
        }
      ],
      resources: {
        aptitude: [],
        coding: ['https://leetcode.com/company/amazon', 'https://example.com/amazon-coding'],
        interview: ['https://example.com/amazon-sde-interviews', 'https://example.com/leadership-principles']
      },
      nextAction: {
        round: 'Awaiting Results',
        topics: [],
        resources: []
      },
      notes: 'Challenging coding problems. Focus on optimization.',
      insights: {
        totalApplied: 5000,
        shortlistingRatio: '5%',
        avgTimeBetweenRounds: '2 weeks'
      }
    },
    {
      company: 'Accenture',
      logo: 'A',
      role: 'ASE',
      ctc: '₹ 4.5 LPA',
      status: 'Rejected',
      currentStage: 'Application Review',
      lastUpdated: '1 week ago',
      rounds: [
        {
          name: 'Application Review',
          status: 'completed',
          difficulty: 'Easy',
          description: 'Initial screening and eligibility check.'
        }
      ],
      resources: {
        aptitude: ['https://example.com/accenture-aptitude'],
        coding: ['https://example.com/accenture-coding'],
        interview: ['https://example.com/accenture-interviews']
      },
      nextAction: {
        round: 'N/A',
        topics: [],
        resources: []
      },
      notes: 'Did not meet eligibility criteria. Apply for other roles.',
      insights: {
        totalApplied: 3000,
        shortlistingRatio: '20%',
        avgTimeBetweenRounds: '1 week'
      }
    }
  ];

  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setText('total-applications', `Total Applied: ${applications.length}`);

  function createElement(tag, className = '', text = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function createBadge(status) {
    const cls = status === 'In Progress' ? 'info' : status === 'Completed' ? 'success' : status === 'Rejected' ? 'danger' : 'warning';
    const badge = createElement('span', 'badge ' + cls, status);
    return badge;
  }

  function renderProgressBar(rounds) {
    const progressBar = createElement('div', 'progress-bar');
    rounds.forEach((round, index) => {
      const step = createElement('div', 'progress-step');
      const dot = createElement('div', 'progress-dot');
      const label = createElement('div', 'progress-label', round.name);
      step.append(dot, label);

      if (round.status === 'completed') {
        step.classList.add('completed');
      } else if (round.status === 'current') {
        step.classList.add('current');
      } else {
        step.classList.add('pending');
      }

      progressBar.appendChild(step);
    });
    return progressBar;
  }

  function renderRounds(rounds) {
    const roundsGrid = createElement('div', 'rounds-grid');
    rounds.forEach(round => {
      const roundCard = createElement('div', 'round-card');

      const roundHeader = createElement('div', 'round-header');
      const roundTitle = createElement('div', 'round-title', round.name);
      const roundStatus = createElement('div', 'round-status ' + round.status, round.status.charAt(0).toUpperCase() + round.status.slice(1));
      roundHeader.append(roundTitle, roundStatus);

      const roundMeta = createElement('div', 'round-meta');
      const difficulty = createElement('span', '', `Difficulty: ${round.difficulty}`);
      roundMeta.appendChild(difficulty);

      const roundDesc = createElement('div', 'round-description', round.description);

      roundCard.append(roundHeader, roundMeta, roundDesc);
      roundsGrid.appendChild(roundCard);
    });
    return roundsGrid;
  }

  function renderResources(resources) {
    const resourcesGrid = createElement('div', 'resources-grid');

    if (resources.aptitude.length > 0) {
      const card = createElement('div', 'resource-card');
      const title = createElement('div', 'resource-title', 'Aptitude Practice');
      const links = createElement('div', 'resource-links');
      resources.aptitude.forEach(link => {
        const a = createElement('a', 'resource-link', 'Practice Link');
        a.href = link;
        a.target = '_blank';
        links.appendChild(a);
      });
      card.append(title, links);
      resourcesGrid.appendChild(card);
    }

    if (resources.coding.length > 0) {
      const card = createElement('div', 'resource-card');
      const title = createElement('div', 'resource-title', 'Coding Problems');
      const links = createElement('div', 'resource-links');
      resources.coding.forEach(link => {
        const a = createElement('a', 'resource-link', 'Coding Practice');
        a.href = link;
        a.target = '_blank';
        links.appendChild(a);
      });
      card.append(title, links);
      resourcesGrid.appendChild(card);
    }

    if (resources.interview.length > 0) {
      const card = createElement('div', 'resource-card');
      const title = createElement('div', 'resource-title', 'Interview Prep');
      const links = createElement('div', 'resource-links');
      resources.interview.forEach(link => {
        const a = createElement('a', 'resource-link', 'Interview Questions');
        a.href = link;
        a.target = '_blank';
        links.appendChild(a);
      });
      card.append(title, links);
      resourcesGrid.appendChild(card);
    }

    return resourcesGrid;
  }

  function renderNextAction(nextAction) {
    const section = createElement('div', 'next-action-section');
    const title = createElement('div', 'next-action-title', `Next: ${nextAction.round}`);

    const content = createElement('div', 'next-action-content');

    if (nextAction.topics.length > 0) {
      const topicsCard = createElement('div', 'resource-card');
      const topicsTitle = createElement('div', 'resource-title', 'Topics to Prepare');
      const topicsList = createElement('ul');
      nextAction.topics.forEach(topic => {
        const li = createElement('li', '', topic);
        topicsList.appendChild(li);
      });
      topicsCard.append(topicsTitle, topicsList);
      content.appendChild(topicsCard);
    }

    if (nextAction.resources.length > 0) {
      const resourcesCard = createElement('div', 'resource-card');
      const resourcesTitle = createElement('div', 'resource-title', 'Recommended Resources');
      const links = createElement('div', 'resource-links');
      nextAction.resources.forEach(link => {
        const a = createElement('a', 'resource-link', 'Resource Link');
        a.href = link;
        a.target = '_blank';
        links.appendChild(a);
      });
      resourcesCard.append(resourcesTitle, links);
      content.appendChild(resourcesCard);
    }

    section.append(title, content);
    return section;
  }

  function renderInsights(insights) {
    const section = createElement('div', 'insights-section');
    const title = createElement('div', 'insights-title', 'Company Insights');

    const grid = createElement('div', 'insights-grid');

    const applied = createElement('div', 'insight-item');
    const appliedValue = createElement('div', 'insight-value', insights.totalApplied.toString());
    const appliedLabel = createElement('div', 'insight-label', 'Total Applied');
    applied.append(appliedValue, appliedLabel);

    const ratio = createElement('div', 'insight-item');
    const ratioValue = createElement('div', 'insight-value', insights.shortlistingRatio);
    const ratioLabel = createElement('div', 'insight-label', 'Shortlisting Ratio');
    ratio.append(ratioValue, ratioLabel);

    const time = createElement('div', 'insight-item');
    const timeValue = createElement('div', 'insight-value', insights.avgTimeBetweenRounds);
    const timeLabel = createElement('div', 'insight-label', 'Avg Time Between Rounds');
    time.append(timeValue, timeLabel);

    grid.append(applied, ratio, time);
    section.append(title, grid);
    return section;
  }

  function renderApplicationCard(app) {
    const card = createElement('div', 'application-card');

    // Header
    const header = createElement('div', 'application-header');
    const logo = createElement('div', 'company-logo', app.logo);
    const info = createElement('div', 'company-info');
    const companyName = createElement('h3', '', app.company);
    const role = createElement('p', '', app.role);
    info.append(companyName, role);
    header.append(logo, info);

    // Meta
    const meta = createElement('div', 'application-meta');
    const left = createElement('div', 'left');
    const ctcItem = createElement('div', 'meta-item');
    const ctcLabel = createElement('div', '', 'CTC');
    ctcLabel.className = 'label';
    const ctcValue = createElement('div', '', app.ctc);
    ctcValue.className = 'value';
    ctcItem.append(ctcLabel, ctcValue);

    const statusItem = createElement('div', 'meta-item');
    const statusLabel = createElement('div', '', 'Status');
    statusLabel.className = 'label';
    const statusValue = createElement('div', '');
    statusValue.className = 'value';
    statusValue.appendChild(createBadge(app.status));
    statusItem.append(statusLabel, statusValue);

    const updatedItem = createElement('div', 'meta-item');
    const updatedLabel = createElement('div', '', 'Last Updated');
    updatedLabel.className = 'label';
    const updatedValue = createElement('div', '', app.lastUpdated);
    updatedValue.className = 'value';
    updatedItem.append(updatedLabel, updatedValue);

    left.append(ctcItem, statusItem, updatedItem);

    const expandBtn = createElement('button', 'expand-btn');
    const expandIcon = createElement('i', 'ph ph-caret-down');
    const expandText = createElement('span', '', 'Details');
    expandBtn.append(expandIcon, expandText);
    expandBtn.addEventListener('click', () => {
      card.classList.toggle('expanded');
      expandIcon.className = card.classList.contains('expanded') ? 'ph ph-caret-up' : 'ph ph-caret-down';
    });

    meta.append(left, expandBtn);

    // Expanded content
    const expanded = createElement('div', 'application-expanded');

    // Progress
    const progressSection = createElement('div', 'progress-section');
    const progressHeader = createElement('div', 'progress-header');
    const progressTitle = createElement('h4', '', 'Application Progress');
    const currentStage = createElement('span', '', `Current: ${app.currentStage}`);
    progressHeader.append(progressTitle, currentStage);

    const progressBar = renderProgressBar(app.rounds);

    progressSection.append(progressHeader, progressBar);

    // Rounds
    const roundsSection = createElement('div', 'rounds-section');
    const roundsTitle = createElement('h4', '', 'Recruitment Rounds');
    const roundsGrid = renderRounds(app.rounds);
    roundsSection.append(roundsTitle, roundsGrid);

    // Resources
    const resourcesSection = createElement('div', 'resources-section');
    const resourcesTitle = createElement('h4', '', 'Preparation Resources');
    const resourcesGrid = renderResources(app.resources);
    resourcesSection.append(resourcesTitle, resourcesGrid);

    // Next Action
    const nextActionSection = renderNextAction(app.nextAction);

    // Notes
    const notesSection = createElement('div', 'notes-section');
    const notesCard = createElement('div', 'notes-card');
    const notesTitle = createElement('div', 'notes-title', 'Personal Notes');
    const notesTextarea = createElement('textarea', 'notes-textarea');
    notesTextarea.value = app.notes;
    notesTextarea.placeholder = 'Add your notes about this application...';
    notesCard.append(notesTitle, notesTextarea);
    notesSection.appendChild(notesCard);

    // Insights
    const insightsSection = renderInsights(app.insights);

    expanded.append(progressSection, roundsSection, resourcesSection, nextActionSection, notesSection, insightsSection);

    card.append(header, meta, expanded);

    return card;
  }

  const grid = document.getElementById('applications-grid');
  if (grid) {
    applications.forEach(app => {
      const card = renderApplicationCard(app);
      grid.appendChild(card);
    });
  }
})();