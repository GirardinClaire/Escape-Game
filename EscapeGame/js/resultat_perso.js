// Permet de récupérer les informations du joueur (i.e. dernier joueur enregistrer)
fetch('../EscapeGame/php/resultatPerso.php')
.then(result => result.json())
.then(infoJson => {
    console.log(infoJson[0]);
    enregistrementResultPerso(infoJson[0]);
})


// Affichage du résultat de la partie
function enregistrementResultPerso(infoJson) {
    var temps = infoJson['temps']; // le temps récupéré de la BDD est en secondes
    console.log(temps);
    var min = parseInt(temps / 60);
    var sec = parseInt(temps % 60);
    var score = infoJson['score'];
    var pseudo = infoJson['pseudo'];
    console.log(pseudo);
    var km = 1.678 ;
    var vitesse = parseInt(km / (temps /3600 ));

    var felicitation = document.getElementById('felicitation');
    felicitation.innerHTML = "Bravo "+pseudo+" !! Alors, ça va les jambes après tous ces kilomètres à vélo ? <br>";

    var resultat = document.getElementById('resultat');
    // Si le joueur n'a pas fini la partie dans le temps imparti
    if (temps == 1200) {
        resultat.innerHTML = "Tu n'as pas terminé le voyage mais tu as tout de même marqué "+score+" points en "+min+" minutes et "+sec+" secondes!";
    }
    else {
        resultat.innerHTML = "Tu as pédalé à une vitesse moyenne de "+vitesse+" km/h. <br>Merci de nous avoir accompagné jusqu'à la fin de ce voyage !<br> Tu as marqué "+score+" points en "+min+" minutes et "+sec+" secondes !";
    }


}



