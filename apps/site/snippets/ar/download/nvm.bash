# تحميل و تثبيت nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash

# بدلاً من إعادة تشغيل shell
\. "$HOME/.nvm/nvm.sh"

# تحميل و تثبيت Node.js:
nvm install ${props.release.status === 'Alpha' ? '--only=alpha ' : ''}${props.release.major}
