# Docker는 각 운영 체제별로 설치 지침을 제공합니다.
# 공식 문서는 https://docker.com/get-started/에서 확인하세요.

# Node.js Docker 이미지를 풀(Pull)하세요:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Node.js 컨테이너를 생성하고 쉘 세션을 시작하세요:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Node.js 버전 확인:
node -v # "${props.release.versionWithPrefix}"가 출력되어야 합니다.
