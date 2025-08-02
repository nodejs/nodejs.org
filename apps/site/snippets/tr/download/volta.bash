Çoğu Unix sistemi, macOS dahil, tek bir komutla kurulum yapabilirsiniz:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Node.js indirin ve kurun:
volta install node@${props.release.major}

# Node.js sürümünüzü doğrulayın:
node -v # Şunu yazdırmalı "${props.release.versionWithPrefix}".
