Lancer la commande suivante dans le dossier InternshipManager-Back à la racine du projet (mongo + back) :
- docker compose up

Lancer les commandes suivantes dans le dossier gestion-front à la racine du projet (front) :
- docker build -t front .
- docker run -it --rm -p 4200:4200 --name front-container front