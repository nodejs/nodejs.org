# Download and install Homebrew:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to your PATH:
${props.os === 'MAC' ?
  `if [ -x /opt/homebrew/bin/brew ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
  grep -qs '/opt/homebrew/bin/brew shellenv' ~/.zprofile ~/.zshrc || { echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"'; } >> ~/.zprofile
fi` :
  `if [ -x /home/linuxbrew/.linuxbrew/bin/brew ]; then
  eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
  grep -qs '/home/linuxbrew/.linuxbrew/bin/brew shellenv' ~/.bashrc ~/.profile || { echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"'; } >> ~/.bashrc
fi`
}

# Download and install Node.js:
brew install node@${props.release.major}

# Add Node.js to your PATH (required for keg-only LTS formulas):
export PATH="$(brew --prefix node@${props.release.major})/bin:$PATH"
grep -qs "$(brew --prefix node@${props.release.major})/bin" ${props.os === 'MAC' ? '~/.zshrc' : '~/.bashrc'} || { echo; echo 'export PATH="'"$(brew --prefix node@${props.release.major})/bin"':$PATH"'; } >> ${props.os === 'MAC' ? '~/.zshrc' : '~/.bashrc'}
