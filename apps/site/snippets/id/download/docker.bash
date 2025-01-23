# Docker memiliki petunjuk instalasi khusus untuk setiap sistem operasi.
# Silakan merujuk ke dokumentasi resmi di https://docker.com/get-started/

# Mengambil gambar Docker Node.js:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Buat kontainer Node.js dan mulai sesi Shell:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Verifikasi versi Node.js:
node -v # Harus mencetak "${props.release.versionWithPrefix}".
