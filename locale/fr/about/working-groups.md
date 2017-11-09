---
layout: about.hbs
title: Groupes de Travail
---
# Groupes de Travail du Core
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Les Groupes de Travail du Core sont créés par le
[Comité de Pilotage Technique (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Groupes de Travail actuels

* [Site Web](#site-web)
* [Streams](#streams)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [i18n](#i18n)
* [Intl](#intl)
* [Evangélisme](#evangélisme)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Release](#release)

### [Site Web](https://github.com/nodejs/nodejs.org)

L'objectif du Groupe de Travail du Site Web est des construire et maintenir
un site web public pour le projet Node.js.

Ses responsabilités incluent:
* Déveloper et maintenir un système de build et d'automation pour nodejs.org
* S'assurer de la mise à jour régulière du site avec les changements apportés à Node.js,
  comme les releases et les fonctionnalités.
* Permettre et encourager le développement d'une communauté de traducteurs.

### [Streams](https://github.com/nodejs/readable-stream)

Le Groupe de Travail des Streams est dédié au support et à l'amélioration de l'API 
Streams telle qu'utilisée dans Node.js et dans l'écosystème npm. Nous cherchons à
créer une API composable qui résoud le problème de la représentation de multiples
occurrences d'un évènement dans le temps de façon simple et accessible. Les
améliorations sur cette API seront faites selon les besoin de l'écosystème; 
l'intéropérabilité et la rétrocompatibilité avec d'autres solutions et les anciennes
versions sont une priorité absolue.

Ses responsabilités incluent:
* Répondre aux tickets concernant les flux sur le tracker Node.js.
* Ecrire et éditer la documentation des flux dans le projet Node.js.
* Vérifier les modifications sur les sous-classes de flux dans le projet Node.js.
* Rediriger les changements sur les flux depuis le projet Node.js vers le projet Flux.
* Aider à l'implémentation des fournisseurs de flux dans le projet Node.js.
* Recommander les versions de `readable-stream` à inclure dans Node.js.
* Communiquer sur le futur des flux pour avertir la communauté sur d'éventuels
  changements.

### [Build](https://github.com/nodejs/build)

L'objectif du Groupe de Travail du Build est de créer et maintenir une infrastructure
d'automation distribuée.

Ses responsabilités incluent:
* Produire des packages pour toutes les plateformes cibles.
* Effectuer des tests.
* Effectuer des tests de performances et des comparaisons.
* Créer et gérer les conteneurs de build.

### [Diagnostics](https://github.com/nodejs/diagnostics)

L'objectif du Groupe de Travail des Diagnostics est de présenter un ensemble complet,
documenté, et extensible d'interfaces de diagnostic utilisables avec les outils Node.js
et les machines virtuelles JavaScript.

Ses responsabilités incluent:
* Collaborer avec V8 pour intégrer `v8_inspector` dans Node.js.
* Collaborer avec V8 pour intégrer `trace_event` dans Node.js.
* Collaborer avec Core pour affiner `async_wrap` et `async_hooks`.
* Maintenir et améliorer l'intégration des système de trace des systèmes d'exploitation
  (ex. ETW, LTTNG, dtrace).
* Explorer les opportunités et failles, discuter des demandes d'amélioration, et
  résoudre les conflits dans les diagnotics de Node.js.
* Favoriser le développement d'un écosystème d'outils de diagnostic pour Node.js.

### i18n

Les Groupes de Travail d'Internationalisation (`i18n`) gère plus que les traductions.
Ils sont les points d'accès qui permettent aux membres de la communauté de 
collaborer dans la langue de leur choix.

Chaque équipe est organisée autour d'une langue commune. Chaque
communauté de langue peut ensuite produire des traductions pour diverses
ressources du projet.

Leurs responsabilités incluent:
* Traduire tout matériel Node.js qui leur parait pertinent pour leur
  communauté.
* Contrôler les processus de maintient des traductions fidèles et à jour.
* Gérer et surveiller les réseaux sociaux dans leur langue.
* Faire la promotion d'intervenants Node.js pour les meetups et conférences
  dans leur langue.

Veuillez noter que les Groupes de Travail d'Internationalisation sont séparés
du Groupe de Travail [Intl](#Intl).

Chaque communauté de langue gère sa propre liste de membres.

* [nodejs-ar - Arabe (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgare (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinois (中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Tchèque (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danois (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - Allemand (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Grecque (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Espagnol (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persan (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnois (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - Français (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hébreux (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hongrois (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonésien (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italien (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japonais (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgien (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Coréen (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macédonien (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malais (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Hollandais (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norvégien (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polonais (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguais (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Roumain (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russe (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Suédois (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamoul (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turc (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanais (國語)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainien (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamien (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Intl](https://github.com/nodejs/Intl)

Le Groupe de Travail d'Intl est dédié au support et à l'amélioration de
l'Internationalisation (i18n) et de la Localisation (l10n) dans Node.

Ses responsabilités incluent:
* Assurer le fonctionnement et la conformité (standards: ECMA, Unicode…)
* Assurer le support des tickets de Globalisation et d'Internationalisation
  ouverts dans le tracker
* Conseiller et promouvoir les bonnes pratiques
* Affiner l'implémentation actuelle d'`Intl`

Le Groupe de Travail d'Intl n'est pas responsable de la traduction du contenu. Ceci
relève de la responsabilité des groupes [i18n](#i18n) de chaque langue.

### [Evangélisme](https://github.com/nodejs/evangelism)

Le Groupe de Travail d'Evangélisme fait la promotion des accomplissements
de Node.js et communique sur les façons de s'impliquer.

Ses responsabilités incluent:
* Faciliter la communication au sein du projet.
* Gérer les comptes officiels du projet sur les réseaux sociaux.
* Gérer la promotion d'intervenants pour les conférences et les meetups.
* Gérer la promotion des événements communautaires.
* Publier des résumés de mises à jour réguliers et tout autre contenu promotionnel.

### [Docker](https://github.com/nodejs/docker-node)

L'objectif du Groupe de Travail de Docker est de construire, maintenir et améliorer
les images Docker officielles du projet Node.js.

Ses responsabilités incluent:
* Maintenir à jour les images officielles Docker en lien avec les releases de Node.js.
* Choisir et implémenter des améliorations et/ou des corrections sur les images.
* Maintenir et améliorer la documentation des images.

### [Addon API](https://github.com/nodejs/nan)

Le Groupe de Travaill d'Addon API est responsable de maintenir le projet NAN
et le package _nan_ correspondant sur npm. Le projet NAN met à disposition
une couche d'abstraction pour les auteurs d'add-on natifs pour Node.js,
en facilitant l'écriture de code compatible avec les versions actives de Node.js,
V8 et libuv.

Ses responsabilités incluent:
* Maintenir le dépôt GitHub [NAN](https://github.com/nodejs/nan), y compris le
  code, les tickets et la documentation.
* Maintenir le dépôt GitHub [addon-examples](https://github.com/nodejs/node-addon-examples)
  y compris le code, les tickets et la documentation.
* Maintenir l'API pour Addon C++ du projet Node.js, en coordination avec le TSC
  de Node.js
* Maintenir la documentation des Addon du projet Node.js, en coordination avec
  le TSC de Node.js
* Maintenir le package _nan_ sur npm, et publier de nouvelles versions si besoin.
* Communiquer sur le futur de Node.js et de l'interface NAN afin de prévenir
  la communauté à l'avance d'éventuels changements.

La liste des membres actuels du groupe se trouve sur leur
[README](https://github.com/nodejs/nan#collaborators).

### [Benchmarking](https://github.com/nodejs/benchmarking)

L'objectif du Groupe de Travail de Benchmark est d'arriver à un
consensus sur une ensemble de points de référence qui pourront
être utilisés pour:
* suivre et communiquer sur les gains de performance entre chaque
  version de Node.js
* éviter les régressions de performances entre les versions

Ses responsabilités incluent:
* Identifier un ou plusieurs points de référence qui reflètent
  les utilisations client.
  Cela incluera certainement plusieurs points pour couvrir
  les usages habituels de Node.js, y compris la réduction de latence
  et la concurrence élevée
* Encourager un consensus de la communauté sur la liste choisie
* Ajouter l'exécution régulière des benchmarks choisis sur les builds de 
  Node.js
* Traquer/Publier les performances des différentes versions

### [Post-mortem](https://github.com/nodejs/post-mortem)

Le Groupe de Travail des Diagnostics Post-Mortem est dédié à la maintenance
et à l'amélioration du débogage portmortem pour Node.js. Il cherche à élever
le rôle du débogage post-mortem pour Node.js, afin d'aider au développement 
d'outils et de techniques, et pour faire connaitre ces techniques et outils
auprès des utilisateurs de Node.js.

Ses responsabilités incluent:
* Définir et ajouter des interfaces/APIs pour permettre la génération
  de dumps en cas de besoin.
* Définir et ajouter des structures communes pour les dumps générés
  afin de faciliter la création d'outil d'inspection de ces dumps.

### [Release](https://github.com/nodejs/LTS)
Le Groupe de Travail de la Release gère le processus des releases de Node.js.

Ses responsabilités incluent:
* Définir le processus de release.
* Définir le contenu des releases.
* Générer et créer les releases.
* Tester les releases.
* Gérer le Support Longue Durée et les branches courantes, y compris
  le rétroportage des changements sur ces branches.
* Définir la politique de rétroportage pour les canaux de release.
