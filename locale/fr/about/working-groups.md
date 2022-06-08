---
layout: about.hbs
title: Groupes de travail
---

#Groupes de travail principaux
<!-- L'information ici devrait surtout être un miroir : https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Les groupes de travail principaux sont créés par le [Comité de pilotage technique (TSC)] (https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Groupes de travail actuels

* [Addon API](#addon-api)
* Benchmarking](#benchmarking)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [Docker](#docker)
* [Evangélisation](#évangélisation)
* [i18n](#i18n)
* [Release](#release)
* [Sécurité](#security)
* [Streams](#streams)

### [Addon API](https://github.com/nodejs/nan)

Le groupe de travail Addon API est responsable de la maintenance du projet NAN et du paquet _nan_ correspondant dans npm. Le projet NAN met à disposition une couche d'abstraction pour les auteurs de modules complémentaires natifs pour Node.js, en aidant à l'écriture de code compatible avec de nombreuses versions activement utilisées de Node.js, V8 et libuv.

Les responsabilités comprennent :

* Maintenir le dépôt GitHub de [NAN](https://github.com/nodejs/nan), y compris le code, les problèmes et la documentation.
* Maintenir le dépôt GitHub [addon-examples](https://github.com/nodejs/node-addon-examples), y compris le code, les problèmes et la documentation.
* Maintenir l'API de l'addon C++ au sein du projet Node.js, en subordination avec le TSC Node.js.
* Maintenir la documentation de l'addon au sein du projet Node.js, en subordination avec le TSC Node.js.
* Maintenir le paquet _nan_ dans npm, en publiant de nouvelles versions comme il convient.
* Communiquer sur l'avenir de l'interface Node.js et NAN afin de prévenir la communauté des changements.

Les membres actuels peuvent être trouvés dans leur [README](https://github.com/nodejs/nan#collaborators).

### [Benchmarking](https://github.com/nodejs/benchmarking)

L'objectif du groupe de travail sur les repères est d'obtenir un consensus sur un ensemble de repères pouvant être utilisés pour :

* suivre et faire connaître les gains de performance réalisés entre les versions de Node.js
* éviter les régressions de performances entre les versions

Les responsabilités incluent :

* Identifier un ou plusieurs points de référence qui reflètent l'usage des clients. Il en faudra probablement plus d'un pour couvrir les cas d'utilisation typiques de Node.js, y compris les cas de faible latence et de forte concurrence.
* Travailler pour obtenir un consensus de la communauté sur la liste choisie
* Ajouter l'exécution régulière des benchmarks choisis dans les builds de Node.js.
* Suivi et publication des performances entre les builds/release.

### [Build](https://github.com/nodejs/build)

L'objectif du groupe de travail Build est de créer et de maintenir une infrastructure d'automatisation distribuée.

Les responsabilités comprennent :

* Produire des paquets pour toutes les plateformes cibles.
* Exécution des tests.
* Exécution de tests de performance et de comparaisons.
* Création et gestion des conteneurs de construction.

### [Diagnostics](https://github.com/nodejs/diagnostics)

L'objectif du groupe de travail Diagnostics est de présenter un ensemble d'interfaces de diagnostic complètes, documentées et extensibles à utiliser par les outils Node.js et les VM JavaScript.

Les responsabilités incluent :

* Collaborer avec V8 pour intégrer `v8_inspector` dans Node.js.
* Collaborer avec V8 pour intégrer `trace_event` dans Node.js.
* Collaboration avec Core pour affiner `async_wrap` et `async_hooks`.
* Maintenir et améliorer l'intégration du système de trace OS (par exemple ETW, LTTNG, dtrace).
* Documenter les capacités de diagnostic et les API de Node.js et de ses composants.
* Explorer les opportunités et les lacunes, discuter des demandes de fonctionnalités, et traiter les conflits dans les diagnostics Node.js.
* Encourager un écosystème d'outils de diagnostic pour Node.js.
* Définir et ajouter des interfaces/API afin de permettre la génération de dumps lorsque cela est nécessaire.
* Définir et ajouter des structures communes aux dumps générés afin de supporter les outils qui veulent introspecter ces dumps.

### [Docker](https://github.com/nodejs/docker-node)

L'objectif du groupe de travail Docker est de construire, maintenir et améliorer les images Docker officielles pour le projet Node.js.

Les responsabilités incluent :

* Maintenir à jour les images Docker officielles en fonction des nouvelles versions de Node.js.
* Décider et mettre en œuvre des améliorations et/ou des corrections de l'image.
* Maintenir et améliorer la documentation des images.

### [Evangélisation](https://github.com/nodejs/evangelism)

Le groupe de travail Evangelism promeut les réalisations de Node.js et fait savoir à la communauté comment elle peut s'impliquer.

Les responsabilités incluent :

* Faciliter la messagerie du projet.
* Gérer les médias sociaux officiels du projet.
* Gérer la promotion des orateurs pour les réunions et les conférences.
* Gérer la promotion des événements de la communauté.
* Publier régulièrement des résumés de mise à jour et d'autres contenus promotionnels.

### [i18n](https://github.com/nodejs/i18n)

Les groupes de travail i18n ne se limitent pas aux traductions. Ils permettent aux membres de la communauté de collaborer les uns avec les autres dans la langue de leur choix.

Chaque équipe est organisée autour d'une langue parlée commune. Chaque communauté linguistique peut ensuite produire plusieurs localisations pour diverses ressources du projet.

Les responsabilités comprennent :

* Traduire tout matériel Node.js qu'ils estiment pertinent pour leur communauté.
* Réviser les processus pour maintenir les traductions à jour et de haute qualité.
* Gestion et suivi des médias sociaux
* Promouvoir les intervenants Node.js pour les rencontres et les conférences dans leur langue.

Chaque communauté linguistique a ses propres membres.

* [nodejs-ar - arabe (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgare (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinois (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Tchèque (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danois (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - Allemand (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Grec (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Espagnol (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persan (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnois (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - Français (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hébreu (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hongrois (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonésien (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italien (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japonais (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Géorgien (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Coréen (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macédonien (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - malais (بهاس ملايو)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Néerlandais (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norvégien (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polonais (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portugais (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Roumain (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russe (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Suédois (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamoul (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turc (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taïwanais (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainien (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamien (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Release](https://github.com/nodejs/Release)

Le groupe de travail Release gère le processus de publication de Node.js.

Les responsabilités incluent :

* Définir le processus de libération.
* Définir le contenu des versions.
* Générer et créer des versions.
* Tester les versions.
* Gérer le support à long terme et les branches actuelles, y compris les changements de backporting à ces branches.
* Définir la politique pour ce qui est rétroporté dans les flux de versions.

### [Sécurité] (https://github.com/nodejs/security-wg)

Le groupe de travail sur la sécurité gère tous les aspects et processus liés à la sécurité de Node.js.

Les responsabilités incluent :

* Définir et maintenir les politiques et procédures de sécurité pour :
  * le projet Node.js de base
  * d'autres projets maintenus par le comité de pilotage technique (TSC) de Node.js.
* Travailler avec la plate-forme de sécurité Node pour apporter les données de vulnérabilité de la communauté dans la fondation comme un actif partagé.
* S'assurer que les données de vulnérabilité sont mises à jour d'une manière efficace et opportune. Par exemple, en s'assurant qu'il existe des processus bien documentés pour signaler les vulnérabilités dans les modules communautaires.
* Examiner et recommander des processus pour le traitement des rapports de sécurité (mais pas l'administration proprement dite des rapports de sécurité, qui sont examinés par un groupe de personnes directement déléguées par le TSC).
* Définir et maintenir des politiques et des procédures pour la coordination des préoccupations de sécurité au sein de l'écosystème externe de Node.js open source.
* Offrir de l'aide aux mainteneurs de paquets npm pour corriger les bogues de sécurité à fort impact.
* Maintenir et mettre à disposition des données sur les vulnérabilités de sécurité divulguées dans :
  * le noyau du projet Node.js
  * d'autres projets maintenus par le groupe technique de la Fondation Node.js
  * l'écosystème open source externe de Node.js.
* Promouvoir l'amélioration des pratiques de sécurité au sein de l'écosystème Node.js.
* Recommander des améliorations de sécurité pour le projet Node.js de base.
* Faciliter et promouvoir l'expansion d'un écosystème sain de fournisseurs de services et de produits de sécurité.

### [Streams](https://github.com/nodejs/readable-stream)

Le groupe de travail Streams se consacre au soutien et à l'amélioration de l'API Streams telle qu'elle est utilisée dans Node.js et dans l'écosystème npm. Nous cherchons à créer une API composable qui résout le problème de la représentation de multiples occurrences d'un événement dans le temps de manière humaine et sans frais supplémentaires. Les améliorations apportées à l'API seront déterminées par les besoins de l'écosystème ; l'interopérabilité et la rétrocompatibilité avec d'autres solutions seront assurées.

Responsibilities include:

Les responsabilités comprennent :

* Résoudre les problèmes liés aux flux sur le gestionnaire de problèmes de Node.js.
* Rédiger et éditer la documentation sur les flux au sein du projet Node.js.
* Vérifier les modifications apportées aux sous-classes de flux au sein du projet Node.js.
* Rediriger les modifications apportées aux flux du projet Node.js vers ce projet.
* Aide à l'implémentation des fournisseurs de flux dans Node.js.
* Recommander des versions de `readable-stream` à inclure dans Node.js.
* Messagerie sur le futur des flux pour donner à la communauté un préavis sur les changements.
