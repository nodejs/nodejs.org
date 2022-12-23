---
title: Um Jeito Fácil de Construir Programas Escaláveis de Rede
author: ryandahl
date: 2011-10-04T22:39:56.000Z
status: publish
category: Uncategorized
slug: an-easy-way-to-build-scalable-network-programs
layout: blog-post.hbs
---

Suponha que você esteja escrevendo um servidor web que codifica vídeos em cada upload de arquivo. A codificação de vídeo é muito ligada ao processador. Algumas postagens recentes em blogs sugerem que o Node.js falharia miseravelmente nisso.

O uso do Node não significa que você precise escrever um algoritmo de codificação de vídeo em JavaScript (uma linguagem sem inteiros 64 bits) e analisar o loop de eventos do servidor principal. A abordagem sugerida é separar a tarefa de I/O (Input/Output - Entrada/Saída) de receber uploads e servir downloads da tarefa do processador de codificação de vídeo. No caso da codificação de vídeo, isso é feito usando o ffmpeg. O Node fornece meios avançados de controle assíncrono de subprocessos para trabalhos como este.

Também foi sugerido que o Node não tira proveito de máquinas com processadores multicore. O Node suporta há muito tempo conexões de balanceamento de carga em vários processos em apenas algumas linhas de código - dessa maneira, um servidor Node usará os núcleos disponíveis. Nas próximas versões, tornaremos ainda mais fácil: basta passar `--balance` na linha de comando e o Node gerenciará o cluster de processos.

O Node tem um objetivo claro: fornecer uma maneira fácil de criar programas escaláveis de rede. Não é uma ferramenta para todos os problemas. Não escreva um ray tracer com Node. Não escreva um navegador da web com o Node. No entanto, procure o Node se tiver a tarefa de escrever um servidor DNS, servidor DHCP ou mesmo um servidor de codificação de vídeo.

Confiando no kernel para agendar e antecipar tarefas custosas em termos de computação e para balancear a carga de novas conexões, o Node parece menos mágico do que as plataformas de servidor que empregam o agendamento da "userland". Até agora, nosso foco na simplicidade e transparência valeu a pena: [o](https://www.joyent.com/blog/node-js-meetup-distributed-web-architectures) [número](https://venturebeat.com/2011/08/16/linkedin-node/) [de](http://corp.klout.com/blog/2011/10/the-tech-behind-klout-com/) [histórias de](http://pow.cx/) [sucesso](https://www.joelonsoftware.com/2011/09/13/announcing-trello/) de desenvolvedores e corporações que estão adotando a tecnologia continua a crescer.
