# 下载并安装 Chocolatey：
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# 下载并安装 Node.js：
choco install nodejs --version="${props.release.version}"
