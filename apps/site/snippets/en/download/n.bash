# For more about n-install: https://github.com/mklement0/n-install
# For more about n, including other ways to install n: https://github.com/tj/n

# Download and install n and Node.js with a single command:
curl -L https://bit.ly/n-install | bash -s ${props.release.major}

# Download and install Node.js, done for you by n-install:
#   n install ${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
