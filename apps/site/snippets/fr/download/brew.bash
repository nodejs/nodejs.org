# Télécharger et installer Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Télécharger et installer Node.js:
brew install node@${props.release.major}

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
