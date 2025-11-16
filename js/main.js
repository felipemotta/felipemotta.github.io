  document.addEventListener('DOMContentLoaded', () => {
    // ---------------- TECHNIQUE CARDS REVEAL ----------------
    const techniqueCards = document.querySelectorAll('#technique .tech-card');

    if ('IntersectionObserver' in window && techniqueCards.length) {
      const techniqueObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              techniqueObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -10% 0px'
        }
      );

      techniqueCards.forEach(card => techniqueObserver.observe(card));
    }

    // ---------------- ABOUT SECTION REVEAL ----------------
    const aboutSection = document.querySelector('#about');

    if ('IntersectionObserver' in window && aboutSection) {
      const aboutObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              aboutSection.classList.add('in-view');
              aboutObserver.unobserve(aboutSection);
            }
          });
        },
        { threshold: 0.2 }
      );

      aboutObserver.observe(aboutSection);
    }

    // ---------------- CLOSE NAV ON LINK CLICK (MOBILE) ----------------
    const navbarCollapse = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (navbarCollapse && navLinks.length) {
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
            bsCollapse.hide();
          }
        });
      });
    }

    // ---------------- DYNAMIC YEAR ----------------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---------------- GLASSY NAVBAR ON SCROLL ----------------
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    handleScroll(); // run once on load
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---------------- SMOOTH SCROLL WITH HEADER OFFSET ----------------
    function scrollWithOffset(id) {
      const target = document.getElementById(id);
      if (!target || !navbar) return;

      const offset = navbar.offsetHeight + 10;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // expose for inline HTML onclick="scrollWithOffset('id')"
    window.scrollWithOffset = scrollWithOffset;
  });