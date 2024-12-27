# NOTE:
# Chocolatey is not a Node.js package manager.
# Please ensure it is already installed on your system.
# Follow official instructions at https://chocolatey.org/
# Chocolatey is not officially maintained by the Node.js project and might not support the v22.12.0 version of Node.js

# download and install Node.js
choco install nodejs-lts --version="${props.release.major}"

# verifies the right Node.js version is in the environment
node -v # should print "${props.release.versionWithPrefix}"

# verifies the right npm version is in the environment
npm -v # should print "${props.release.npm}"
