${props.installMethod === 'VP' ?
  '' :
  `# Descarcă și instalează pnpm:
corepack enable pnpm`
}

# Verifică versiunea pnpm:
pnpm -v
