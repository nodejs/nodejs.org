# Завантажує й установлює Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Ініціалізує Devbox у вашому проєкті
devbox init

# Завантажує й установлює Node.js:
devbox add node@${props.release.major}

# Відкриває оболонку Devbox
devbox shell
