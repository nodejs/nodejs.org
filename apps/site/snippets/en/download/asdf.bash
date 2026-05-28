# asdf has specific installation instructions for each operating system.
# See https://asdf-vm.com/guide/getting-started.html for setup instructions.

# Install the Node.js plugin:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Download and install Node.js:
asdf install nodejs ${props.release.version}

# Set the global Node.js version:
asdf set -u nodejs ${props.release.version}
