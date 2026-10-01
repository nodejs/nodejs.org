# Download and install Vite+
${props.os === 'WIN' ?
  'irm https://vite.plus/ps1 | iex' :
  'curl -fsSL https://vite.plus | bash'
}

# In lieu of restarting the shell
${props.os === 'WIN'
  ? '. "$env:APPDATA\\vite-plus\\env.ps1"'
  : '. "${XDG_CONFIG_HOME:-$HOME/.config}/vite-plus/env"'
}

# Download and install Node.js:
vp env default ${props.release.version}
