
function loadLanguage(lang) {
    fetch(`./locals/${lang}.json`)
        .then(response => response.json())
        .then(langData => {
        translatePage(langData);
        })
        .catch(error => console.error("Error cargando idioma:", error));
}

function translatePage(langData) {
    document.querySelectorAll("[data-i18n-key]").forEach(element => {
        const key = element.getAttribute("data-i18n-key").split(".");
        let text = langData;
        for (const k of key) {
        if (text[k]) text = text[k];
        else return;
        }
        
        if (element.tagName === "INPUT") {
            if (element.type === "submit") {
                element.value = text;  
            } else {
                element.placeholder = text;
            }
        } else if (element.tagName === "TEXTAREA") {
            element.placeholder = text;
        } else {
            
            element.textContent = text;
        }
    },

    document.querySelectorAll("[data-href-key]").forEach(element => {
        const key = element.getAttribute("data-href-key").split(".");

        let text = langData;
        for (const k of key) {
        if (text[k]) text = text[k];
        else return;
        }

            element.href = text;
    })
)}
