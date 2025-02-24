# Download and install n and Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Download and install Node.js, done for you by n-install:
#   n install ${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
