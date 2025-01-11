# 下載並安裝 Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# 下載並安裝 Node.js:
brew install node@${props.release.major}

# 核對 Node.js 版本:
node -v # 應會印出 "${props.release.versionWithPrefix}"。
