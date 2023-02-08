Lancer la commande suivante dans le dossier InternshipManager-Back (mongo + back) :
- docker compose up

Lancer les commandes suivantes dans le dossier gestion-front (front) :
- docker build -t front .
- docker run -it --rm -p 4200:4200 --name front-container front