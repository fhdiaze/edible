(function () {
    // Mobile nav: toggle button with aria-expanded, closed after choosing a link or growing to desktop width
    var navToggle = document.getElementById('nav-toggle');
    var mobilePanel = document.getElementById('mobile-panel');
    if (navToggle && mobilePanel) {
        navToggle.addEventListener('click', function () {
            var open = navToggle.getAttribute('aria-expanded') !== 'true';
            mobilePanel.classList.toggle('header__mobile-panel--open', open);
            navToggle.setAttribute('aria-expanded', open);
        });
        mobilePanel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobilePanel.classList.remove('header__mobile-panel--open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        window.matchMedia('(min-width: 820px)').addEventListener('change', function (e) {
            if (e.matches) {
                mobilePanel.classList.remove('header__mobile-panel--open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
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

    // The open panel's height is fixed in px, so refit it when the text rewraps
    window.addEventListener('resize', function () {
        var active = document.querySelector('.flow__item--active');
        var panel = active && document.getElementById(active.getAttribute('aria-controls'));
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });

    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
