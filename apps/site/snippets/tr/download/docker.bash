# Docker her işletim sistemi için özelleştirilmiş kurulum kılavuzu sunar.
# Lütfen https://docker.com/get-started/ adresinde bulunan resmi belgelere göz atın.

Node.js Docker imajını (kalıbını) çekin:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Bir Node.js konteyneri oluşturun ve bir Shell oturumu başlatın:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Node.js sürümünü doğrulayın:
node -v # Şunu yazdırmalı "${props.release.versionWithPrefix}".
