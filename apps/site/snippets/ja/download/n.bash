# nとNode.jsをダウンロードしてインストールする：
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# nのインストールによってNode.jsはインストールされますが、手動でインストールもできます：
#   n install ${props.release.major}

# Node.jsのバージョンを確認する：
node -v # "${props.release.versionWithPrefix}"が表示される。
