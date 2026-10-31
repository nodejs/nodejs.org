# Obține 0install:
${props.os === 'WIN' ? 'winget install 0install' : 'curl -O https://get.0install.net/0install.sh && chmod +x 0install.sh\n./0install.sh\nexport PATH=$HOME/bin:$PATH'}

# Adaugă Node.js și npm în PATH:
0install add node https://apps.0install.net/javascript/node.xml --version=${props.release.version}
0install add npm https://apps.0install.net/javascript/node.xml --command=npm --version=${props.release.version}
0install add npx https://apps.0install.net/javascript/node.xml --command=npx --version=${props.release.version}

# Activează instalarea globală a pachetelor:
npm config set prefix ${props.os === 'WIN' ? '"$env:appdata\\npm"' : '~/.npm-global'}

# Fă executabile comenzile instalate la nivel global (adaugă la profilul tău pentru a persista):
${props.os === 'WIN' ? '$env:PATH = "$env:appdata\\npm;$env:PATH"' : 'export PATH=~/.npm-global/bin:$PATH'}
