# 下載並安裝 Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# 下載並安裝 Node.js:
choco install nodejs-lts --version="${props.release.major}"

# 核對 Node.js 版本:
node -v # 應會印出 "${props.release.versionWithPrefix}"。
