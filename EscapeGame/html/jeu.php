<?php 

include('../EscapeGame/php/inscription.php');

?>


<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../EscapeGame/css/jeu.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"/>
    <link rel="icon" href="../EscapeGame/img/logo.ico" />
    <title>Un tour de France</title>
  </head>

  <body>
  
    <div id="barre">
      <p>Un tour de France</p>
      <p id="chrono">20:00</p>
      <p><a id="sortir" href="../EscapeGame/index.html"><img src="../EscapeGame/img/sortir.png" style="width:6wh;height:7vh;"></a></p>
    </div>

    
      <div id="map"></div>

      <div id="sac"><img src="../EscapeGame/img/sac_inv.png" style="width:13vw;height:17vh;"></a></div>
   
      <aside id="inventaire">
        <!--<p>Inventaire</p>-->
        <div id=obj class="scroller">
          <!-- <input type ='image' src='.. url de l'image ...' style='width: 11vw; height: 17vh. border: 0px'> -->
        </div>
      </aside>
    
    
    <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"></script>
    <script src='../EscapeGame/js/main.js'></script>

  </body>

</html>




