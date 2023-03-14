<?php 

include('connect.php');


// RECUPERER LES INFORMATIONS D'UN OBJET SELON SON ID

/*
if ( isset($_GET['id']) ) {

  $id = $_GET['id'];
  $objet = [];

  $request = "SELECT * FROM jeu WHERE id = {$id};";

  if ($result = pg_query($link, $request)) {
    while ($ligne = pg_fetch_assoc($result)) {
        array_push($objet, $ligne);
    }
  }

  echo json_encode($objet, JSON_NUMERIC_CHECK); // pour que tout ne soit pas en chaine de caractère => bon retour JSON !

}
*/

if ( isset($_GET['id']) ) {
  $id = $_GET['id'];

  $request = mysqli_query($link, "SELECT * FROM jeu WHERE id = $id;");

  $objet = [];
  foreach ($request as $result) {
    $objet[] = $result;
  }
  echo json_encode($objet, JSON_NUMERIC_CHECK); // pour que tout ne soit pas en chaine de caractère => bon retour JSON !

}


?>




