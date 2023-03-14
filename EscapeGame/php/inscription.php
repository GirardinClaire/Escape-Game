<?php 

// include('connect.php');

//$link = pg_connect("host=postgresql-girardinclaire.alwaysdata.net dbname=girardinclaire_bddescapegame user=girardinclaire password=wT5RySfX#JE");
$link = mysqli_connect("mysql-girardinclaire.alwaysdata.net", "292688", "wT5RySfX#JE", "girardinclaire_bddescapegame");

if (!$link) {
    die('Erreur de connexion');
}


// INSERTION DES DONNEES : nom, prénom et pseudo

if( isset( $_GET['nom'] ) ) {
    $nom = $_GET['nom'];
    $prenom = $_GET['prenom'];
    $pseudo = $_GET['pseudo'];
    $request = " INSERT INTO joueurs (nom, prenom, pseudo) VALUES ('$nom', '$prenom', '$pseudo') ";
    mysqli_query($link, $request);
    //pg_query($link, $request);
}


?>


