
//CONSTS
const navBarMobile = document.querySelector("#navBarMobile");
const menuContainer = document.querySelector("#menuContainer");

const languageContainer = document.querySelectorAll(".language-container");
const spanish = document.querySelector("#spanish");
const spanishSVG = document.querySelector("#spanishSVG path");
const english = document.querySelector("#english");
const englishSVG = document.querySelector("#englishSVG path");


let isOpen = false;

//Event listeners
navBarMobile.addEventListener("click", toggleMenu);
menuContainer.addEventListener("click", menuEvents);


function menuEvents(e) {
    if(e.target.closest(".nav-item-mobile") || e.target.closest(".language-container") || e.target.classList.contains("theme-button")) {
        navBarMobile.classList.remove("clicked");
        menuContainer.classList.remove("show-navBar");
        menuContainer.classList.add("menu-mobile");
        isOpen = false;
        //cargar y seleccionar español
        if(e.target.closest("#spanish")) {
            loadLanguage('es');
            spanish.classList.add("language-selected", "language-container-selected");
            spanish.classList.remove("language-container");
            spanishSVG.setAttribute("fill", "var(--language-selected-svg-color)");

            english.classList.remove("language-selected", "language-container-selected");
            english.classList.add("language-container");
            englishSVG.setAttribute("fill", "var(--language-text)");
            return;
            //cargar y seleccionar english
        } else if(e.target.closest("#english")) {
            loadLanguage('en')
            english.classList.add("language-selected", "language-container-selected");
            english.classList.remove("language-container");
            englishSVG.setAttribute("fill", "var(--language-selected-svg-color)");

            spanish.classList.remove("language-selected", "language-container-selected");
            spanish.classList.add("language-container");
            spanishSVG.setAttribute("fill", "var(--language-text)");
            return;

        } else if (e.target.classList.contains("theme-button")){
            // mirar si hay alguno seleccionado y quitarlo
            let sibling = e.target.parentElement.firstElementChild;
            while (sibling) {
                if (sibling !== e.target && sibling.classList.contains("theme-button-selected")) {
                    sibling.classList.remove("theme-button-selected");
                }
                sibling = sibling.nextElementSibling;
            }
            
            document.body.classList.forEach(cls => document.body.classList.remove(cls))
            const themeNewSelected = e.target;
            themeNewSelected.classList.add("theme-button-selected");

            // quedarme solo con el nombre del theme
            const classes = e.target.classList.value.split(" ");
            themeSelected(classes[1], themeNewSelected);
        }
    } else {
        isOpen = true;
    }
}

function toggleMenu() {
    if(!isOpen){
        navBarMobile.classList.add("clicked");
        menuContainer.classList.remove("menu-mobile");
        menuContainer.classList.add("show-navBar");
        isOpen = true;
    } else {
        navBarMobile.classList.remove("clicked");
        menuContainer.classList.remove("show-navBar");
        menuContainer.classList.add("menu-mobile");
        isOpen = false;
    }
}

function themeSelected(theme, themeNewSelected){

    switch(theme) {
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
            break;
    }
}
                            