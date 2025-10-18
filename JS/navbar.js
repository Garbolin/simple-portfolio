
//CONSTS
const navBarMobile = document.querySelector("#navBarMobile");
const menuContainer = document.querySelector("#menuContainer");

const languageContainer = document.querySelectorAll(".language-container");
const spanish = document.querySelector("#spanish");
const spanishSVG = document.querySelector("#spanishSVG path");
const english = document.querySelector("#english");
const englishSVG = document.querySelector("#englishSVG path");

const themeParent = document.querySelector("#themes");


let isOpen = false;

//Event listeners
// navBarMobile.addEventListener("click", toggleMenu);
// menuContainer.addEventListener("click", menuEvents);

// document.addEventListener("DOMContentLoaded", () => {
//     const theme = localStorage.getItem('theme');
//     themeSelected(theme);

//     const language = localStorage.getItem('language');
// })

// function menuEvents(e) {
//     if(e.target.closest(".nav-item-mobile") || e.target.closest(".language-container") || e.target.classList.contains("theme-button")) {
//         navBarMobile.classList.remove("clicked");
//         menuContainer.classList.remove("show-navBar");
//         menuContainer.classList.add("menu-mobile");
//         isOpen = false;
//         //cargar y seleccionar español
//         if(e.target.closest("#spanish")) {
//             localStorage.setItem('language', null);
//             localStorage.setItem('language', "spanish");
//             loadLanguage('es');
//             spanish.classList.add("language-selected", "language-container-selected");
//             spanish.classList.remove("language-container");
//             spanishSVG.setAttribute("fill", "var(--language-selected-svg-color)");

//             english.classList.remove("language-selected", "language-container-selected");
//             english.classList.add("language-container");
//             englishSVG.setAttribute("fill", "var(--language-text)");
//             return;
//             //cargar y seleccionar english
//         } else if(e.target.closest("#english")) {
//             localStorage.setItem('language', null);
//             localStorage.setItem('language', "english");

//             loadLanguage('en')
//             english.classList.add("language-selected", "language-container-selected");
//             english.classList.remove("language-container");
//             englishSVG.setAttribute("fill", "var(--language-selected-svg-color)");

//             spanish.classList.remove("language-selected", "language-container-selected");
//             spanish.classList.add("language-container");
//             spanishSVG.setAttribute("fill", "var(--language-text)");
//             return;

//         } else if (e.target.classList.contains("theme-button")){
//             // mirar si hay alguno seleccionado y quitarlo
//             let sibling = e.target.parentElement.firstElementChild;
//             while (sibling) {
//                 if (sibling !== e.target && sibling.classList.contains("theme-button-selected")) {
//                     sibling.classList.remove("theme-button-selected");
//                 }
//                 sibling = sibling.nextElementSibling;
//             }
            
//             document.body.classList.forEach(cls => document.body.classList.remove(cls))
//             const themeNewSelected = e.target;
//             themeNewSelected.classList.add("theme-button-selected");
//             localStorage.setItem('theme', null);
//             // quedarme solo con el nombre del theme
//             const classes = e.target.classList.value.split(" ");
//             themeSelected(classes[1], themeNewSelected);
//         }
//     } else {
//         isOpen = true;
//     }
// }

// function toggleMenu() {
//     if(!isOpen){
//         navBarMobile.classList.add("clicked");
//         menuContainer.classList.remove("menu-mobile");
//         menuContainer.classList.add("show-navBar");
//         isOpen = true;
//     } else {
//         navBarMobile.classList.remove("clicked");
//         menuContainer.classList.remove("show-navBar");
//         menuContainer.classList.add("menu-mobile");
//         isOpen = false;
//     }
// }

// function themeSelected(theme, themeNewSelected){

//     switch(theme) {
//         case "dark":
//             document.body.classList.add('darkmode');
//             localStorage.setItem('theme', 'darkmode');
//             break;
//         case "light":
//             document.body.classList.add('lightmode');
//             localStorage.setItem('theme', 'lightmode');

//             break;
//         case "blue": 
//             document.body.classList.add('blue-night');
//             localStorage.setItem('theme', 'blue-night');

//             break;
//         case "sky":
//             document.body.classList.add('summer');
//             localStorage.setItem('theme', 'summer');

//             break;
//         case "orange":
//             document.body.classList.add('orangemode');
//             localStorage.setItem('theme', 'orangemode');

//             break;
//         case "green":
//             document.body.classList.add('hibiscus');
//             localStorage.setItem('theme', 'hibiscus');

//             break;
//         default:
//             document.body.classList.add('darkmode');
//             localStorage.setItem('theme', 'darkmode');

//             break;
//     }

//     localStorage.setItem('theme', theme);
// }
                            

// Event listeners
navBarMobile.addEventListener("click", toggleMenu);
menuContainer.addEventListener("click", menuEvents);

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Restablecer tema guardado
    const storedTheme = localStorage.getItem('theme') || 'dark';
    themeSelected(storedTheme);
    document.querySelector("." + storedTheme)?.classList.add("theme-button-selected");

    // Restablecer idioma guardado
    const storedLanguage = localStorage.getItem('language') || 'spanish';
    loadLanguage(storedLanguage === 'english' ? 'en' : 'es');
    applyLanguageStyles(storedLanguage);
});

// Manejo de eventos del menú
function menuEvents(e) {
    if (e.target.closest(".nav-item-mobile") || e.target.closest(".language-container") || e.target.classList.contains("theme-button")) {
        navBarMobile.classList.remove("clicked");
        menuContainer.classList.remove("show-navBar");
        menuContainer.classList.add("menu-mobile");
        isOpen = false;

        // Cambiar idioma
        if (e.target.closest("#spanish")) {
            localStorage.setItem('language', 'spanish');
            loadLanguage('es');
            refreshVisibleErrors();
            applyLanguageStyles('spanish');
            return;
        } 
        else if (e.target.closest("#english")) {
            localStorage.setItem('language', 'english');
            loadLanguage('en');
            refreshVisibleErrors();
            applyLanguageStyles('english');
            return;
        } 

        // Cambiar tema
        else if (e.target.classList.contains("theme-button")) {
            // Quitar selección previa
            [...e.target.parentElement.children].forEach(btn => 
                btn.classList.remove("theme-button-selected")
            );

            // Aplicar nueva selección
            e.target.classList.add("theme-button-selected");
            const classes = e.target.classList.value.split(" ");
            const themeName = classes[1]; // la segunda clase indica el tema
            themeSelected(themeName);
        }
    } else {
        isOpen = true;
    }
}

// Menú móvil toggle
function toggleMenu() {
    menuContainer.classList.toggle("show-navBar");
    menuContainer.classList.toggle("menu-mobile");
    navBarMobile.classList.toggle("clicked");
    isOpen = !isOpen;
}

// Aplicar tema
function themeSelected(theme) {
    // Quitar todas las clases de tema
    document.body.classList.remove('darkmode', 'lightmode', 'blue-night', 'summer', 'orangemode', 'hibiscus');

    // Asignar clase de acuerdo al tema
    switch (theme) {
        case "dark":
            document.body.classList.add('darkmode');
            break;
        case "light":
            document.body.classList.add('lightmode');
            break;
        case "blue":
            document.body.classList.add('blue-night');
            break;
        case "sky":
            document.body.classList.add('summer');
            break;
        case "orange":
            document.body.classList.add('orangemode');
            break;
        case "green":
            document.body.classList.add('hibiscus');
            break;
        default:
            document.body.classList.add('darkmode');
            theme = 'dark';
    }

    // Guardar sólo el nombre lógico del tema, no la clase CSS
    localStorage.setItem('theme', theme);
    
}

// Aplicar estilos de idioma
function  applyLanguageStyles(language) {
    if (language === 'spanish') {
        spanish.classList.add("language-selected", "language-container-selected");
        spanish.classList.remove("language-container");
        spanishSVG.setAttribute("fill", "var(--language-selected-svg-color)");
        english.classList.remove("language-selected", "language-container-selected");
        english.classList.add("language-container");
        englishSVG.setAttribute("fill", "var(--language-text)");
    } else if (language === 'english') {
        english.classList.add("language-selected", "language-container-selected");
        english.classList.remove("language-container");
        englishSVG.setAttribute("fill", "var(--language-selected-svg-color)");
        spanish.classList.remove("language-selected", "language-container-selected");
        spanish.classList.add("language-container");
        spanishSVG.setAttribute("fill", "var(--language-text)");
    }
}

// Función refresh
function refreshVisibleErrors() {
    document.querySelectorAll('.error-email[data-i18n-key]').forEach(el => {
        const key = el.getAttribute('data-i18n-key');
        el.textContent = getTranslation(key);
    });
}