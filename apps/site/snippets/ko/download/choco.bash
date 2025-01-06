# Chocolatey 다운로드 및 설치:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# Node.js 다운로드 및 설치:
choco install nodejs-lts --version="${props.release.major}"

# Node.js 버전 확인:
node -v # "${props.release.versionWithPrefix}"가 출력되어야 합니다.
