# 在大多数包括 macOS 的 Unix 系统中，可以运行这个命令来安装：
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# 下载并安装 Node.js：
volta install node@${props.release.major}
