# fnm'yi indirin ve kurun:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Node.js'i indirin ve kurun:
fnm install ${props.release.major}
