# Docker are instrucțiuni specifice de instalare pentru fiecare sistem de operare.
# Te rog să consulți documentația oficială disponibilă la https://docker.com/get-started/

# Trage imaginea Docker pentru Node.js:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Creează un container Node.js și pornește o sesiune Shell:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Verifică versiunea Node.js:
node -v # Ar trebui să afișeze „${props.release.versionWithPrefix}”.
