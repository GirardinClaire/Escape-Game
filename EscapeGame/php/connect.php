<?php

// PHP de connexion à la base de données AlwaysData avec le compte de Claire Girardin

//$link = pg_connect("host=postgresql-girardinclaire.alwaysdata.net dbname=girardinclaire_bddescapegame user=girardinclaire password=***");
$link = mysqli_connect("mysql-girardinclaire.alwaysdata.net", username, password, "girardinclaire_bddescapegame");

if (!$link) {
    die('Erreur de connexion');
}



?>

