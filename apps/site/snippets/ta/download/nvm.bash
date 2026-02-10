# nvm-ஐ பதிவிறக்கம் செய்து நிறுவவும்:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# ஷெல்லை மறுதொடக்கம் செய்வதற்கு பதிலாக lieu பயன்படுத்தவும்
\. "$HOME/.nvm/nvm.sh"

# Node.js-ஐ பதிவிறக்கம் செய்து நிறுவவும்:
nvm install ${props.release.major}
