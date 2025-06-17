document.addEventListener('DOMContentLoaded', function () {
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarContent',
        rootMargin: '0px 0px -40%',
        smoothScroll: true
    });

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarContent');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            navLinks.forEach(otherLink => {
                otherLink.parentElement.classList.remove('active');
            });

            this.parentElement.classList.add('active');

            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });
});