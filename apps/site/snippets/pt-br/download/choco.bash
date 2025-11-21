# Baixar e instalar o Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Baixar e instalar o Node.js:
choco install nodejs --version="${props.release.version}"
