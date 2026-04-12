# Завантажує й установлює nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# Замість перезапуску оболонки можна виконати:
\. "$HOME/.nvm/nvm.sh"

# Завантажує й установлює Node.js:
nvm install ${props.release.major}
