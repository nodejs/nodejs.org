# Descarga e instala Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Descarga e instala Node.js:
choco install nodejs --version="${props.release.version}"
