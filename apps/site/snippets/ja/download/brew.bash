# Homebrewをダウンロードしてインストールする
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Node.jsをダウンロードしてインストールする：
brew install node@${props.release.major}

# Node.jsのバージョンを確認する：
node -v # "${props.release.versionWithPrefix}"が表示される。
