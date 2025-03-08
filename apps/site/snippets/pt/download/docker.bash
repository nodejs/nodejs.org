# Docker possui instruções de instalação específicas para cada sistema operativo.
# Podemos consultar a documentação oficial no https://docker.com/get-started/

# Puxar ou extrair a imagem de Docker da Node.js:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Criar um contentor de Node.js e iniciar uma sessão de Shell:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Consultar a versão da Node.js:
node -v # Deveria imprimir "${props.release.versionWithPrefix}".
