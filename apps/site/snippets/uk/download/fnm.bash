# Завантажує й установлює fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Завантажує й установлює Node.js:
fnm install ${props.release.major}

# Перевіряє версію Node.js:
node -v # Повинно вивести «${props.release.versionWithPrefix}».
