# Завантажує й установлює fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Замість перезапуску оболонки можна виконати
${props.os === 'WIN' ?
  'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression' :
  'export PATH="$HOME/.local/share/fnm:$PATH"\neval "$(fnm env)"'
}

# Завантажує й установлює Node.js:
fnm install --use ${props.release.major}
