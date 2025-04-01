# Descarregar e instalar a nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# Em vez de reiniciar a concha ou shell
\. "$HOME/.nvm/nvm.sh"

# Descarregar e instalar a Node.js:
nvm install ${props.release.major}

# Consultar a versão da Node.js:
node -v # Deveria imprimir "${props.release.versionWithPrefix}".
nvm current # Deveria imprimir "${props.release.versionWithPrefix}".
