
window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 50);
};

const sections = document.querySelectorAll('section');
const header = document.querySelectorAll('header');
const home = document.querySelectorAll('#home');


    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
        }
    });
    }, { threshold: 0.2 });

    sections.forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
    });
