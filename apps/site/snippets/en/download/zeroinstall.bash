# Get 0install:
${props.os === 'WIN' ? 'winget install 0install' : 'curl -O https://get.0install.net/0install.sh && chmod +x 0install.sh\n./0install.sh\nexport PATH=$HOME/bin:$PATH'}
${props.os === 'WIN' ? '\n# Download specific Node.js version:\n0install download https://apps.0install.net/javascript/node.xml --version=' + props.release.version + ' --pin\n' : ''}
# Add Node.js and npm to PATH:
0install add node https://apps.0install.net/javascript/node.xml${props.os === 'WIN' ? '' : ' --version=' + props.release.version}
0install add npm https://apps.0install.net/javascript/node.xml --command=npm${props.os === 'WIN' ? '' : ' --version=' + props.release.version}
0install add npx https://apps.0install.net/javascript/node.xml --command=npx${props.os === 'WIN' ? '' : ' --version=' + props.release.version}

# Enable global package installation:
npm config set prefix ${props.os === 'WIN' ? '"$env:appdata\\npm"' : '~/.npm-global'}

# Make globally installed commands runnable (add to your profile to persist):
${props.os === 'WIN' ? '$env:PATH = "$env:appdata\\npm;$env:PATH"' : 'export PATH=~/.npm-global/bin:$PATH'}
