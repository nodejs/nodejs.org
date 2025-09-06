# macOSを含むほとんどのUnixシステムでは1つのコマンドでインストールできます：
${props.os === 'WIN' ?
  'winget install Volta.Volta' :
  'curl https://get.volta.sh | bash'
}

# Node.jsをダウンロードしてインストールする：
volta install node@${props.release.major}
