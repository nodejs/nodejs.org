---
layout: security.hbs
title: Segurança
---

# Segurança

## Reportando um Bug

Todos os bugs de segurança no Node.js são tratados com seriedade e devem ser reportados através do sistema [HackerOne](https://hackerone.com/nodejs) ou do e-mail [security@nodejs.org](mailto:security@nodejs.org). O problema reportado será entregue a uma subdivisão do time de principal, responsável por gerênciar as questões de segurança.

Seu relatório será confirmado em até 24 horas, e você receberá, dentro de 48h, uma resposta mais detalhada sobre o assunto, indicando os próximos passos a serem tomados.

Após a resposta inicial do seu reporte, a equipe de segurança se encarregará de manter você informado sobre o progresso que está sendo feito em relação à resolução e ao anúncio completo, e pode solicitar informações adicionais ou orientação sobre o problema reportado.
Estas atualizações serāo enviadas pelo menos a cada cinco dias. Mas na prática, isso é geralmente feito entre 24 à 48 horas.

### Programa Node.js de Bug Bounty

O projeto do Node.js é engajado em um programa oficial de recompensa por bugs (bug bounty) para pesquisadores de segurança e responsáveis por divulgações públicas.

O programa é gerenciado através da plataforma HackerOne em [https://hackerone.com/nodejs](https://hackerone.com/nodejs), onde mais detalhes podem ser encontrados.

## Reportando um Bug em um módulo de terceiros (third party)

Problemas de segurança em módulos de terceiros (third-party) devem ser reportados aos
seus respectivos _maintainers_ e também coordenados através do [Node Ecosystem Security Team](https://hackerone.com/nodejs-ecosystem) ou via e-mail para [security-ecosystem@nodejs.org](mailto:security-ecosystem@nodejs.org).

Detalhes sobre este processo podem ser encontrados no [repositório do Security Working Group](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md).

Obrigado por melhorar a segurança do Node.js e seu ecossistema. Seus esforços e a divulgação feita de forma responsável são muito estimados e serão reconhecidos.

## Política de Divulgação

Aqui encontra-se a política de divulgação de segurança para o Node.js:

* O relatório de segurança é recebido e designado a um primeiro responsável. Esta pessoa coordenará os processos de atualização e revisão. O problema é confirmado e uma lista de todas as versões afetadas é determinada.
O código é auditado para encontrar possíveis problemas similares em potencial. As correções são preparadas para todas as versões que ainda estão sob manutenção. Estas correções não são enviadas ao repositório público mas mantidos localmente aguardando a divulgação.

* Uma data de embargo é sugerida e escolhida para essa vulnerabilidade e um CVE (Common Vulnerabilities and Exposures (CVE®)) é solicitado para esta vulnerabilidade.

* Na data de embargo, é enviada uma cópia do anúncio para a lista de e-mails de segurança do Node.js. As alterações são enviadas para o repositório público e é feito o deploy dos novos builds para o nodejs.org. Dentro de 6 horas da notificação na lista de segurança, uma cópia do anúncio será publicada no blog do Node.js.

* Geralmente a data de embargo será definida 72 horas após o horário que o CVE é criado. Entretanto, a data pode variar dependendo do grau de severidade do bug ou a dificuldade na aplicação da correção (fix).

* Este processo pode levar algum tempo, especialmente quando é necessária uma coordenação com _maintainers_ de outros projetos. Todo esforço será feito para garantir que o bug seja corrigida a tempo. Entretanto, é importante que acompanhe o processo de release acima para garantir que o anúncio seja feito de forma consistente.

## Recebendo Atualizações de segurança

Notificaçōes de segurança serão distribuídas através dos seguintes métodos.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

## Comentários sobre esta Política

Caso você tenha sugestões em como este processo pode ser melhorado, por favor envie um [pull request](https://github.com/nodejs/nodejs.org)
ou [crie uma _issue_](https://github.com/nodejs/security-wg/issues/new) para discussão.
