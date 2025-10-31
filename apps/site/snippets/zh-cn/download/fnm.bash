# 下载并安装 fnm：
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# 下载并安装 Node.js：
fnm install ${props.release.major}
