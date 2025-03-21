# Descarregar e instalar a Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Inicializar a Devbox no nosso projeto
devbox init

# Descarregar e instalar a Node.js:
devbox add node@${props.release.major}

# Abrir uma concha de Devbox
devbox shell

# Consultar a versão da Node.js:
node -v # Deveria imprimir "${props.release.versionWithPrefix}".
