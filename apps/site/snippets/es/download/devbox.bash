# Descarga e instala Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Inicializa Devbox en tu proyecto
devbox init

# Descarga e instala Node.js:
devbox add node@${props.release.major}

# Abre una shell de Devbox
devbox shell

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
