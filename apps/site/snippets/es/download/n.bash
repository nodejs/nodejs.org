# Descarga e instala n y Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Node.js ya se instala durante n-install, pero también puedes instalarlo manualmente:
#   n install ${props.release.major}

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
