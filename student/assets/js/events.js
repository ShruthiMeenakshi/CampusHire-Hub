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

  // Set active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  const eventsLink = document.querySelector('a[href="events.html"]');
  if (eventsLink) eventsLink.classList.add('active');

  const sidebar = document.getElementById('sidebar');
  const btnToggle = document.getElementById('btn-toggle-sidebar');
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Topbar actions: settings and logout
  const btnSettings = document.getElementById('btn-settings');
  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      console.log('Settings clicked');
    });
  }
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      window.location.href = '../login.html';
    });
  }

  // Events data
  let events = [
    {
      name: 'Career Fair 2024',
      date: '2024-02-15',
      description: 'Join us for the annual career fair where top companies will be recruiting.',
      registrationUrl: 'https://example.com/register-career-fair'
    },
    {
      name: 'Workshop on Resume Building',
      date: '2024-02-20',
      description: 'Learn how to build an effective resume from industry experts.',
      registrationUrl: 'https://example.com/register-resume-workshop'
    },
    {
      name: 'Alumni Networking Event',
      date: '2024-03-01',
      description: 'Connect with alumni and expand your professional network.',
      registrationUrl: 'https://example.com/register-alumni-networking'
    },
    {
      name: 'Interview Preparation Seminar',
      date: '2024-03-10',
      description: 'Tips and tricks for acing your job interviews.',
      registrationUrl: 'https://example.com/register-interview-seminar'
    },
    {
      name: 'Tech Talk: AI in Industry',
      date: '2024-03-15',
      description: 'Explore the role of AI in modern industries.',
      registrationUrl: 'https://example.com/register-tech-talk'
    },
    {
      name: 'Placement Drive Orientation',
      date: '2024-03-20',
      description: 'Get ready for upcoming placement drives.',
      registrationUrl: 'https://example.com/register-placement-orientation'
    }
  ];

  const eventsList = document.getElementById('events-list');

  function renderEvents() {
    eventsList.innerHTML = '';
    events.forEach(event => {
      const eventItem = document.createElement('div');
      eventItem.className = 'event-item';
      eventItem.innerHTML = `
        <h4 class="event-name">${event.name}</h4>
        <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
        <p class="event-description">${event.description}</p>
        <div class="event-actions">
          <button class="btn primary join-btn" data-url="${event.registrationUrl}">Join the Event</button>
        </div>
      `;
      eventItem.addEventListener('click', (e) => {
        if (!e.target.classList.contains('join-btn')) {
          openModal(event);
        }
      });
      eventsList.appendChild(eventItem);
    });
  }

  renderEvents();

  // Handle join buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('join-btn')) {
      const url = e.target.getAttribute('data-url');
      window.open(url, '_blank');
    }
  });

  // Handle add event button
  const addEventBtn = document.getElementById('add-event-btn');
  const addEventModal = document.getElementById('add-event-modal');
  const addEventForm = document.getElementById('add-event-form');
  const addClose = document.getElementById('add-close');
  const cancelAdd = document.getElementById('cancel-add');

  if (addEventBtn) {
    addEventBtn.addEventListener('click', () => {
      addEventModal.style.display = 'block';
    });
  }

  addClose.addEventListener('click', () => {
    addEventModal.style.display = 'none';
  });

  cancelAdd.addEventListener('click', () => {
    addEventModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === addEventModal) {
      addEventModal.style.display = 'none';
    }
  });

  addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const description = document.getElementById('event-description').value;
    const url = document.getElementById('event-url').value;

    events.push({
      name,
      date,
      description,
      registrationUrl: url
    });

    addEventForm.reset();
    addEventModal.style.display = 'none';
    renderEvents();
  });

  // Modal functionality
  const modal = document.getElementById('event-modal');
  const closeBtn = document.querySelector('.close');

  function openModal(event) {
    document.getElementById('modal-title').textContent = event.name;
    document.getElementById('modal-date').textContent = `Date: ${new Date(event.date).toLocaleDateString()}`;
    document.getElementById('modal-description').textContent = event.description;
    modal.style.display = 'block';
  }

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
})();