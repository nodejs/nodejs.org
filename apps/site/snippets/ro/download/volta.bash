# Pe cele mai multe sisteme de operare Unix, inclusiv macOS, poți instala cu o singură comandă:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Descarcă și instalează Node.js:
volta install node@${props.release.major}

# Verifică versiunea Node.js:
node -v # Ar trebui să afișeze „${props.release.versionWithPrefix}”.
