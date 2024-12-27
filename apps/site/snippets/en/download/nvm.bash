# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install ${props.release.major}

# verifies the right Node.js version is in the environment
node -v # should print "${props.release.versionWithPrefix}"

# verifies the right npm version is in the environment
npm -v # should print "${props.release.npm}"
