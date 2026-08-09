import { useEffect } from 'react';

// Ported from js/main.js's IntersectionObserver-based scroll reveal — runs once
// per page mount, re-queries on each route change since page content differs.
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll('.feature-card, .step, .constellation-card, .stat');
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
