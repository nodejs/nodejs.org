# Chocolateyをダウンロードしてインストールする：
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Node.jsをダウンロードしてインストールする：
choco install nodejs-lts --version="${props.release.major}"

# Node.jsのバージョンを確認する：
node -v # "${props.release.versionWithPrefix}"が表示される。
