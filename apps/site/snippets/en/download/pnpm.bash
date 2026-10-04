${props.installMethod === 'VP' ?
  '' :
  `# Download and install pnpm:
corepack enable pnpm`
}

# Verify pnpm version:
pnpm -v
