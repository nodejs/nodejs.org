# Télécharger et installer nvm :
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Télécharger et installer Node.js :
nvm install ${props.release.major}

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
nvm current # Doit afficher "${props.release.versionWithPrefix}".
