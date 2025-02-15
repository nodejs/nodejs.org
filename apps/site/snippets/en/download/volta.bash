# On most Unix systems including macOS, you can install with a single command:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

#Select a default Node version
volta install node@${props.release.major}

#Or to use the latest LTS version, run:
volta install node
