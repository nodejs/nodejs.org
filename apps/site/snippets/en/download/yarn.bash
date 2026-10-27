${props.installMethod === 'VP' ?
  '' :
  `# Download and install Yarn:
corepack enable yarn`
}

# Verify Yarn version:
yarn -v
