# Docker містить окремі інструкції установки для кожної операційної системи.
# Будь ласка, перегляньте офіційну документацію на https://docker.com/get-started/

# Завантажує образ Docker Node.js:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Створює контейнер Node.js та розпочинає сесію в Shell:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Перевіряє версію Node.js:
node -v # Повинно вивести «${props.release.versionWithPrefix}».
