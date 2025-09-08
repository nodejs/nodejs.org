# Descarcă și instalează fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Descarcă și instalează Node.js:
fnm install ${props.release.major}
