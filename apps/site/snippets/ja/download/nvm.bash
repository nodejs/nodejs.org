# nvmをダウンロードしてインストールする：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Node.jsをダウンロードしてインストールする：
nvm install ${props.release.major}

# Node.jsのバージョンを確認する：
node -v # "${props.release.versionWithPrefix}"が表示される。
nvm current # "${props.release.versionWithPrefix}"が表示される。
