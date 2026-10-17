// Close the mobile nav panel after choosing a link
document.querySelectorAll('.header__mobile-panel a').forEach(function (link) {
    link.addEventListener('click', function () {
        var navCheck = document.getElementById('nav-check');
        if (navCheck) navCheck.checked = false;
    });
});

// Back-to-top button: appears on scroll, scrolls smoothly to top
var backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('back-to-top--visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// "¿Qué quieres hacer hoy?" accordion (only present on index.html)
document.querySelectorAll('.flow__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.dataset.target);
        var isOpen = btn.classList.contains('flow__item--active');
        document.querySelectorAll('.flow__panel').forEach(function (p) { p.style.maxHeight = null; });
        document.querySelectorAll('.flow__item').forEach(function (b) { b.classList.remove('flow__item--active'); });
        if (!isOpen) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            btn.classList.add('flow__item--active');
        }
    });
});
