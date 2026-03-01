(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    /**
     * Header toggle
     */
    const headerToggleBtn = document.querySelector('.header-toggle');
    const header = document.querySelector('#header');

    function headerToggle() {
      if (!header || !headerToggleBtn) return;
      header.classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }

    if (headerToggleBtn) {
      headerToggleBtn.addEventListener('click', headerToggle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.header-show')) {
          headerToggle();
        }
      });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function (e) {
        e.preventDefault();
        if (!this.parentNode || !this.parentNode.nextElementSibling) return;
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => preloader.remove());
    }

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
      if (!scrollTop) return;
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }

    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * AOS
     */
    function aosInit() {
      if (window.AOS) {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
    }
    window.addEventListener('load', aosInit);

    /**
     * Typed.js
     */
    const selectTyped = document.querySelector('.typed');
    if (selectTyped && window.Typed) {
      let typed_strings = selectTyped.getAttribute('data-typed-items')?.split(',');
      if (typed_strings) {
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }

    /**
     * PureCounter
     */
    if (window.PureCounter) {
      new PureCounter();
    }

    /**
     * Skills animation
     */
    document.querySelectorAll('.skills-animation').forEach((item) => {
      if (!window.Waypoint) return;
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function () {
          item.querySelectorAll('.progress .progress-bar').forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });

    /**
     * GLightbox
     */
    if (window.GLightbox) {
      GLightbox({ selector: '.glightbox' });
    }

    /**
     * Isotope
     */
    document.querySelectorAll('.isotope-layout').forEach((isotopeItem) => {
      const container = isotopeItem.querySelector('.isotope-container');
      if (!container || !window.Isotope || !window.imagesLoaded) return;

      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(container, function () {
        initIsotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(filters => {
        filters.addEventListener('click', function () {
          const active = isotopeItem.querySelector('.filter-active');
          if (active) active.classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope?.arrange({ filter: this.getAttribute('data-filter') });
          aosInit();
        });
      });
    });

    /**
     * Swiper
     */
    function initSwiper() {
      if (!window.Swiper) return;

      document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
        const configEl = swiperElement.querySelector(".swiper-config");
        if (!configEl) return;

        let config = JSON.parse(configEl.innerHTML.trim());

        new Swiper(swiperElement, config);
      });
    }
    window.addEventListener("load", initSwiper);

    /**
     * Scrollspy
     */
    const navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach(link => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (!section) return;

        const position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

  });
})();