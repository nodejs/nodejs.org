# Docker 对每个操作系统都有特定的安装指导。
# 请参考 https://docker.com/get-started/ 给出的官方文档

# 拉取 Node.js Docker 镜像：
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# 创建 Node.js 容器并启动一个 Shell 会话：
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}
