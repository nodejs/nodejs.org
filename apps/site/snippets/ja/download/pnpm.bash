${props.installMethod === 'VP' ?
  '' :
  `# pnpmをダウンロードしてインストールする：
corepack enable pnpm`
}

# pnpmのバージョンを確認する：
pnpm -v
