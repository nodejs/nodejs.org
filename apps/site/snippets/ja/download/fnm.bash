# fnmをダウンロードしてインストールする：
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# シェルを再起動する代わりに実行する
${props.os === 'WIN' ?
  'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression' :
  'export PATH="$HOME/.local/share/fnm:$PATH"\neval "$(fnm env)"'
}

# Node.jsをダウンロードしてインストールする：
fnm install --use ${props.release.major}
