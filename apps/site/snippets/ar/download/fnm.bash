# تحميل و تثبيت fnm:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
{

# تحميل و تثبيت Node.js:
fnm install ${props.release.major}
