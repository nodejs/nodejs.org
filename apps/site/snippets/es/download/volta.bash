# En la mayoría de los sistemas Unix, incluyendo macOS, puedes instalar con un solo comando:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Descarga e instala Node.js:
volta install node@${props.release.major}

# Verifica la versión de Node.js:
node -v # Debería mostrar "${props.release.versionWithPrefix}".
