# Docker 針對不同作業系統有特定的安裝指示。
# 請至 https://docker.com/get-started/ 查閱官方文件

# 拉取 Node.js Docker 映像:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# 建立 Node.js 容器並啟動 Shell 工作階段:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# 核對 Node.js 版本:
node -v # 應會印出 "${props.release.versionWithPrefix}"。
