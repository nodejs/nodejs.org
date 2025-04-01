# On most Unix systems including macOS, you can install with a single command:
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Download and install Node.js:
volta install node@${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
