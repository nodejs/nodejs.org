# 下载并安装 n 和 Node.js：
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Node.js 已在 n 安装时安装，但是你也可以手动安装它：
#   n install ${props.release.major}
