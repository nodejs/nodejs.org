# Завантажує й установлює n і Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Node.js уже встановлюється під час установки n, але її можна встановити вручну:
#   n install ${props.release.major}

# Перевіряє версію Node.js:
node -v # Повинно вивести «${props.release.versionWithPrefix}».
