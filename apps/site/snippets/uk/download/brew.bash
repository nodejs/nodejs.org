# Завантажує й установлює Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Завантажує й установлює Node.js:
brew install node@${props.release.major}
