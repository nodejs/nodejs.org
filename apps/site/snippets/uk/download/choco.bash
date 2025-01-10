# Завантажує й установлює Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Завантажує й установлює Node.js:
choco install nodejs-lts --version="${props.release.major}"

# Перевіряє версію Node.js:
node -v # Повинно вивести «${props.release.versionWithPrefix}».
