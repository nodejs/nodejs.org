# Di sebagian besar sistem Unix termasuk macOS, kamu dapat memasang dengan satu perintah:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Unduh dan pasang Node.js:
volta install node@${props.release.major}
