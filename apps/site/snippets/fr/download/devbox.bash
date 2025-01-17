# Télécharger et installer Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Initialiser Devbox dans votre projet
devbox init

# Télécharger et installer Node.js :
devbox add node@${props.release.major}

# Ouvrir un shell Devbox
devbox shell

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
