# Unduh dan pasang nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Unduh dan pasang Node.js:
nvm install ${props.release.major}

# Verifikasi versi Node.js:
node -v # Harus mencetak "${props.release.versionWithPrefix}".
nvm current # Harus mencetak "${props.release.versionWithPrefix}".
