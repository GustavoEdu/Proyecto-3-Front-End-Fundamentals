const contactForm = document.getElementById("contactForm");
const contactErrorMarker = document.getElementById("contactErrorMarker");

contactForm.addEventListener("submit", evt => {
    evt.preventDefault();
    
    const formToSubmit = evt.target;
    const name = formToSubmit.name.value.trim();
    const email = formToSubmit.email.value.trim();
    const subject = formToSubmit.subject.value.trim();
    const message = formToSubmit.message.value.trim();
    
    if(name !== "" && email !== "" && subject !== "" && message !== "") {
        formToSubmit.submit();
    } else {
        contactErrorMarker.innerHTML = "";
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "¡Datos inválidos! Favor de verificar";
        errorMessage.classList.add("contact__error-message");
        contactErrorMarker.appendChild(errorMessage);
    }
})