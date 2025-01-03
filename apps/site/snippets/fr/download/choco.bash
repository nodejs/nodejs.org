# Téléchargez et installez Chocolatey :
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Télécharger et installer Node.js :
choco install nodejs-lts --version="${props.release.major}"

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
