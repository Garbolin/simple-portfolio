let lightmode = localStorage.getItem('lightmode');
const themeSwitch = document.querySelectorAll('.theme-container');

let isLightmode = false;

enablerlightmode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
    themeSwitch.forEach(s => {
        s.style.transition = "transform 0.3s ease";
        s.style.transform = "rotate(180deg)";
    });
}

disablerlightmode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', null);
    themeSwitch.forEach(s => {
        s.style.transition = "transform 0.3s ease";
        s.style.transform = "rotate(0deg)";
    });
}

if (lightmode === "active") {
    isLightmode = true;
    enablerlightmode();
}

themeSwitch.forEach(themeSwitch => {
    themeSwitch.addEventListener('click', () => {
        lightmode = localStorage.getItem('lightmode');
        isLightmode = !isLightmode;
        
        isLightmode === false ? disablerlightmode() : enablerlightmode();
    });
})