# O Docker possui instruções específicas de instalação para cada sistema operacional.
# Consulte a documentação oficial em https://docker.com/get-started/

# Baixar a imagem Docker do Node.js:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Criar um contêiner do Node.js e iniciar uma sessão Shell:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}
