${props.installMethod === 'VP' ?
  '' :
  `# Yarnをダウンロードしてインストールする：
corepack enable yarn`
}

# Yarnのバージョンを確認する：
yarn -v
