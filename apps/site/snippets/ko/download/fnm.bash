# fnm 다운로드 및 설치:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Node.js 다운로드 및 설치:
fnm install ${props.release.major}

# Node.js 버전 확인:
node -v # "${props.release.versionWithPrefix}"가 출력되어야 합니다.
