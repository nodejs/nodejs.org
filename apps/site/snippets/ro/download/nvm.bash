# Descarcă și instalează nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# în loc de a reporni shell-ul
\. "$HOME/.nvm/nvm.sh"

# Descarcă și instalează Node.js:
nvm install ${props.release.major}
