# Завантажує й установлює nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Завантажує й установлює Node.js:
nvm install ${props.release.major}

# Перевіряє версію Node.js:
node -v # Повинно вивести «${props.release.versionWithPrefix}».
nvm current # Повинно вивести «${props.release.versionWithPrefix}».
