# تحميل و تثبيت fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
{

# بدلًا من إعادة تشغيل مفسّر الأوامر Shell
${props.os === 'WIN' ?
  'fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression' :
  'export PATH="$HOME/.local/share/fnm:$PATH"\neval "$(fnm env)"'
}

# تحميل و تثبيت Node.js:
fnm install --use ${props.release.major}
