# asdfにはOSごとにそれぞれのインストール方法があります。
# 詳しくは https://asdf-vm.com/guide/getting-started.html にある公式ドキュメントを参照してください。
# このスニペットではasdf v0.16以降のコマンド構文を使用します。

# Node.jsプラグインをインストールする：
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Node.jsをダウンロードしてインストールする：
asdf install nodejs ${props.release.version}

# グローバルのデフォルトとしてNode.jsを設定する：
asdf set --home nodejs ${props.release.version}
