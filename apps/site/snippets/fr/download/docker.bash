# Docker a des instructions d'installation spécifiques pour chaque système d'exploitation.
# Veuillez vous référer à la documentation officielle à l'adresse suivante : https://docker.com/get-started/

# Récupère l'image Docker de Node.js :
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Créer un conteneur Node.js et démarrer une session Shell :
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
