# Download and install Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Download and install Node.js:
brew install node@${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
