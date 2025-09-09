# Descarregar e instalar a fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Descarregar e instalar a Node.js:
fnm install ${props.release.major}
