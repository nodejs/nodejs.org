---
title: O que é node core vs userland
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - core
  - userland
  - terminology
difficulty: 1
layout: knowledge-post.hbs
---

Ocasionalmente, nas trocas de mensagens nas listas de discussões do Node.js e nos canais do IRC, você pode notar coisas denominadas como "node-core" e "userland".

Certamente que, tradicionalmente, "userland" ou "userspace" referem-se a tudo que está fora da Kernel do sistema operacional. Neste sentido, o próprio Node é um programa "userland".

Porém, no contexto do NodeJS, "core" se refere aos módulos e bindings que são compiladas no NodeJS. Em geral, eles permitem um "hook" em funcionalidades de baixo nível muito conhecidas que praticamente todos os programas que utilizam rede precisam: TCP, HTTP, DNS, o sistema de arquivos, controle de processos e algumas outras coisas. Se algo é grande o suficiente para se discutir sobre, existe uma boa chance que não será parte do "node-core". HTTP já é grande o suficiente por si só, e se ele não fosse tão popular, ele muito provavelmente não faria parte do NodeJS.

Existem algumas coisas no "node-core" que são simplesmente essenciais demais para se viver sem em um ambiente JavaScript, ou que foram criadas para implementar alguns construtores do BOM (Browser Object Model) que não são parte da linguagem JavaScript, mas que poderiam muito bem ser (por exemplo, setTimeout, setInterval e o console).

Todo o restate é "userland". Isso incluí: npm, express, request, coffee-script, mysql clients, redis clients e assim por diante. Na maioria das vezes você pode instalar estes módulos usando o [npm](https://www.npmjs.com/).

A pergunta sobre o que é propriamente dito "node-core" e o que deve ser "userland" é uma batalha constante. Em geral, node é baseado na filosofia que ele *não* deve vir com as "baterias incluídas". É mais fácil mover coisas para fora do "node-core" do que para dentro, o que significa que módulos do core precisam continuamente "se provar" em questão de prover a funcionalidade necessária que praticamente todas as pessoas achem valiosas.

## Isso é Uma Coisa Boa

Um objetivo da biblioteca core miníma do node, é encorajar as pessoas a implementarem coisas de forma criativa, sem forçar determinadas idéias em todos. Com um core minúsculo e uma comunidade de módulos "userland" vibrante, nós podemos todos florescer e experimentar sem a utopia de termos sempre que concordar o tempo todo.

## Userland Não é Menos

Pelo contrário, é mais. Construindo funcionalidades em "userland" em vez de no "node-core" significa:

* Você possui muito mais liberdade para desenvolver a ideia.
* Todas as pessoas que quiserem usar o seu módulo podem instalar o mesmo facilmente (se você o publicar para o npm).
* Você têm liberdade para quebrar convenções do node se isto faz sentido para o seu caso de uso.

Se você *realmente* acredita que algo *precisa* ser parte do conjunto de bibliotecas do core do node, você *mesmo assim* deve construí-lo como um módulo! Ele possui muito mais chances de ser colocado no "node-core" se pessoas possuem a chance de ver suas grandes idéias em ação, e se os seus objetivos principais são iterados, melhorados e testados com usos do mundo real.

Mudar funcionalidade que é incluída no node-core é muito custoso. Nós fazemos isto algumas vezes, mas não é fácil e carrega consigo um grande risco de regressões. Melhor experimentar fora, e só então puxá-la para o node-core quando ela estiver estável. Quando a funcionalidade estiver usável como um pacote "userland", você pode até mesmo perceber que ela é menos essencial para o "node-core" do que você achava inicialmente.
