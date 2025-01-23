# Unduh dan pasang Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Unduh dan pasang Node.js:
brew install node@${props.release.major}

# Verifikasi versi Node.js:
node -v # Harus mencetak "${props.release.versionWithPrefix}".
