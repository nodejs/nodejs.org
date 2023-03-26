---
title: ECMAScript 2015 (ES6) et au-delà
layout: docs.hbs
---

# ECMAScript 2015 (ES6) et au-delà

Node.js est construit avec les versions modernes de [V8](https://v8.dev/). En se tenant au courant des dernières versions de ce moteur, nous nous assurons que de nouvelles fonctionnalités de la spécification [JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) sont apportées à Node. , les développeurs en temps opportun, ainsi que des améliorations continues des performances et de la stabilité.

Toutes les fonctionnalités de l'ECMAScript 2015 (ES6) sont divisées en trois groupes pour les fonctionnalités de **livraison**, **mise en scène**et **en cours**:

* Toutes les fonctionnalités **de livraison** que V8 considère comme stables sont activées **par défaut sur Node. s** et **PAS** ne requièrent aucune sorte d'indicateur de temps d'exécution.
* **Les** fonctionnalités stationnées, qui sont des fonctionnalités presque achevées qui ne sont pas considérées comme stables par l'équipe V8, nécessitent un drapeau d'exécution : `--harmonie`.
* **En cours** les fonctionnalités peuvent être activées individuellement par leur drapeau d'harmonie respectif, bien que cela soit fortement découragé à moins de procéder à des essais. Note : ces drapeaux sont exposés par V8 et peuvent être modifiés sans avis de dépréciation.

## Quelles fonctionnalités sont fournies avec lesquelles la version de Node.js par défaut ?

Le site web [node.green](https://node.green/) fournit un excellent aperçu des fonctionnalités de l'ECMAScript supportées dans diverses versions de Node.js, basé sur la table compat de kangax.

## Quelles sont les fonctionnalités en cours ?

De nouvelles fonctionnalités sont constamment ajoutées au moteur V8. En général, attendez-vous à ce qu'elles atterrissent sur une future version de Node.js, bien que le timing soit inconnu.

Vous pouvez lister toutes les fonctionnalités de *en cours* disponibles sur chaque noeud. s en utilisant l'argument `--v8-options` . Veuillez noter que ce sont des fonctionnalités incomplètes et éventuellement cassées de V8, donc utilisez-les à vos propres risques :

```bash
node --v8-options | grep "in progress"
```

## J'ai mis en place mon infrastructure pour tirer parti du drapeau --harmonie. Dois-je le retirer ?

Le comportement actuel du drapeau `--harmony` sur Node.js est d'activer les fonctionnalités **staged** uniquement. Après tout, c'est maintenant un synonyme de `--es_staging`. Comme mentionné ci-dessus, ces fonctionnalités sont complétées qui n'ont pas encore été considérées comme stables. Si vous voulez jouer en toute sécurité, en particulier dans les environnements de production, envisagez de supprimer ce drapeau d'exécution jusqu'à ce qu'il soit livré par défaut sur V8 et, par conséquent, sur Node.js. Si vous gardez cette option activée, vous devriez être préparé pour d'autres nœuds. s améliore pour casser votre code si V8 modifie leur sémantique pour suivre plus attentivement le standard.

## Comment trouver quelle version de V8 est fournie avec une version particulière de Node.js ?

Node.js fournit un moyen simple de lister toutes les dépendances et leurs versions respectives qui sont livrées avec un binaire spécifique grâce à l'objet global `process`. Dans le cas du moteur V8, tapez ce qui suit dans votre terminal pour récupérer sa version :

```bash
node -p process.versions.v8
```
