---
title: Ambiente de Desenvolvimento
author: ryandahl
date: 2011-04-05T03:16:27.000Z
status: publish
category: Uncategorized
slug: development-environment
layout: blog-post.hbs
---

Se você está compilando um pacote de software porque precisa de uma versão específica (por exemplo, a mais recente), isso requer um pouco mais de manutenção do que usar um gerenciador de pacotes como o `dpkg`. Softwares que você mesmo compila *não* devem ser salvos em `/usr`, mas sim em seu diretório principal. Isso faz parte de ser um desenvolvedor de software.

Uma maneira de fazer isso é instalar tudo no `$HOME/local/$PACKAGE`. Aqui está como eu instalo o Node na minha máquina:

```bash
./configure --prefix=$HOME/local/node-v0.4.5 && make install
```

Para definir meus caminhos automaticamente, coloquei isso dentro do meu `$HOME/.zshrc`:

```bash
PATH="$HOME/local/bin:/opt/local/bin:/usr/bin:/sbin:/bin"
LD_LIBRARY_PATH="/opt/local/lib:/usr/local/lib:/usr/lib"
*for* i *in* $HOME/local/*; *do*
[ -d $i/bin ] && PATH="${i}/bin:${PATH}"
[ -d $i/sbin ] && PATH="${i}/sbin:${PATH}"
[ -d $i/include ] && CPATH="${i}/include:${CPATH}"
[ -d $i/lib ] && LD_LIBRARY_PATH="${i}/lib:${LD_LIBRARY_PATH}"
[ -d $i/lib/pkgconfig ] && PKG_CONFIG_PATH="${i}/lib/pkgconfig:${PKG_CONFIG_PATH}"
[ -d $i/share/man ] && MANPATH="${i}/share/man:${MANPATH}"
*done*
```

O Node está em desenvolvimento suficientemente rápido para que *todos* possam compilá-lo. Um corolário disso é que o `npm` (que deve ser instalado junto ao Node) não requer "root" para instalar pacotes.

O CPAN e o RubyGems embaçaram as linhas entre ferramentas de desenvolvimento e gerenciadores de pacotes do sistema. Com o `npm`, desejamos traçar uma linha clara: não é um gerenciador de pacotes do sistema. Não é para instalar o firefox, ffmpeg ou OpenSSL; é para baixar, criar e configurar rapidamente pacotes do Node. O `npm` é uma ferramenta de *desenvolvimento*. Quando um programa escrito em Node se torna suficientemente maduro, ele deve ser distribuído como um tarball, `.deb`, `.rpm` ou outro sistema de pacotes. Não deve ser distribuído para usuários finais com `npm`.
