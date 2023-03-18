import "./css/styles.css";

/* Modal */
const modal = document.getElementById("modal");
modal.addEventListener("click", evt => {
    if(evt.target.classList.contains("modal") || evt.target.classList.contains("modal__close")) {
        modal.classList.remove("modal__content--show");
    }
});
/* /Modal */
/* Personal-Proyects-Section-Filling */
const personalProyectsSection = document.getElementById("personalProyectsSection");
const fillPersonalProyects = async function() {
    const personalProyectsData = await fetch("../personal_proyects.json");
    const personalProyects = await personalProyectsData.json();
    personalProyects.forEach(personalProyect => {
        const personalProyectArticle = document.createElement("article");
        personalProyectArticle.classList.add("project");
        personalProyectArticle.innerHTML = `
        <img class="project__img injectable" src="${personalProyect.banner}" alt="${personalProyect.title}">
        <div class="project__title-container injectable">
            <span class="project__title-wrapper injectable">&lt;</span><span class="project__title injectable">${personalProyect.title}</span><span class="project__title-wrapper injectable">/&gt;</span>
        </div>
        `;
        personalProyectsSection.appendChild(personalProyectArticle);
        const targettedNodes = personalProyectArticle.querySelectorAll(".injectable");
        targettedNodes.forEach(targettedNode => {
            targettedNode.dataset.title = personalProyect.title;
            targettedNode.dataset.banner = personalProyect.banner;
            targettedNode.dataset.description = personalProyect.description;
            targettedNode.dataset.skills = JSON.stringify(personalProyect.skills);
            targettedNode.dataset.link = personalProyect.link ?? "";
            targettedNode.dataset.video = personalProyect.video ?? "";
            targettedNode.dataset.repository = personalProyect.repository;
        });
    });
}
fillPersonalProyects();
const personalProjectContent = document.getElementById("personalProjectContent");
personalProyectsSection.addEventListener("click", evt => {
    if(!evt.target.classList.contains("project__img") && !evt.target.classList.contains("project__title-container") && !evt.target.classList.contains("project__title-wrapper") && !evt.target.classList.contains("project__title")) { return; }
    modal.classList.add("modal__content--show");
    const {title, banner, description, skills, link, video, repository} = evt.target.dataset;
    let skillsContent = "<div class='personal-project__detail'>"; 
    JSON.parse(skills).forEach(skill => {skillsContent += `<p class="personal-project__skill">${skill}</p>`;});
    skillsContent += "</div>";
    personalProjectContent.innerHTML = `
        <div class="modal__close-container">
            <div class="modal__close">✘</div>
        </div>
        <div class="personal-project">
            <h4 class="personal-project__main-title">${title}</h4>
            <div class="personal-project__detail">
                <p class="personal-project__key">Description:</p>
                <p class="personal-project__value">${description}</p>
            </div>
            <div class="personal-project__detail">
                <p class="personal-project__key">Skills:</p>
                ${skillsContent}
            </div>
            <div class="personal-project__links">
                ${link && 
                    `<a class="personal-project__value personal-project__link" href="${link}" target="_blank">
                        <i class="icon icon--md icon--white fa-solid fa-link"></i>
                    </a>`
                }
                ${video &&
                    `<a class="personal-project__value personal-project__link" href="${video}" target="_blank">
                        <i class="icon icon--md icon--white fa-solid fa-video"></i>
                    </a>`
                }
                <a class="personal-project__value personal-project__link" href="${repository}" target="_blank">
                    <i class="icon icon--md icon--white fa-solid fa-code"></i>
                </a>
            </div>
        </div>
    `;
});
/* /Personal-Proyects-Section-Filling */
/* Form-Validation */
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
});
/* /Form-Validation */