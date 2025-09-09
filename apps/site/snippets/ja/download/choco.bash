# Chocolateyをダウンロードしてインストールする：
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Node.jsをダウンロードしてインストールする：
choco install nodejs --version="${props.release.version}"
