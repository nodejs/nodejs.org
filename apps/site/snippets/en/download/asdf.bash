# asdf has specific installation instructions for each operating system.
# Please refer to the official documentation at https://asdf-vm.com/guide/getting-started.html.
#
# The following is for macOS and Linux systems with Homebrew installed using ZSH:
brew install asdf

# Add asdf's shims directory to your shell configuration:
echo 'export PATH="\$\{ASDF_DATA_DIR:-\$HOME/.asdf\}/shims:\$PATH"' >> ~/.zshrc

# Reload shell configuration:
source ~/.zshrc

# Install the Node.js plugin:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Download and install Node.js:
asdf install nodejs ${props.release.version}

# Set global Node.js version:
asdf set -u nodejs ${props.release.version}
