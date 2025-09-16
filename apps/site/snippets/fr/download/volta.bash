# Sur la plupart des systèmes Unix, y compris macOS, vous pouvez effectuer l'installation à l'aide d'une seule commande :
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Télécharger et installer Node.js :
volta install node@${props.release.major}
