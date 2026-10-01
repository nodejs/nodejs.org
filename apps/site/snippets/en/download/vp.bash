# Download and install Vite+
# You'll need to restart the terminal to activate Vite+
${props.os === 'WIN' ?
  'irm https://vite.plus/ps1 | iex' :
  'curl -fsSL https://vite.plus | bash'
}

# Download and install Node.js:
vp env default ${props.release.version}
