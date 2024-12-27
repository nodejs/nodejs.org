# Node.jsをダウンロードしインストールする
brew install node@${props.release.major}

# Node.jsのバージョンを確認する
node -v # "${props.release.versionWithPrefix}"が表示される

# npmのバージョンを確認する
npm -v # "${props.release.npm}"が表示される
