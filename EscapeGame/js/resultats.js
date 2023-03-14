// Permet de récupérer les informations des 10 meilleurs joueurs
fetch('../EscapeGame/php/resultats.php')
.then(result => result.json())
.then(infoJson => {
    console.log(infoJson);
    HallOfFame(infoJson);
})


// Affichage du HallOfFame
function HallOfFame(infoJson) {
    var listHallOfFame = ['p1', 'p2', 'p3', 'p4', 'p5'];
    for (let i = 1; i <= 5; i++) {
        var pseudo = infoJson[i-1]['pseudo'];
        var score = infoJson[i-1]['score'];
        var temps = infoJson[i-1]['temps'];
        var id = listHallOfFame[i-1];
        var tableau = document.getElementById(id);
        tableau.innerHTML = '<td>'+i+'</td><td>'+pseudo+'</td><td>'+score+'</td><td>'+temps+'</td>';
    }

}


