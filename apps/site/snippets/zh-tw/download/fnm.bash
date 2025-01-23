# 下載並安裝 fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# 下載並安裝 Node.js:
fnm install ${props.release.major}

# 核對 Node.js 版本:
node -v # 應會印出 "${props.release.versionWithPrefix}"。
