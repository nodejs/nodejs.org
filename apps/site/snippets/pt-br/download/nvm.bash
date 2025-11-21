# Baixar e instalar o nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Carregar o nvm sem precisar reiniciar o shell
\. "$HOME/.nvm/nvm.sh"

# Baixar e instalar o Node.js:
nvm install ${props.release.major}
