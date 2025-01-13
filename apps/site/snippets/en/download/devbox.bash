# Download and install Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Initialize Devbox in your project
devbox init

# Download and install Node.js:
devbox add node@${props.release.major}

# Open a Devbox shell
devbox shell

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
