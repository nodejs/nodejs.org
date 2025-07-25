# Descarcă și instalează Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Inițializează Devbox în proiectul tău
devbox init

# Descarcă și instalează Node.js:
devbox add node@${props.release.major}

# Deschide un shell Devbox
devbox shell

# Verifică versiunea Node.js:
node -v # Ar trebui să afișeze „${props.release.versionWithPrefix}”.
