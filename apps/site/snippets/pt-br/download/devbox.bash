# Baixar e instalar o Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Inicializar o Devbox no seu projeto
devbox init

# Baixar e instalar o Node.js:
devbox add node@${props.release.major}

# Abrir um shell do Devbox
devbox shell
