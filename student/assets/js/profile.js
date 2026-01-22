(function initProfile() {
  // Prefill email from login
  document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('ch_email');
    const form = document.getElementById('profileForm');
    if (email) {
      const emailInput = document.getElementById('email');
      if (emailInput && !emailInput.value) emailInput.value = email;
    }

    // Load saved profile (if any)
    const saved = localStorage.getItem('ch_profile');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Array.from(form.elements).forEach(el => {
          if (el.name && data[el.name] !== undefined) {
            el.value = data[el.name];
          }
        });
      } catch (e) { /* ignore */ }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {};
      Array.from(form.elements).forEach(el => {
        if (el.name) data[el.name] = el.value;
      });
      localStorage.setItem('ch_profile', JSON.stringify(data));
      // Redirect to read-only profile view
      window.location.href = 'profile-view.html';
    });

    // Go to Overview button with required field check
    const btnOverview = document.getElementById('btn-overview');
    if (btnOverview) {
      btnOverview.addEventListener('click', () => {
        const required = ['fullName','studentId','email','phone','department','program','year'];
        let missing = [];
        required.forEach(name => {
          const el = form.querySelector('[name="' + name + '"]');
          const val = el ? (el.value || '').trim() : '';
          if (!val) missing.push(name);
        });
        if (missing.length) {
          alert('Please complete required fields: ' + missing.join(', '));
          const firstMissing = form.querySelector('[name="' + missing[0] + '"]');
          if (firstMissing) firstMissing.focus();
          return;
        }
        // Persist latest values
        const data = {};
        Array.from(form.elements).forEach(el => { if (el.name) data[el.name] = el.value; });
        localStorage.setItem('ch_profile', JSON.stringify(data));
        // Navigate to overview/dashboard
        window.location.href = 'index.html';
      });
    }
  });
})();
