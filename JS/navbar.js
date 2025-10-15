
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
            spanishSVG.setAttribute("fill", "var(--secondary-color)");

            english.classList.remove("language-selected", "language-container-selected");
            english.classList.add("language-container");
            englishSVG.setAttribute("fill", "var(--white)");
            return;
            //cargar y seleccionar english
        } else if(e.target.closest("#english")) {
            loadLanguage('en')
            english.classList.add("language-selected", "language-container-selected");
            english.classList.remove("language-container");
            englishSVG.setAttribute("fill", "var(--secondary-color)");

            spanish.classList.remove("language-selected", "language-container-selected");
            spanish.classList.add("language-container");
            spanishSVG.setAttribute("fill", "var(--white)");
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
            console.log(themeNewSelected);
            break;
        case "light":
            console.log(themeNewSelected);
            break;
        case "blue": 
            console.log(themeNewSelected);
            break;
        case "neon":
            console.log(themeNewSelected);
            break;
        case "pink":
            console.log(themeNewSelected);
            break;
        case "green":
            console.log(themeNewSelected);
            break;
        default:
            break;
    }
}
                            