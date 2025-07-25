# Chocolateyをダウンロードしてインストールする：
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Node.jsをダウンロードしてインストールする：
choco install nodejs --version="${props.release.version}"

# Node.jsのバージョンを確認する：
node -v # "${props.release.versionWithPrefix}"が表示される。
