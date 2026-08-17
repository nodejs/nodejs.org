# asdf містить окремі інструкції установки для кожної операційної системи.
# Будь ласка, використовуйте офіційну документацію за https://asdf-vm.com/guide/getting-started.html.
# Цей сніпет використовує синтаксис команд asdf v0.16+.

# Установлює плаґін Node.js:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Завантажує й установлює Node.js:
asdf install nodejs ${props.release.version}

# Установлює Node.js типовим глобально:
asdf set --home nodejs ${props.release.version}
