---
layout: security.hbs
title: Sécurité
---

# Sécurité

## Signaler une faille dans Node.js

Signalez une faille de sécurité Node.js via [HackerOne](https://hackerone.com/nodejs) ou en écrivant à [security@nodejs.org](mailto:security@nodejs.org).

Votre signalement sera confirmé sous 24 heures, et vous recevrez une réponse détaillée à ce signalement dans un délai de 48 heures avec des indications sur les détails de la marche à suivre.

Après sa réponse initiale à votre signalement, l'équipe de sécurité s'efforcera de vous tenir informé·e de ses avancées en direction d'un correctif et d'une annonce publique ; elle pourrait vous recontacter pour demander des informations complémentaires ou des conseils à propos de la faille.
Les progrès seront notifiés au moins tous les cinq jours ; en pratique, ce délai est plutôt toutes les 24 à 48 heures.

### Le programme « Bug Bounty » de Node.js

Le projet Node.js s'engage dans un programme officiel de récompense de signalement de failles (« _Bug Bounty_ ») pour des chercheurs en sécurité et pour une approche responsable des signalements.

Ce programme est géré au travers de la plate-forme HackerOne, où vous trouverez des informations complémentaires : [https://hackerone.com/nodejs](https://hackerone.com/nodejs).

## Signaler une faille dans un module tiers

Les failles de sécurité de modules tiers sont à signaler auprès des personnes qui en assurent la maintenance, ainsi qu'à l'[équipe _Node Ecosystem Security_](https://hackerone.com/nodejs-ecosystem) ou en écrivant un e-mail à
[security-ecosystem@nodejs.org](mailto:security-ecosystem@nodejs.org).

Les détails de fonctionnement de ce processus se trouvent dans le [dépôt du _Security Working Group_](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md).

Merci de participer à l'amélioration de la sécurité de Node.js et de son écosystème. Vos efforts et un signalement responsable sont fortement appréciés et seront reconnus.

## Politique de divulgation

Voici la politique de divulgation des failles de sécurité pour Node.js :

* Le signalement est reçu et assigné à un·e responsable. Cette personne va coordonner la production et la livraison du correctif. Le problème est confirmé et une liste des versions affectées est déterminée. Le code est audité afin de repérer d'éventuels problèmes similaires. Les correctifs sont préparés pour chaque branche de Node.js encore en maintenance. Ces correctifs ne sont pas directement inclus dans le dépôt public et sont mis de côté en attendant une annonce publique.

* Une date d'embargo est choisie pour cette faille et un identifiant CVE (_Common Vulnerabilities and Exposures_ (CVE®)) est demandé.

* Le jour de la levée de l'embargo, la liste de diffusion de sécurité de Node.js reçoit une copie de l'annonce de la vulnérabilité. Les changements sont ajoutés au dépôt public et de nouvelles versions sont déployées sur nodejs.org. Une copie de l'annonce est publiée sur le blog Node.js. Dans les 6 heures qui suivent l'envoi du message à la liste de diffusion, une copie de ce message est publiée sur le blog Node.js.

* En général, la date de levée de l'embargo est décidée dans les 72 heures qui suivent l'attribution d'un identifiant CVE. Toutefois, ce délai peut varier en fonction de la gravité de la faille ou de la complexité à produire un correctif.

* Ce processus peut prendre du temps, surtout lorsqu'il requiert une coordination avec des personnes qui maintiennent d'autres projets. Tous les efforts possibles seront mis en œuvre pour résoudre la faille aussi vite que possible ; toutefois, il est important que nous suivions la procédure ci-dessus pour nous assurer que la divulgation s'effectue de la manière la plus responsable possible.

## Recevoir les alertes de sécurité

Les alertes de sécurité sont relayées sur les canaux suivants.

* <https://groups.google.com/group/nodejs-sec>
* [https://nodejs.org/fr/blog](https://nodejs.org/fr/blog)

## Commentaires à propos de cette politique de sécurité

Si vous avez des suggestions sur la manière d'améliorer ce processus, merci de nous en faire part avec une [_pull request_](https://github.com/nodejs/nodejs.org)
ou [en ouvrant une _issue_](https://github.com/nodejs/security-wg/issues/new) pour en discuter.
