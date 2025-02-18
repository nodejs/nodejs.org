# For more about n-install: https://github.com/mklement0/n-install
# For more about n and other ways to install: https://github.com/tj/n

# Download and install n and Node.js with a single command:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Download and install Node.js, done for you by n-install:
#   n install ${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
