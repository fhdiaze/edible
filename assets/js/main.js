(function () {
    // Mobile nav: toggle button with aria-expanded, closed after choosing a link or growing to desktop width
    var navToggle = document.getElementById('nav-toggle');
    var mobilePanel = document.getElementById('mobile-panel');
    if (navToggle && mobilePanel) {
        var closeNav = function () {
            mobilePanel.classList.remove('header__mobile-panel--open');
            navToggle.setAttribute('aria-expanded', 'false');
        };
        navToggle.addEventListener('click', function () {
            var open = navToggle.getAttribute('aria-expanded') !== 'true';
            mobilePanel.classList.toggle('header__mobile-panel--open', open);
            navToggle.setAttribute('aria-expanded', open);
        });
        mobilePanel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });
        window.matchMedia('(min-width: 820px)').addEventListener('change', function (e) {
            if (e.matches) closeNav();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                closeNav();
                navToggle.focus();
            }
        });
        document.addEventListener('click', function (e) {
            if (!mobilePanel.contains(e.target) && !navToggle.contains(e.target)) closeNav();
        });
    }

    // Back-to-top button: appears on scroll, scrolls to top (smooth unless the user prefers reduced motion, see CSS)
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('back-to-top--visible', window.scrollY > 500);
        }, { passive: true });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0 });
        });
    }

    // "¿Qué quieres hacer hoy?" accordion (only present on index.html)
    var flowItems = document.querySelectorAll('.flow__item');
    flowItems.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var panel = document.getElementById(btn.getAttribute('aria-controls'));
            if (!panel) return;
            var isOpen = btn.classList.contains('flow__item--active');
            document.querySelectorAll('.flow__panel').forEach(function (p) { p.style.maxHeight = null; });
            flowItems.forEach(function (b) {
                b.classList.remove('flow__item--active');
                b.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                btn.classList.add('flow__item--active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // The open panel's height is fixed in px, so refit it whenever its content changes size (resize, font swap)
    if (window.ResizeObserver) {
        var panelObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                var panel = entry.target.parentElement;
                if (panel.style.maxHeight) panel.style.maxHeight = panel.scrollHeight + 'px';
            });
        });
        document.querySelectorAll('.flow__panel-inner').forEach(function (inner) { panelObserver.observe(inner); });
    }

    // Clients carousel: native swipe/scroll/keyboard, plus prev/next buttons shown only when JS runs
    var carousel = document.querySelector('.carousel');
    if (carousel) {
        var track = carousel.querySelector('.carousel__track');
        var carouselControls = carousel.querySelector('.carousel__controls');
        var carouselPrev = carousel.querySelector('.carousel__btn--prev');
        var carouselNext = carousel.querySelector('.carousel__btn--next');
        var updateCarousel = function () {
            carouselPrev.disabled = track.scrollLeft <= 1;
            carouselNext.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        };
        carouselPrev.addEventListener('click', function () {
            track.scrollBy({ left: -track.clientWidth * 0.8 });
        });
        carouselNext.addEventListener('click', function () {
            track.scrollBy({ left: track.clientWidth * 0.8 });
        });
        track.addEventListener('scroll', updateCarousel, { passive: true });
        window.addEventListener('resize', updateCarousel);
        carouselControls.hidden = false;
        updateCarousel();
    }

    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
