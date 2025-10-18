

document.addEventListener("DOMContentLoaded", () => {
    loadLanguage('es');
})

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

    header.forEach(header => {
    header.style.animationPlayState = 'paused';
    observer.observe(header);  // Corregido: observar cada div individualmente
    });

    home.forEach(home => {
    home.style.animationPlayState = 'paused';
    observer.observe(home);  // Corregido: observar cada div individualmente
    });