/* ═══════════════════════════════════════════════
   CS 224L – Web Technologies | UET Peshawar
   Shared JavaScript Utilities
═══════════════════════════════════════════════ */

/* ── Hamburger menu ── */
function initHamburger() {
  const hbg = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!hbg || !nav) return;
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    nav.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hbg.contains(e.target) && !nav.contains(e.target)) {
      hbg.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}

/* ── Scroll-spy: highlight active nav link ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navLinks.length) return;

  const onScroll = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href') || '';
      if (href === '#' + current || href.endsWith('/' + current + '.html')) {
        a.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Set active nav link by current page ── */
function setActiveNavByPage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.endsWith(page) || (page === '' && href.endsWith('index.html'))) {
      a.classList.add('active');
    }
  });
}

/* ── Form validation helpers ── */
function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  if (msg) el.textContent = msg;
}
function hideFieldError(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* ── Show alert banner ── */
function showAlert(id, show = true) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initScrollSpy();
  setActiveNavByPage();
});