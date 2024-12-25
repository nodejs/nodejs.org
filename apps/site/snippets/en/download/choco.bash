# Download and install Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Download and install Node.js:
choco install nodejs-lts --version="${props.release.major}"

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
