# Descarga e instala fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Descarga e instala Node.js:
fnm install ${props.release.major}

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
