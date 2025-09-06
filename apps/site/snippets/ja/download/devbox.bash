# Devboxをダウンロードしてインストールする
curl -fsSL https://get.jetify.com/devbox | bash

# プロジェクトでDevboxを初期化する
devbox init

# Node.jsをダウンロードしてインストールする：
devbox add node@${props.release.major}

# Devboxのシェルを開く
devbox shell
