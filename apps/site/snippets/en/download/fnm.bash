# Download and install fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# In lieu of restarting the shell
${props.os === 'WIN' ?
  'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression' :
  'eval "$(fnm env)"'
}

# Download and install Node.js:
fnm install ${props.release.major}
