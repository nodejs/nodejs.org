# Unduh dan pasang Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Unduh dan pasang Node.js:
choco install nodejs --version="${props.release.version}"
