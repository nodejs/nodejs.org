# تحميل و تثبيت nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash

# بدلاً من إعادة تشغيل shell
\. "$HOME/.nvm/nvm.sh"

# تحميل و تثبيت Node.js:
nvm install ${props.release.major}
