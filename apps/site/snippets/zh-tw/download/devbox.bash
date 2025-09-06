# 下載並安裝 Devbox:
curl -fsSL https://get.jetify.com/devbox | bash

# 在您的專案中初始化 Devbox
devbox init

# 下載並安裝 Node.js：
devbox add node@${props.release.major}

# 啟動 Devbox shell
devbox shell
