# DockerにはOSごとにそれぞれのインストール方法があります。
# 詳しくは https://docker.com/get-started/ にある公式ドキュメントを参照してください

# Node.jsのDockerイメージを取得する：
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Node.jsのコンテナーを作成しシェルを起動する：
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Node.jsのバージョンを確認する：
node -v # "${props.release.versionWithPrefix}"が表示される。
