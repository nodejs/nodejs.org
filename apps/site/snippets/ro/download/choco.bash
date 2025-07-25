# Descarcă și instalează Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Descarcă și instalează Node.js:
choco install nodejs --version="${props.release.version}"

# Verifică versiunea Node.js:
node -v # Ar trebui să afișeze „${props.release.versionWithPrefix}”.
