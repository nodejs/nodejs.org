# fnm-ஐ பதிவிறக்கம் செய்து நிறுவவும்:
${props.os === 'WIN' ?
  'winget install Schniz.fnm' :
  'curl -o- https://fnm.vercel.app/install | bash'
}

# Node.js ஐ பதிவிறக்கம் செய்து நிறுவவும்:
fnm install ${props.release.major}
