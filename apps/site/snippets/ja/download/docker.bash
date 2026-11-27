# DockerにはOSごとにそれぞれのインストール方法があります。
# 詳しくは https://docker.com/get-started/ にある公式ドキュメントを参照してください

# Node.jsのDockerイメージを取得する：
docker pull node:${props.release.status === 'Alpha' ? props.release.version + '-trixie-slim' : props.release.major + '-slim'}

# Node.jsのコンテナーを作成しシェルを起動する：
docker run -it --rm --entrypoint sh node:${props.release.status === 'Alpha' ? props.release.version + '-trixie-slim' : props.release.major + '-slim'}
