# На більшості системах Unix, включно з macOS, його можна встановити однією командою:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Завантажує й установлює Node.js:
volta install node@${props.release.major}
