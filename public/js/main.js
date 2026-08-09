/* ═══════════════════════════════════════════════════════════════
   HATHOR — Shared Scripts
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile hamburger toggle ───
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Intersection Observer for section animations ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature-card, .step, .constellation-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ─── Portal form handler ───
  const portalForm = document.querySelector('.portal-launch');
  if (portalForm) {
    portalForm.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.querySelector('input[type="email"]');
      const pass  = document.querySelector('input[type="password"]');
      if (!email || !pass || !email.value || !pass.value) {
        alert('Please enter your credentials to access the platform.');
        return;
      }
      // In production, this would POST to your auth endpoint
      // and redirect with a session token
      alert('Authentication service coming soon. Contact hathor@sansmercantile.com for early access.');
    });
  }
});
