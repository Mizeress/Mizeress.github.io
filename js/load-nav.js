// js/load-nav.js - robust loader with path fallbacks
(function() {
  async function fetchHtml(path) {
    try {
      const resp = await fetch(path, { cache: 'no-store' });
      if (!resp.ok) return null;
      return await resp.text();
    } catch (e) {
      return null;
    }
  }

  async function loadNav() {
    try {
      const placeholder = document.getElementById('siteNav');
      if (!placeholder) return;

      // Try likely locations in order: project site relative, includes at root, user site absolute
      const candidates = ['./includes/nav.html', 'includes/nav.html', '/includes/nav.html'];
      let html = null;
      for (const p of candidates) {
        html = await fetchHtml(p);
        if (html) {
          console.info('Loaded nav from', p);
          break;
        }
      }

      if (!html) {
        console.warn('Shared nav not found. Checked:', candidates.join(', '));
        return;
      }

      placeholder.innerHTML = html;

      // Auto-highlight current page link
      const links = placeholder.querySelectorAll('a.nav-link');
      const path = location.pathname.split('/').pop() || 'index.html';
      links.forEach(a => {
        const href = (a.getAttribute('href') || '').split('/').pop();
        if (href === path || (href === 'index.html' && path === '')) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
      });
    } catch (e) {
      console.error('load-nav failed', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNav);
  } else {
    loadNav();
  }
})();