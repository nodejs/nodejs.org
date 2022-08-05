---
title: Comment créer un serveur HTTPS ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - https
difficulty: 1
layout: knowledge-post.hbs
---

Pour créer un serveur HTTPS, vous avez besoin de deux choses : un certificat SSL, et le module intégré `https` de Node.js.

Nous devons commencer par un mot sur les certificats SSL. D'une manière générale, il existe deux types de certificats : ceux signés par une "autorité de certification", ou CA, et les "certificats auto-signés". Une autorité de certification est une source de confiance pour un certificat SSL, et l'utilisation d'un certificat d'une CA permet à vos utilisateurs de faire confiance à l'identité de votre site Web. Dans la plupart des cas, il est préférable d'utiliser un certificat signé par une autorité de certification dans un environnement de production. Toutefois, à des fins de test, un certificat auto-signé fera parfaitement l'affaire.

Pour générer un certificat auto-signé, exécutez ce qui suit dans votre shell :

```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

Cela devrait vous laisser avec deux fichiers, `cert.pem` (le certificat) et `key.pem` (la clé privée). Mettez ces fichiers dans le même répertoire que votre fichier serveur Node.js. C'est tout ce dont vous avez besoin pour une connexion SSL. Vous avez maintenant mis en place un exemple rapide de "hello world" (la plus grande différence entre https et [http](/fr/knowledge/HTTP/servers/how-to-create-a-HTTP-server/) est le paramètre `options`) :

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);
```

NODE PRO TIP : Notez `fs.readFileSync` - contrairement à `fs.readFile`, `fs.readFileSync` va bloquer le processus entier jusqu'à ce qu'il soit terminé. Dans des situations comme celle-ci - chargement de données de configuration vitales - les fonctions `sync` sont correctes. Cependant, dans un serveur occupé, l'utilisation d'une fonction synchrone pendant une requête obligera le serveur à traiter les requêtes une par une !

> Pour démarrer votre serveur https, exécutez `node app.js` (ici, app.js est le nom du fichier) sur le terminal.

Maintenant que votre serveur est configuré et démarré, vous devriez être en mesure d'obtenir le fichier avec curl :

```
curl -k https://localhost:8000
```

ou dans votre navigateur, en allant sur https://localhost:8000 .
