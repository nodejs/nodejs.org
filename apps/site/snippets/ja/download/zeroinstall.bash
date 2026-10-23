# 0installをダウンロードする：
${props.os === 'WIN' ? 'winget install 0install' : 'curl -O https://get.0install.net/0install.sh && chmod +x 0install.sh\n./0install.sh\nexport PATH=$HOME/bin:$PATH'}

# PATHにNode.jsとnpmを追加する：
0install add node https://apps.0install.net/javascript/node.xml --version=${props.release.version}
0install add npm https://apps.0install.net/javascript/node.xml --command=npm --version=${props.release.version}
0install add npx https://apps.0install.net/javascript/node.xml --command=npx --version=${props.release.version}

# グローバルのパッケージインストールを有効にする：
npm config set prefix ${props.os === 'WIN' ? '"$env:appdata\\npm"' : '~/.npm-global'}

# グローバルにインストールされたコマンドを実行可能にする（永続化するにはプロファイルに追加してください）：
${props.os === 'WIN' ? '$env:PATH = "$env:appdata\\npm;$env:PATH"' : 'export PATH=~/.npm-global/bin:$PATH'}
