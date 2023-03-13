# Escape-Game

Création d'un escape game géographique dans le cadre d'un projet web (ENSG géométrique 2ème année), réalisé par ARGENTO Lisa et GIRARDIN Claire.


Nous avons décidé de vous inviter dans notre premier voyage à vélo à travers la France pour découvrir une magnique région et des paysages méconnus.

Pour nous accompagner, il vous suffit de suivre ce lien : https://girardinclaire.alwaysdata.net/EscapeGame/.




### Nos pistes d'amélioration de ce jeu :

- Obliger l’unicité de la sélection dans l’inventaire pour débloquer un objet bloqué par un autre objet.
Pour débloquer un objet bloqué par un autre objet, il faut actuellement sélectionner, dans l’inventaire, l’objet débloquant.  
Mais par exemple pour le cas de la carte postale :  
1)`Si les vélos sont sélectionnés, la carte postale est débloquée.`  
2)`Si la boite à outils est sélectionnée, la carte postale n’est pas débloquée.`
MAIS 
3)`Si les vélos et la boite à outils sont sélectionnés, la carte postale est débloquée.`  
C’est ce troisième point qu’il faudrait modifier en ne laissant pas la carte postale être débloquée. Mettre en place une sorte d’unicité de la solution.  
Idées possibles :  
`Laisser la possibilité de sélectionner plusieurs objets mais ne débloquer l’objet uniquement si seul(s) son/ses objet(s) débloquant est/sont sélectionné(s)(cela laisse ainsi la possibilité de modifier la base de données pour qu’un objet bloqué par un autre objet puisse être bloqué par plusieurs objets, ce qui implique une sélection multiple dans l’inventaire).`  
OU  
`Forcer une seule sélection possible dans l’inventaire. C’est-à-dire que si l’on clique sur un objet de l’inventaire non sélectionné, cela le sélectionne et désélectionne l’objet sélectionné précédemment (s’il y en a un).`



- Déplacement automatique de la map.  
Pour faciliter le jeu, si possibilité de jouer à des niveaux de difficultés différents, on peut par exemple après avoir débloqué la carte postale emmené le joueur directement centré sur Crozon à un zoom pas trop élevé une fois l’audio terminé.


- Il s’agit d’un TOUR DE FRANCE : région par région ?  
On pourrait créer différentes bases de données « jeu » associées à différentes régions (jeu_Bretagne, jeu_Normandie …) et laisser la possibilité aux joueurs en début de partie de choisir à quel endroit il souhaite voyager.


### Contact
Si vous avez un quelconque retour à faire sur ce jeu, vous pouvez nous joindre à l'adresse mail : claire-girardin@hotmail.fr.
