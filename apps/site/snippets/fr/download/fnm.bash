# Télécharger et installer fnm :
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Télécharger et installer Node.js :
fnm install ${props.release.major}

# Vérifier la version de Node.js :
node -v # Doit afficher "${props.release.versionWithPrefix}".
