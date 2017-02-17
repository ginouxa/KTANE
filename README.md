# KTANE
Projet Arduino


BANC Anthony
CARLO Romain
GINOUX Axel
VIAL-GOUTEYRON Quentin
KEEP TALKING AND NOBODY EXPLODES

Matériel
Potentiomètres : 2
Boutons : 3
Ecran LCD : 1
7 Segments 4 Digits : 1
Buzzer : 1
LED Verte : 6
LED RGB : 1
MEGA 2560 : 1
BreadBoard : 1
Câbles : Moulte

Scénario

L’utilisateur peut saisir un mot de passe d’une difficulté de 3 à 6 entiers et il peut définir un temps.
L’information est ensuite transmise à arduino, qui affiche le compte à rebours sur le 7 Segments 4 Digits. La LED RGB clignote rouge toutes les 2 secondes et le buzzer émet un son toutes les 2 secondes également. Si le code est trouvé, la LED RGB passe au vert le buzzer émet une chanson, et le compteur se fige.Sinon, arrivé à 10 secondes, la lumière rouge s'accélère, ainsi que les sons du buzzer. Arrivé à 0 le buzzer émet un son constant, le lecteur LCD affiche un message de défaite, et la LED reste rouge

Les boutons servent à se déplacer sur le code de gauche à droite, et il y a un bouton qui servira à valider la réponse. Des leds vertes s'allumeront si certains caractères correspondent au code. Le premier potentiomètre servira à faire varier la luminosité de l’écran LCD et le second permettra de faire varier l’entier sélectionné.

Liste des tâches :

-Application WEB : GINOUX Axel & VIAL-GOUTEYRON Quentin

-Application ARDUINO : CARLO Romain & BANC Anthony

-Montage : BANC Anthony


