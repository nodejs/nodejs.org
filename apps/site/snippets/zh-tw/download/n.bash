# 下載並安裝 n 及 Node.js：
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# n-install 執行時已安裝 Node.js，但您還是可以手動安裝：
#   n install ${props.release.major}

# 核對 Node.js 版本：
node -v # 應會印出 "${props.release.versionWithPrefix}"。
