# 下载并安装 Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# 在你的项目中初始化 Devbox
devbox init

# 下载并安装 Node.js：
devbox add node@${props.release.major}

# 打开 Devbox 终端
devbox shell
