# Descarcă și instalează fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# în loc de a reporni shell-ul
${props.os === 'WIN' ?
  'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression' :
  'export PATH="$HOME/.local/share/fnm:$PATH"\neval "$(fnm env)"'
}

# Descarcă și instalează Node.js:
fnm install --use ${props.release.major}
