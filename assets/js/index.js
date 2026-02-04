// Current year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.add('hidden');
    }
  });
}

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileNav) mobileNav.classList.add('hidden');
      }
    }
  });
});

// Active section highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a, #mobileNav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id') || '';
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-white', 'bg-gray-800');
    if (current && link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-white', 'bg-gray-800');
    }
  });
});
