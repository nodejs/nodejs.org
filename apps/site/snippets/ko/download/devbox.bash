# Devbox 다운로드 및 설치:
curl -fsSL https://get.jetify.com/devbox | bash

# 프로젝트에서 Devbox 초기화
devbox init

# Node.js 다운로드 및 설치:
devbox add node@${props.release.major}

# Devbox 셸 열기
devbox shell

# Node.js 버전 확인:
node -v # Should print "${props.release.versionWithPrefix}".
