

//  ------------------------ AFFICHAGE DE LA CARTE ------------------------ //

var map = L.map('map');

var maxZoomMap = 19;
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoomMap,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// position de départ du jeu
var positionDepart = [48.8560648, 2.6139978];
map.setView(positionDepart, 13);

alert("N'oublier pas d'activer votre son pour bénéficier de tous les indices ;)");







// ------------- AFFICHAGE DU COMPTE A REBOURS DANS LE BARRE ------------- //

// Inspiration : https://www.delftstack.com/fr/howto/javascript/count-down-timer-in-javascript/

var chrono = document.getElementById('chrono');

var time = 0;
var nb_min = 20; // nb de minutes au départ
var nb_sec = 0; // nb de secondes au départ
var duration = nb_min * 60 + nb_sec; // temps au départ (en secondes)

window.onload = function () {
    chrono.textContent = `${paddedFormat(nb_min)}:${paddedFormat(nb_sec)}`;
    Rebours(--duration, chrono);
};

function paddedFormat(num) {
    // Renvoie le nombre complété d'un zéro si <10
    return num < 10 ? "0" + num : num; 
}

function Rebours(duration, element) {

    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;
    
    setInterval(function () {
        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);

        element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;
        if (secondsRemaining <= 60){
            chrono.style.color = 'red';
        }
        secondsRemaining -= 1 ;

        // FIN DE LA PARTIE SI le temps est écoulé
        if (secondsRemaining < 0) {
            // Enregistrement du temps et du score
            let temps = duration - time + 1;
            saveFinPartie(temps, score);
            // Alerte de fin de partie et changement de page
            alert('FIN DE LA PARTIE ! Le temps imparti est dépassé ... ');
            window.location.href = '../EscapeGame/html/resultats_perso.html';
        };
        time = secondsRemaining; // mise à jour du temps restant 
    } , 1000);//pour éxecuter le timer après chaque seconde (1000 milisecondes)

}







//  ---------------------- DEROULEMENT DE LA PARTIE ---------------------- //



// ------ INITIALISATION DE LA PARTIE ------ //

// Tableau des différents marqueurs
var ListMarkers = new Array();

// Tableau des objets qui ont été affichés (vide au départ, il se remplit au fur et à mesure)
var ListObjetsAffiches = new Array();

// Map qui va contenir les objets récupérables une fois qu'ils sont mis dans l'inventaire
var ListClicks = new Map();

// Début du jeu : avec l'objet d'id 1
var score = 0; // score initial
let id = 1; // id du premier objet affiché
AfficherObjet(id);






// ------ FONCTIONS UTILES ------ //


// Permet d'afficher un objet en fonction de son id
function AfficherObjet(id) {
    paramObjet(id); // requête permettant d'obtenir tous les paramètres de cet objet et de le traiter
    ListObjetsAffiches.push(id); // ajout de l'id de cet objet à la liste des objets qui ont été affichés
    console.log(ListObjetsAffiches); // test de vérification
}



// Récupère toutes les informations d'un objet en fonction de son id sous format JSON et appelle la fonction TraitementObjet
function paramObjet(id) {
    console.log(id);
    fetch('../EscapeGame/php/main.php?id='+id)
    .then(result => result.json())
    .then(objetjson => {
        console.log(objetjson[0]);
        TraitementObjet(objetjson[0]);
    })
}



// Traitement des objets (en fonction de leur type notamment)
/*
type == 1 : objet code
type == 2 : objet récupérable
type == 3 : objet bloqué par un code
type == 4 : objet bloqué par un autre objet
*/
function TraitementObjet(objet) {
    var typeObjet = objet['type'];

    // Définition de l'icone
    let largeur = objet['width'];
    let hauteur = objet['height'];
    var img = L.icon({
        iconUrl: objet['URLicone'], // lien de l'image
        iconSize:     [largeur, hauteur], // taille de l'icone
        iconAnchor:   [largeur/2, hauteur/2], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [0, -hauteur/2] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    // Définition du marker
    var marker = L.marker([objet['latitude'], objet['longitude']], {icon: img});

    // Définition du popup en fonction du type de l'objet
    if ( objet['indice'] != '' ) {
        // Création d'un popup uniquement s'il y a un indice associé à l'objet
        marker.bindPopup(ContenuPopup(objet));
    }
    
    // Affichage du marker de l'objet en fonction du zoom
    AffichageMarkerZoom(objet, marker);
    
    // Test et contrôle : mise à jour des marker crées
    ListMarkers.push(marker);
    console.log(ListMarkers);

    // Actions du click en fonction des paramètres de l'objet considéré
    marker.addEventListener( 'click', function() { click(objet) } );

}



// Définir le contenu d'une popup en fonction du type de l'objet considéré
function ContenuPopup(objet) {
    var popup = document.createElement('div');
    popup.style.textAlign = 'justify';
    var typeObjet = objet['type'];
    if ( typeObjet == 3 ) {
        // Création d'un formulaire dans le popup lorsqu'il s'agit d'un objet bloqué par un code
        popup.innerHTML = '<div> <p>'+objet['indice']+'</p> <form><p><input type="text" name="code" id="code" placeholder="Trouve le code ..."></p>'
        + '<p><input type="submit" value="vérifier" id="ok"></p> </form> </div>';
        popup.addEventListener('submit', function(event){ ValidFormObjetCode(event, objet); })
    }
    else {
        popup.innerHTML = '<div> <p>'+objet['indice']+'</p> </div>';
    }
    return popup;
}



// Validation du formulaire d'un objet bloqué par un code
function ValidFormObjetCode(event, objet){
    event.preventDefault(); // Empecher l'envoi du formulaire pour que la page ne se recharge pas

    var code = document.getElementById('code').value; // Récupérer la valeur entrée dans le formulaire à la validation
    
    if (code == objet['idDebloquant']){
        score += 150; // on ajoute des points lorsque le code est trouvé
        console.log(score);
        console.log('Le code est ok !');
 
        var idLibere = objet['idLibere'];
        if (ListObjetsAffiches.indexOf(idLibere) == -1 ) {
            // Création de l'objet libéré par cet objet
            AfficherObjet(idLibere);
             // Suppression des marker des objets donc les id sont dans l'intervalle [ id ; idLibere [
            for (i = objet['id']; i < idLibere; i++) {
                deleteMarker(i);
            }
        }
    }

    else {
        score -= 25; // on retire des points lorsque le code est incorrect
        console.log(score);
        alert("Le code n'est pas correct ...");

    }
}



// Afficher un marker en fonction d'un zoom donné (renseigné dans la base de données)
function AffichageMarkerZoom(objet, marker) {
    var minzoom = objet['minzoom'];
    // Affichage direct si le zoom est correct
     if (map.getZoom() >= minzoom) {
        marker.addTo(map);
    }
    // Apparition selon le zoom par la suite dans tous les cas
    map.on('zoomend', function(){
        if (map.getZoom() < minzoom){
            marker.remove();
        }
        else {
            marker.addTo(map);
        }
    })
}



// Supprimer le marker de la carte définitivement
function deleteMarker(id) {
    // suppression immédiate au zoom actuel
    ListMarkers[id-1].remove();
    // suppression à chaque niveau de zoom
    map.on('zoomend', function(){
        ListMarkers[id-1].remove();
    });
}



// Actions d'un click en fonction des paramètres de l'objets
function click(objet) {

    var type = objet['type'];
    var id = objet['id'];
    var idSolution = objet['idSolution'];
    var ibDebloquant = objet['idDebloquant'];
    var idLibere = objet['idLibere'];

    // Objet Code ou objet bloqué par un code
    if ( (type == 1 || type == 3) && idSolution != null && ListObjetsAffiches.indexOf(idSolution) == -1) {
        // Création de l'objet solution de cet objet code S'IL EXISTE (et cela qu'une seule fois, d'où la 3ème condition)
        AfficherObjet(idSolution);
    }

    // Objet récupérable
    if ( type == 2 ) {
        score += 75; // on ajoute des points lorsque l'objet est trouvé (i.e. cliqué et mis dans l'inventaire)
        console.log(score);

        // Supprimer le marker de la carte
        deleteMarker(id);
        
        // Mettre l'objet dans l'inventaire
        var inventaire = document.getElementById('obj');
        var imgInventaire = document.createElement('input');
        imgInventaire.type = 'image';
        imgInventaire.src = objet['URLicone'];
        imgInventaire.style = 'width: 11vw; height: 17vh; border: 0px;';
        inventaire.appendChild(imgInventaire);


        // Sélectionner ou désélectionner l'objet dans l'inventaire (par alternance de click)
        ListClicks.set(id, 0);
        console.log(ListClicks);
        imgInventaire.addEventListener( 'click', function(){clickInventaire(objet, imgInventaire);} );

        if (idLibere != null && ListObjetsAffiches.indexOf(idLibere) == -1) {
            AfficherObjet(idLibere);
        }
        
        // Jouer l'audio, s'il existe
        if (objet['audio'] != '') {
            var audio = new Audio(objet['audio']);
            setTimeout(audio.play(), 2000);
        }

        // FIN DE LA PARTIE SI l'objet crêpe est dans l'inventaire
        if (ListClicks.has(12)) {
            score += 50; // on ajoute des points lorsque la partie est finie dans le temps imparti
            console.log(score);

            // Enregistrement du temps et du score
            let temps = duration - time + 1;
            saveFinPartie(temps, score);
            // Alerte de fin de partie et changement de page APRES LE TEMPS DE L'AUDIO
            setTimeout(alertFinPartie, 5000);
        }
    }

    // Objet bloqué par un autre objet
    if ( type == 4) {

        if ( idSolution != null && ListObjetsAffiches.indexOf(idSolution) == -1 ) {
            // Le 1er clique libère son objet solution
            AfficherObjet(idSolution);
        }

        // SI l'objet débloquant est dans l'inventaire
        if ( ListClicks.has(ibDebloquant) ) {
            let valClick = ListClicks.get(ibDebloquant);
            // et SI il est sélectionné
            if ( (valClick % 2 == 1) ) {
                score += 150; // on ajoute des points lorsque l'objet est débloqué
                console.log(score);

                // Création de l'objet libéré par cet objet
                AfficherObjet(idLibere);
                // Suppression des marker des objets donc les id sont dans l'intervalle [ id ; idLibere [
                for (i = id; i < idLibere; i++) {
                    deleteMarker(i);
                }
                
                // Jouer l'audio, s'il existe 
                if (objet['audio'] != '') {
                    var audio = new Audio(objet['audio']);
                    audio.play();
                }
            }
        }
    }
}



// Sélectionner ou Désélectionner un objet dans l'inventaire
function clickInventaire(objet, imgInventaire){
    let valClick = ListClicks.get(objet['id']);
    if ( valClick % 2 == 0 ) {
        imgInventaire.style = 'width: 11vw; height: 17vh; border: solid 3px red;';
    }
    else {
        imgInventaire.style = 'width: 11vw; height: 17vh; border: 0px;';
    }
    ListClicks.set(objet['id'], valClick+1);
    console.log(ListClicks);
}



// Enregistrer le temps et le score du joueur 
function saveFinPartie(temps, score) {
    fetch('../EscapeGame/php/SaveResultPerso.php?temps='+temps+'&score='+score)
}



function alertFinPartie() {
    alert('BRAVO ! Vous avez fini le jeu dans le temps imparti.');
    window.location.href = '../EscapeGame/html/resultats_perso.html';
}




