# fnmをダウンロードしてインストールする：
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Node.jsをダウンロードしてインストールする：
fnm install ${props.release.major}
