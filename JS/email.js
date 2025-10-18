
document.addEventListener("DOMContentLoaded", () => {
    const inputName = document.querySelector("#name");
    const inputEmail = document.querySelector("#email");
    const inputSubject = document.querySelector("#subject");
    const inputMessage = document.querySelector("#message");
    const btnSubmit = document.querySelector("#submit");
    const containerSubmit = document.querySelector(".form-loader-submit-container")
    const loader = document.querySelector("#loader");
    const form = document.querySelector("#form");
    const formEmpty = document.querySelector("#form-empty")

    email = {
        name : "",
        email : "",
        subject : "",
        message : "",
    }

    inputName.addEventListener("blur", validate);
    inputEmail.addEventListener("blur", validate);
    inputSubject.addEventListener("blur", validate);
    inputMessage.addEventListener("blur", validate);

    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        isDisabled();

    })

    function validate(e) {

        hideAllErrors( e.target.parentElement )
        if (e.target.value.trim() === ""){
            email[e.target.name] = "";
            //Comprobar si ya hay alerta
            
            showError(e.target.parentElement, "empty");
            
            return;
        }

        if (e.target.id === "email" && e.target.value.trim() !== "") {
            //Validar email
            if (!validateEmail(e.target.value.trim())){
                email[e.target.name] = "";
                showError(e.target.parentElement, "invalid");
                
                return;
            }
        }
        //han pasado la prueba
        // removeAlert(e.target.parentElement)
        hideAllErrors( e.target.parentElement )
        email[e.target.name] = e.target.value.trim().toLowerCase();
    }

    function showError(container, type) {
        const error = container.querySelector(`.error-email[data-error-type="${type}"]`);
        if (error) error.classList.remove("hidden");
    }

    function hideAllErrors(container) {
        const errors = container.querySelectorAll(".error-email");
        errors.forEach(err => err.classList.add("hidden"));
    }


    function validateEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const result = regex.test(email);
        return result;
    }


    function refreshEmail() {
        
        Object.keys(email).forEach((key) => {
            email[key] = "";
        })

        form.reset();
    }

    function isDisabled() {
        const data = {
            name: inputName.value.trim(),
            email: inputEmail.value.trim(),
            subject: inputSubject.value.trim(),
            message: inputMessage.value.trim(),
        };

        if (Object.values(data).includes("")) {
            btnSubmit.disabled = true;
            showError(btnSubmit.parentElement, "empty");
            setTimeout(() => {
            formEmpty.classList.add("hidden");
            }, 3000);
            return;
        }
        if (Object.values(email).includes("")) {
            btnSubmit.disabled = true;
            return;
        } else {
            btnSubmit.disabled = false;
            sendEmail();
            refreshEmail();
        }
        
    }
    //Script file
    async function sendEmail() {
        try {
        loader.classList.remove("hidden-loader"); // mostramos loader antes de enviar
        console.log(btnSubmit.parentElement);
        const params = {
            name: inputName.value.trim(),
            email: inputEmail.value.trim(),
            subject: inputSubject.value.trim(),
            message: inputMessage.value.trim(),
        };
        const response = await emailjs.send(
            "service_uk15g8a",
            "template_19qjilk",
            params
        );
        
        sendedEmailAlert( getTranslation("toast.emailSuccess"), form)
        setTimeout(() => {
            containerSubmit.querySelector("div p")?.parentElement.remove();
        }, 3000);
        
    } catch (error) {
        console.log('FAILED...', error);
        sendedEmailAlert( getTranslation("toast.emailError"), false)
        setTimeout(() => {
            containerSubmit.querySelector("div p")?.parentElement.remove();
            console.log(btnSubmit.parentElement);
        }, 3000);

    } finally {
        loader.classList.add("hidden-loader"); // siempre se oculta el loader al terminar
    }
    }

    function sendedEmailAlert( message, type) {
        const toastContainer = document.createElement("div");
        const toast = document.createElement("p");
        const reference = containerSubmit;

        toast.textContent = message;
        
        toastContainer.classList.add("send-email-alert");
        toastContainer.appendChild(toast);

        console.log(toastContainer);
        
        reference.appendChild(toastContainer);

        if (type === false) {
            toastContainer.classList.add("error-bg-color");
        } else {
            toastContainer.classList.add("success-bg-color");
        }
        
    }

})