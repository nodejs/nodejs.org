# Descărcați și instalați Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Descărcați și instalați Node.js:
brew install node@${props.release.major}

# Verificați versiunea de Node.js:
node -v # Ar trebui să afișeze "${props.release.versionWithPrefix}".
