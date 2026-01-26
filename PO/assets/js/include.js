// Lightweight include loader for injecting HTML fragments in PO pages
(function () {
  async function loadIncludes() {
    const nodes = document.querySelectorAll('[data-include]');
    await Promise.all(Array.from(nodes).map(async (el) => {
      const url = el.getAttribute('data-include');
      if (!url) return;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        el.innerHTML = await res.text();
      } catch (err) {
        console.warn('Failed to load include:', url, err);
        el.innerHTML = '<div style="padding:12px;color:#ff6b6b">Failed to load include: ' + url + '</div>';
      }
    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
  } else {
    loadIncludes();
  }
})();
