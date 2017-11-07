---
layout: about.hbs
title: Groupes de Travail
---
# Groupes de Travail Core
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Les Groupes de Travail Core sont créés par le
[Comité de Pilotage Technique (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Current Working Groups

* [Site Web](#site-web)
* [Flux](#flux)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [Internationalisation](#internationalisation)
* [Evangelisme](#evangelism)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Intl](#intl)
* [Release](#release)

### [Site Web](https://github.com/nodejs/nodejs.org)

L'objectif du Groupe de Travail Site Web et des construire et maintenir
un site web public pour le projet Node.js.

Ses responsabilités incluent:
* Déceloper et maintenir un système de build et d'automation pour nodejs.org
* S'assure que le site est maintenu à jour avec les changements effectués sur Node.js,
  comme les releases et les fonctionnalités.
* Permettre et abriter le développement d'une communauté de traducteurs.

### [Flux](https://github.com/nodejs/readable-stream)

Le Groupe de Travail Flux est dédié au support et à l'amélioration de l'API 
Flux telle qu'utilisée dans Node.js et dans l'écosystème npm. Nous chercherons à
créer une API composable qui résoud le problème de la représentation de multiples
occurrences d'un évènnement dans le temps de façon simple et accessible. Les
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

L'objectif du Groupe de Travail Build est de créer et maintenir une infrastructure
d'automation distribuée.

Ses responsabilités incluent:
* Produire des packages pour toutes les plateformes cibles.
* Effectuer des tests.
* Effectuer des tests de performances et des comparaisons.
* Créer et manager les conteneurs de build.

### [Diagnostics](https://github.com/nodejs/diagnostics)

L'objectif du Groupe de Travail Diagnostics est de présenter un ensemble complet,
documenté, et extensible d'interfaces de diagnostic utilisables avec les outils Node.js
et les machines virtuelles JavaScript.

Ses responsabilités incluent:
* Collaborer avec V8 pour intégrer `v8_inspector` dans Node.js.
* Collaborer avec V8 pour intégrer `trace_event` dans Node.js.
* Collaborer avec Core pour affiner `async_wrap` et `async_hooks`.
* Maintenir et améliorer l'intégration des système de trace des systèmes d'eploitation
  (ex. ETW, LTTNG, dtrace).
* Explorer les opportunités et failles, discuter des demandes d'amélioration, et
  résoudre les conflits dans les diagnotics de Node.js.
* Développer un écosystème d'outils de diagnostic pour Node.js.

### Internationalisation

Les Groupes de Travail Internationalisation (`i18n`) gère plus que les traductions.
Ils sont les points d'accès qui permettent aux membres de la communauté de 
collaborer dans la langue de leur choix.

Chaque équipe est organisée autour d'un langage parlé commun. Chaque
communauté de langage peut produire des localisations pour de 
nombreuses ressources de projet.

Leurs responsabilités incluent:
* Traduire tout le matériel Node.js qui leur parait pertinent pour leur
  communauté.
* Réviser les processus à même de maintenir les traductions à jour et fidèles.
* Gérer et monitorer les canaux et réseaux sociaux dans leur langue.
* Faire la promotion d'intervenants Node.js pour les meetups et conférences
  dans leur langue.

Veuillez noter que les Groupes de Travail Internationalisation sont séparés
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

Le Groupe de Travail Intl est dédié au support et à l'amélioration de
l'Internationalisation (i18n) et de la Localisation (l10n) dans Node.

Ses responsabilités incluent:
* Assurer le fonctionnement et la conformité (standards: ECMA, Unicode…)
* Assurer le support sur les tickets de Globalisation et d'Internationalisation
  ouverts dans le tracker
* Fournir une orientation et communiquer sur les bonnes practiques
* Affiner l'implémentation actuelle d'`Intl`

Le Groupe de Travail Intl n'est pas responsable de la traduction du contenu. Ceci
relève de la responsabilité des groupes [i18n](#i18n) de chaque langue.

### [Evangelisme](https://github.com/nodejs/evangelism)

Le Groupe de Travail Evangélisme fait la promotion des accomplissements
de Node.js et communique sur les façons de s'impliquer.

Ses responsabilités incluent:
* La facilitation de la communication du projet.
* La gestion des comptes officiels du projet sur les réseaux sociaux.
* La gestion de la promotion des intérevenants en conférence et meetups.
* La gestion de la promotion des événements communautaires.
* La publication régulière de résumés de mises à jour et tout autre contenu
  promotionnel.

### [Docker](https://github.com/nodejs/docker-node)

L'objectif du Groupe de Travail Docker est de construire, maintenir et améliorer
les images Docker officielles du projet Node.js.

Ses responsabilités incluent:
* Maintenir à jour les images officielles Docker en lien avec les sorties Node.js.
* Choisir et implémenter des améliorations et/ou des corrections sur les images.
* Maintenir et améliorer la documentation des images.

### [Addon API](https://github.com/nodejs/nan)

Le Groupe de Travaill Addon API est responsable de la maintenance du projet NAN
et du package _nan_ correspondant sur npm. Le projet NAN met à disposition
une couche d'abstraction pour les auteurs d'add-on natifs pour Node.js,
en aidant à l'écriture de code compatible avec les versions actives de Node.js,
V8 et libuv.

Ses responsabilités incluent:
* Maintenir le dépôt GitHub [NAN](https://github.com/nodejs/nan), y compris le
  code, les tickets et la documentation.
* maintenir le dépôt GitHub [addon-examples](https://github.com/nodejs/node-addon-examples)
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

L'objectif du Groupe de Travail Benchmark est d'arriver à un
consensus sur une ensemble de points de référence qui pourront
être utilisés pour:
* suivre et communiquer sur les gains de performance entre chaque
  version de Node.js
* éviter les régressions de performances entre les versions

Ses responsabilités incluent:
* Identifier un ou plusieurs points de référence qui reflètent
  les utilisations client.
  Celà incluera certainement plusieurs points pour couvrir
  les usages habituels de Node.js, y compris la réduction de latence
  et la concurrence élevée
* Travailler pour obtenir un consensus communautaire sur la liste
  choisie
* Aider à l'exécution régulière des benchmarks choisis sur les builds
  Node.js
* Traquer/Communiquer sur les performances des différentes versions

### [Post-mortem](https://github.com/nodejs/post-mortem)

Le Groupe de Travail de Diagnostic Post-Mortem est dédié à la maintenance
et à l'amélioration du débuggage portmortem pour Node.js. Il cherche
l'augmentation du rôle du débug postmortel pour Node.js, afin d'aider
au développement d'outils et de techniques, et pour faire connaitre ces
techniques et outils auprès des utilisateurs de Node.js.

Ses responsabilités incluent:
* Définir et ajouter des interfaces/APIs pour permettre la génération
  de dumps en cas de besoin.
* Définir et ajouter des structures communes pour les dumps générés
  afin de faciliter la création d'outil d'inspection de ces dumps.

### [Release](https://github.com/nodejs/LTS)
Le Groupe de Travail Release gère le processus de publication de version
de Node.js.

Ses responsabilités incluent:
* Définir le processus de release.
* Définir le contenu des releases.
* Générer et créer les releases.
* Tester les releases.
* Gérer le Support Longue Durée et les branches courrantes, y compris
  le rétroportage des changements sur ces branches.
* Définir la politique de rétroportage pour les canaux de release.
