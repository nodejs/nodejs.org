# Завантажує й установлює nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash

# Замість перезапуску оболонки можна виконати:
\. "$HOME/.nvm/nvm.sh"

# Завантажує й установлює Node.js:
nvm install ${props.release.status === 'Alpha' ? '--only=alpha ' : ''}${props.release.major}
