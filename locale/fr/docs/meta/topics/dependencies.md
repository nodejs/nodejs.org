---
title: Dependencies
layout: docs.hbs
---

# Dépendances

Il existe plusieurs dépendances sur lesquelles Node.js s'appuie pour fonctionner comme il le fait.

* [Bibliothèques](#Bibliothèques)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [Tools](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

## Bibliothèques

### V8

La bibliothèque V8 fournit à Node.js un moteur JavaScript, que Node.js contrôle via l'API V8 C++. V8 est maintenu par Google, pour une utilisation dans Chrome.

* [Documentation](https://v8.dev/docs)

### libuv

Une autre dépendance importante est libuv, une bibliothèque C qui est utilisée pour abstraire les opérations d'E/S non bloquantes vers une interface cohérente sur toutes les plateformes prises en charge. Elle fournit des mécanismes pour gérer le système de fichiers, le DNS, le réseau, les processus enfants, les tuyaux, la gestion des signaux, l'interrogation et le streaming. Elle inclut également un pool de threads pour décharger le travail pour certaines choses qui ne peuvent pas être faites de manière asynchrone au niveau du système d'exploitation.

* [Documentation](http://docs.libuv.org/)

### llhttp

L'analyse HTTP est gérée par une bibliothèque TypeScript et C légère appelée llhttp. Elle est conçue pour ne pas effectuer d'appels système ou d'allocations, de sorte que son empreinte mémoire par requête est très faible.

* [Documentation](https://github.com/nodejs/llhttp)

### c-ares

Pour certaines requêtes DNS asynchrones, Node.js utilise une bibliothèque C appelée c-ares. Elle est exposée à travers le module DNS en JavaScript comme la famille de fonctions `resolve()`. La fonction `lookup()`, qui est ce que le reste du noyau utilise, utilise les appels threadés `getaddrinfo(3)` dans libuv. La raison en est que c-ares supporte /etc/hosts, /etc/resolv.conf et /etc/svc.conf, mais pas des choses comme mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL est largement utilisé dans les modules `tls` et `crypto`. Il fournit des implémentations éprouvées de nombreuses fonctions cryptographiques sur lesquelles le web moderne s'appuie pour la sécurité.

* [Documentation](https://www.openssl.org/docs/)

### zlib

Pour une compression et une décompression rapides, Node.js s'appuie sur la bibliothèque standard zlib, également connue pour son utilisation dans gzip et libpng. Node.js utilise zlib pour créer des interfaces de compression et de décompression sync, async et streaming.

* [Documentation](https://www.zlib.net/manual.html)

## Outils

### npm

Node.js est synonyme de modularité, ce qui implique la nécessité d'un gestionnaire de paquets de qualité ; c'est dans ce but que npm a été créé. Avec npm vient la plus grande sélection de paquets créés par la communauté de tout écosystème de programmation, ce qui rend la construction d'applications Node.js rapide et facile.

* [Documentation](https://docs.npmjs.com/)

### gyp

Le système de construction est géré par gyp, un générateur de projet basé sur python copié de V8. Il peut générer des fichiers de projet à utiliser avec des systèmes de compilation sur de nombreuses plateformes. Node.js nécessite un système de compilation parce que de grandes parties de celui-ci - et ses dépendances - sont écrites dans des langages qui nécessitent une compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

Le code natif peut être testé en utilisant gtest, qui est tiré de Chromium. Il permet de tester C/C++ sans avoir besoin d'un exécutable node existant pour démarrer.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
