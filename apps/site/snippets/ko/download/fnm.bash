# fnm 다운로드 및 설치:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Node.js 다운로드 및 설치:
fnm install ${props.release.major}
