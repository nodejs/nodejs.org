# Télécharger et installer nvm :
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# au lieu de redémarrer le shell
\. "$HOME/.nvm/nvm.sh"

# Télécharger et installer Node.js :
nvm install ${props.release.major}

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
nvm current # Doit afficher "${props.release.versionWithPrefix}".
