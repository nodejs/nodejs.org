# récupère l'image Docker de Node.js
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# vérifie que la bonne version de Node.js est présente dans l'environnement
docker run node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'} node -v # doit afficher "${props.release.versionWithPrefix}"

# vérifie que la bonne version de npm est présente dans l'environnement
docker run node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'} npm -v # doit afficher "${props.release.npm}"
