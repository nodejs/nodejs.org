# Descarcă și instalează Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Descarcă și instalează Node.js:
brew install node@${props.release.major}

# Verificați versiunea de Node.js:
node -v # Ar trebui să afișeze "${props.release.versionWithPrefix}".
