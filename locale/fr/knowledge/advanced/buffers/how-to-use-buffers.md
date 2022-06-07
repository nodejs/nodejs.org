---
title: Comment utiliser les tampons dans Node.js ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - Buffer
  - buffer
  - buffers
  - binary
difficulty: 3
layout: knowledge-post.hbs
---

## Pourquoi Les tampons ?

Pure JavaScript, bien qu'excellent avec les chaînes codées en unicode, ne gère pas très bien les données binaires. C'est très bien sur le navigateur, où la plupart des données sont sous forme de chaînes de caractères. Cependant, les serveurs Node.js doivent également gérer des flux TCP et lire et écrire dans le système de fichiers, ce qui nécessite de traiter des flux de données purement binaires.

Une façon de gérer ce problème est d'utiliser des chaînes de caractères *de toute façon*, ce qui est exactement ce que Node.js a fait au début. Cependant, cette approche est extrêmement problématique : elle est lente, vous oblige à travailler avec une API conçue pour les chaînes de caractères et non pour les données binaires, et a tendance à se briser de manière étrange et mystérieuse.

N'utilisez pas de chaînes binaires. Utilisez plutôt des *buffers* !

## Que sont les tampons ?

La classe `Buffer` de Node.js est conçue pour gérer des données binaires brutes. Chaque tampon correspond à de la mémoire brute allouée en dehors de V8. Les tampons agissent un peu comme des tableaux d'entiers, mais ne sont pas redimensionnables et ont tout un tas de méthodes spécifiques aux données binaires. Les entiers d'un tampon représentent chacun un octet et sont donc limités aux valeurs de 0 à 255 inclus. En utilisant `console.log()` pour imprimer l'instance `Buffer`, vous obtiendrez une chaîne de valeurs en valeurs hexadécimales.

## Où vous voyez des tampons :

Dans la nature, les tampons sont généralement vus dans le contexte de données binaires provenant de flux, comme `fs.createReadStream`.

## Utilisation :

### Créer des tampons :

Il y a plusieurs façons de créer de nouveaux tampons :

```js
const buffer = Buffer.alloc(8);
// Cela imprimera 8 octets de zéro :
// <Buffer 00 00 00 00 00 00 00 00>
```

This buffer is initialized and contains 8 bytes of zero.

```js
const buffer = Buffer.from([8, 6, 7, 5, 3, 0, 9]);
// Cela va imprimer 8 octets de certaines valeurs :
// <Buffer 08 06 07 05 03 00 09>
```

This initializes the buffer to the contents of this array. Keep in mind that the contents of the array are integers representing bytes.

```js
const buffer = Buffer.from("I'm a string!", 'utf-8');
// Cela va imprimer une chaîne de valeurs en utf-8 :
// <Buffer 49 27 6d 20 61 20 73 74 72 69 6e 67 21>
```

Ceci initialise le tampon à un encodage binaire de la première chaîne comme spécifié par le second argument (dans ce cas, `'utf-8'`). `'utf-8'` est de loin l'encodage le plus commun utilisé avec Node.js, mais `Buffer` en supporte d'autres. Voir [Supported Encodings](https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_buffers_and_character_encodings) pour plus de détails.

### Écriture dans les tampons

Étant donné qu'il y a déjà un tampon créé :

```
> var buffer = Buffer.alloc(16)
```

Nous pouvons commencer à y écrire des chaînes de caractères :

```
> buffer.write("Hello", "utf-8")
5
```

Le premier argument de `buffer.write` est la chaîne à écrire dans le tampon, et le second argument est l'encodage de la chaîne. Il se trouve que la valeur par défaut est utf-8, donc cet argument n'est pas nécessaire.

`buffer.write` renvoie 5. Cela signifie que nous avons écrit dans cinq octets du tampon. Le fait que la chaîne de caractères "Hello" fasse aussi 5 caractères est une coïncidence, puisque chaque caractère est de 8 bits chacun. Ceci est utile si vous voulez compléter le message :

```
> buffer.write(" world!", 5, "utf-8")
7
```

Quand `buffer.write` a 3 arguments, le deuxième argument indique un offset, ou l'index du tampon pour commencer à écrire.

#### Lecture de tampons :

#### toString :

La façon la plus courante de lire des tampons est probablement d'utiliser la méthode `toString`, puisque de nombreux tampons contiennent du texte :

```
> buffer.toString('utf-8')
'Hello world!\u0000�k\t'
```

Encore une fois, le premier argument est l'encodage. Dans ce cas, on peut voir que la totalité du tampon n'a pas été utilisée ! Heureusement, comme nous savons combien d'octets nous avons écrit dans le tampon, nous pouvons simplement ajouter d'autres arguments pour "stringifier" la tranche qui est réellement intéressante :

```
> buffer.toString("utf-8", 0, 12)
'Hello world!'
```

#### Octets individuels :

Vous pouvez également définir des octets individuels en utilisant une syntaxe de type tableau :

```
> buffer[12] = buffer[11];
33
> buffer[13] = "1".charCodeAt();
49
> buffer[14] = buffer[13];
49
> buffer[15] = 33
33
> buffer.toString("utf-8")
'Hello world!!11!'
```

Dans cet exemple, j'ai défini les octets restants, à la main, de manière à ce qu'ils représentent les caractères " !" et "1" codés en utf-8.

### Plus de plaisir avec les tampons

#### Buffer.isBuffer(objet)

Cette méthode vérifie si `objet` est un tampon, de façon similaire à `Array.isArray`.

#### Buffer.byteLength(string, encodage)

Avec cette fonction, vous pouvez vérifier le nombre d'octets nécessaires pour encoder une chaîne de caractères avec un encodage donné (qui est par défaut utf-8). Cette longueur n'est *pas* la même que la longueur de la chaîne, car de nombreux caractères nécessitent plus d'octets pour être encodés. Par exemple :

```
> var snowman = "☃";
> snowman.length
1
> Buffer.byteLength(snowman)
3
```

Le bonhomme de neige unicode n'est qu'un caractère, mais il faut 3 octets entiers pour le coder !

#### buffer.length

Il s'agit de la longueur de votre tampon, et représente la quantité de mémoire allouée. Ce n'est pas la même chose que la taille du contenu du tampon, car un tampon peut être à moitié rempli. Par exemple :

```
> var buffer = Buffer.alloc(16)
> buffer.write(snowman)
3
> buffer.length
16
```

Dans cet exemple, le contenu écrit dans le tampon ne comprend que trois groupes (puisqu'ils représentent le bonhomme de neige à un seul caractère), mais la longueur du tampon est toujours de 16, comme il a été initialisé.

#### buffer.copy(target, targetStart=0, sourceStart=0, sourceEnd=buffer.length)

`buffer.copy` permet de copier le contenu d'un tampon sur un autre. Le premier argument est le tampon cible sur lequel copier le contenu de `buffer`, et le reste des arguments permet de copier seulement une sous-section du tampon source vers quelque part au milieu du tampon cible. Par exemple :

```
> var frosty = Buffer.alloc(24)
> var snowman = Buffer.from("☃", "utf-8")
> frosty.write("Happy birthday! ", "utf-8")
16
> snowman.copy(frosty, 16)
3
> frosty.toString("utf-8", 0, 19)
'Happy birthday! ☃'
```

Dans cet exemple, j'ai copié le tampon "snowman", qui contient un caractère de 3 octets de long, dans le tampon "frosty", dans lequel j'avais écrit sur les 16 premiers octets. Comme le caractère "snowman" a une longueur de 3 octets, le résultat occupe 19 octets du tampon.

#### buffer.slice(start, end=buffer.length)

L'API de cette méthode est généralement la même que celle de `Array.prototype.slice`, mais avec une différence très importante : La tranche n'est **pas** un nouveau tampon et référence simplement un sous-ensemble de l'espace mémoire. *Modifier la tranche modifiera également le tampon original* ! Par exemple :

```
> var puddle = frosty.slice(16, 19)
> puddle.toString()
'☃'
> puddle.write("___")
3
> frosty.toString("utf-8", 0, 19)
'Happy birthday! ___'
```

Maintenant Frosty a été transformé en une flaque d'underscores. C'est dommage.
