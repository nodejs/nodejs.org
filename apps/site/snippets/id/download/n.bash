# Unduh dan pasang n dan Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Node.js sudah terpasang ketika n-install, tapi kamu juga bisa memasang secara manual:
#   n install ${props.release.major}

# Verifikasi versi Node.js:
node -v # Harus mencetak "${props.release.versionWithPrefix}".
