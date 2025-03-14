# Na maioria dos sistemas de Unix incluindo macOS, podemos instalar com um único comando:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Descarregar e instalar a Node.js:
volta install node@${props.release.major}

# Consultar a versão da Node.js:
node -v # Deve imprimir "${props.release.versionWithPrefix}".
