# Download and install fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Download and install Node.js:
fnm install ${props.release.major}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
