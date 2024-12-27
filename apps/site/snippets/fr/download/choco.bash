# télécharger et installer Node.js
choco install nodejs-lts --version="${props.release.major}"

# vérifie que la bonne version de Node.js est présente dans l'environnement
node -v # doit afficher "${props.release.versionWithPrefix}"

# vérifie que la bonne version de npm est présente dans l'environnement
npm -v # doit afficher "${props.release.npm}"
