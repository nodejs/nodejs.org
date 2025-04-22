# Descarga e instala nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# en lugar de reiniciar la shell
\. "$HOME/.nvm/nvm.sh"

# Descarga e instala Node.js:
nvm install ${props.release.major}

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
nvm current # Debería mostrar "${props.release.versionWithPrefix}".
