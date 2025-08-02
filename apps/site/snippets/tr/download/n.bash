# n ve Node.js'i indirin ve kurun:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

n, yükleme sırasında Node.js’i zaten kurar; ancak dilerseniz elle de kurabilirsiniz:
#   n install ${props.release.major}

Node.js sürümünü doğrulayın:
node -v # "${props.release.versionWithPrefix}" çıktısını vermelidir.
