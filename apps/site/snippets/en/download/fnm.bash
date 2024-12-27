# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash

# activate fnm
source ~/.bashrc

# download and install Node.js
fnm use --install-if-missing ${props.release.major}

# verifies the right Node.js version is in the environment
node -v # should print "${props.release.versionWithPrefix}"

# verifies the right npm version is in the environment
npm -v # should print "${props.release.npm}"
