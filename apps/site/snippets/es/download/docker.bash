# Docker provee instrucciones dedicadas para cada sistema operativo.
# Por favor consulta la documentación oficial en https://www.docker.com/get-started/

# Descarga la imagen de Docker de Node.js:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Crea un contenedor de Node.js e inicia una sesión shell:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
