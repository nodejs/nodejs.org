# Unduh dan pasang fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Unduh dan pasang Node.js:
fnm install ${props.release.major}
