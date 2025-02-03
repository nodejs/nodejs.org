# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install ${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
nvm current # Should print "${props.release.versionWithPrefix}".
