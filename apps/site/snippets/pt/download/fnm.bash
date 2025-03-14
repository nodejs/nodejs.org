# Descarregar e instalar a fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Descarregar e instalar a Node.js:
fnm install ${props.release.major}

# Consultar a versão da Node.js:
node -v # Deveria imprimir "${props.release.versionWithPrefix}".
