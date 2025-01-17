# Unduh dan pasang Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Inisialisasi Devbox di proyek
devbox init

# Unduh dan pasang Node.js:
devbox add node@${props.release.major}

# Buka shell Devbox
devbox shell

# Verifikasi versi Node.js:
node -v # Harus mencetak "${props.release.versionWithPrefix}".
