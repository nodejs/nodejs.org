# asdf has specific installation instructions for each operating system.
# Please refer to the official documentation at https://asdf-vm.com/guide/getting-started.html.
# This snippet uses asdf v0.16+ command syntax.

# Install the Node.js plugin:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Download and install Node.js:
asdf install nodejs ${props.release.version}

# Set Node.js as the global default:
asdf set --home nodejs ${props.release.version}
