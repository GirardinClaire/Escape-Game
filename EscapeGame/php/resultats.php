<?php 

include('connect.php');


// RENVOIE les 5 premiers meilleurs joueurs ( classement en fonction du score puis du temps)

/*
$request = "SELECT * FROM joueurs ORDER BY score DESC, temps ASC LIMIT 5";

$objet = [];
if ($result = pg_query($link, $request)) {
  while ($ligne = pg_fetch_assoc($result)) {
      array_push($objet, $ligne);
  }
}
echo json_encode($objet, JSON_NUMERIC_CHECK); // pour que tout ne soit pas en chaine de caractère => bon retour JSON !
*/

$request = mysqli_query($link, "SELECT * FROM joueurs ORDER BY score DESC, temps ASC LIMIT 5");

$objet = [];
foreach ($request as $result) {
  $objet[] = $result;
}
echo json_encode($objet, JSON_NUMERIC_CHECK); // pour que tout ne soit pas en chaine de caractère => bon retour JSON !


?>

