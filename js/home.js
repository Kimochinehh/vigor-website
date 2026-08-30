const initializePageMotion = () => {
    const desktop = window.matchMedia('(min-width: 769px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.home-page .hero');
    const heroContent = document.querySelector('[data-hero-content]');
    const revealItems = document.querySelectorAll('[data-reveal], [data-reveal-section], [data-listing-intro], .listing-page .project-item');
    const projectCards = [...document.querySelectorAll('.listing-page .project-item')];

    const updateHeader = () => {
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 28);
    };

    const updateParallax = () => {
        if (!desktop.matches || reducedMotion.matches || !hero || !heroContent) return;
        const progress = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
        hero.style.setProperty('--hero-shift', `${window.scrollY * 0.16}px`);
        heroContent.style.setProperty('--content-shift', `${progress * -44}px`);
        heroContent.style.setProperty('--content-opacity', `${1 - progress * 0.82}`);
    };

    const onScroll = () => {
        updateHeader();
        updateParallax();
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cardIndex = projectCards.indexOf(entry.target);
                    const delay = cardIndex === -1 ? 0 : (cardIndex % 3) * 120;
                    window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    updateHeader();
    updateParallax();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageMotion, { once: true });
} else {
    initializePageMotion();
}
