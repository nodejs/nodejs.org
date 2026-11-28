# Download and install Homebrew:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# In lieu of restarting the shell:
${props.os === 'MAC' ?
  'if [ -x /opt/homebrew/bin/brew ]; then eval "$(/opt/homebrew/bin/brew shellenv)"; fi' :
  'if [ -x /home/linuxbrew/.linuxbrew/bin/brew ]; then eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"; fi'
}

# Download and install Node.js:
brew install node@${props.release.major}
export PATH="$(brew --prefix node@${props.release.major})/bin:$PATH"
