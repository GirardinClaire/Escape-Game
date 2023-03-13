// Récupérer l'élément form par id = "inscription"
let form_inscription = document.getElementById("inscription");

// Récupérer des champs du formulaire par leurs name
let nom = form_inscription.elements["nom"];
let prenom = form_inscription.elements["prenom"];
let pseudo = form_inscription.elements["pseudo"];


// Ajouter l'évènement submit correspondant à la validation du formulaire
form_inscription.addEventListener('submit', validationformulaire);

// Fonction de validation du formulaire : tester la conformité des champs
function validationformulaire (event) {
    // le formulaire est-il OK?
    let form_OK = true;

    // Champ nom vide ?
    if(nom.value == ''){
        form_OK = false;
        nom.classList.add("erreur");
    }
    else{
        nom.classList.remove("erreur");
    }

    // Champ prenom vide ?
    if(prenom.value == ''){
        form_OK = false;
        prenom.classList.add("erreur");
    }
    else{
        prenom.classList.remove("erreur");
    }

    // Champ pseudo vide ?
    if(pseudo.value == ''){
        form_OK = false;
        pseudo.classList.add("erreur");
    }
    else{
        pseudo.classList.remove("erreur");
    }

    // Si form_OK est faux, on empeche l'envoi du formulaire
    if (!form_OK){
        event.preventDefault();
        alert("Au moins l'un des 3 champs n'est pas renseigné ...");
    }

}


