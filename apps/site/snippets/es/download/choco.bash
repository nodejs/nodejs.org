# Descarga e instala Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Descarga e instala Node.js:
choco install nodejs-lts --version="${props.release.major}"

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
