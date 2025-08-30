# Téléchargez et installez Chocolatey :
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Télécharger et installer Node.js :
choco install nodejs --version="${props.release.version}"

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
