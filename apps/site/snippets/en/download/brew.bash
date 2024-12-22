# download and install Node.js
brew install node@${props.release.major}

# verifies the right Node.js version is in the environment
node -v # should print "${props.release.versionWithPrefix}"

# verifies the right npm version is in the environment
npm -v # should print "${props.release.npm}"
