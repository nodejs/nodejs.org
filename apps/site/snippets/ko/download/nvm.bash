# nvm 다운로드 및 설치:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Node.js 다운로드 및 설치:
nvm install ${props.release.major}

# Node.js 버전 확인:
node -v # "${props.release.versionWithPrefix}"가 출력되어야 합니다.
nvm current # "${props.release.versionWithPrefix}"가 출력되어야 합니다.
