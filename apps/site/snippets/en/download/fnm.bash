# Download and install fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  props.os === 'MAC' ?
    'curl -o- https://fnm.vercel.app/install | bash -s -- --force-no-brew' :
    'curl -o- https://fnm.vercel.app/install | bash'
}

# In lieu of restarting the shell
${props.os === 'WIN' ?
  'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression' :
  props.os === 'MAC' ?
    'export PATH="$HOME/Library/Application Support/fnm:$PATH"\neval "$(fnm env)"' :
    'export PATH="$HOME/.local/share/fnm:$PATH"\neval "$(fnm env)"'
}

# Download and install Node.js:
fnm install --use ${props.release.major}
