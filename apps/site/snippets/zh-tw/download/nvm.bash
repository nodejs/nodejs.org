# 下載並安裝 nvm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 不想重新啟動 shell 時，執行：
\. "$HOME/.nvm/nvm.sh"

# 下載並安裝 Node.js：
nvm install ${props.release.major}

# 核對 Node.js 版本：
node -v # 應會印出 "${props.release.versionWithPrefix}"。
nvm current # 應會印出 "${props.release.versionWithPrefix}"。
