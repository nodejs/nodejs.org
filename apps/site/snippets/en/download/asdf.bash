# asdf has specific installation instructions for each operating system.
# Please refer to the official documentation at https://asdf-vm.com/guide/getting-started.html.

# Install the Node.js plugin
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Download and install Node.js ${props.release.version}
asdf install nodejs ${props.release.version}

# Set global Node.js version to ${props.release.version}
asdf set -u nodejs ${props.release.version}
