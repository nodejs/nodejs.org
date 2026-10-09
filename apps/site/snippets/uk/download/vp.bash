# Завантажує й установлює Vite+
${props.os === 'WIN' ?
  '$env:VP_NODE_MANAGER = "yes"\nirm https://vite.plus/ps1 | iex' :
  'curl -fsSL https://vite.plus | VP_NODE_MANAGER=yes bash'
}

# Замість перезапуску оболонки можна виконати
${props.os === 'WIN'
  ? '. "$env:APPDATA\\vite-plus\\env.ps1"'
  : '. "${XDG_CONFIG_HOME:-$HOME/.config}/vite-plus/env"'
}

# Завантажує й установлює Node.js:
vp env default ${props.release.version}
