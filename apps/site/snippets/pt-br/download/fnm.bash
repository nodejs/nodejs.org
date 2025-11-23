# Baixar e instalar o fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Baixar e instalar o Node.js:
fnm install ${props.release.major}
