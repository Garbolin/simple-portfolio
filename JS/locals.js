
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
        element.textContent = text;
    });
}
