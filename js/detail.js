const initializeDetailMotion = () => {
    const detailPage = document.querySelector('.detail-page');
    if (!detailPage) return;

    const hero = document.querySelector('[data-detail-hero]');
    const revealItems = document.querySelectorAll('.detail-page .section, .detail-page .contact-cta');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            detailPage.classList.add('is-detail-ready');
            if (hero) hero.classList.add('is-visible');
        });
    });

    const reveal = (item) => item.classList.add('is-visible');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                reveal(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach(reveal);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDetailMotion, { once: true });
} else {
    initializeDetailMotion();
}
