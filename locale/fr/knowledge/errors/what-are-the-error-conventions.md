---
title: Quelles sont les conventions d'erreur ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - conventions
difficulty: 1
layout: knowledge-post.hbs
---

Dans Node.js, il est considéré comme une pratique standard de gérer les erreurs dans les fonctions asynchrones en les retournant comme premier argument du callback de la fonction courante. S'il y a une erreur, le premier paramètre reçoit un objet `Error` avec tous les détails. Sinon, le premier paramètre est nul.

C'est plus simple qu'il n'y paraît, faisons une démonstration.

```javascript
var isTrue = function(value, callback) {
  if (value === true) {
    callback(null, "Value was true.");
  }
  else {
    callback(new Error("Value is not true!"));
  }
}

var callback = function (error, retval) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(retval);
}

// Remarque : lorsque vous appelez deux fois la même fonction asynchrone de cette manière, vous vous trouvez dans une situation de course.
// Vous n'avez aucun moyen de savoir avec certitude quel callback sera appelé en premier lorsque vous appelez les fonctions de cette manière.

isTrue(false, callback);
isTrue(true, callback);
```

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'Value is not true!' }
Value was true.
```

Comme vous pouvez le voir dans l'exemple, la callback est appelée avec null comme premier argument s'il n'y a pas d'erreur. En revanche, s'il y a une erreur, vous créez un objet `Error`, qui devient alors le seul paramètre de la callback.

La fonction `callback` en montre la raison : elle permet à l'utilisateur de savoir facilement si une erreur s'est produite ou non. Si `null` n'était pas le premier argument passé lors d'un succès, l'utilisateur devrait vérifier l'objet retourné et déterminer lui-même s'il s'agit ou non d'une erreur - une approche beaucoup plus complexe et moins conviviale.

Donc, pour résumer, lorsque vous utilisez des callbacks, si une erreur survient, passez-la comme premier argument. Sinon, passez d'abord `null`, et ensuite vos arguments de retour. A la réception, dans la fonction de callback, vérifiez si le premier paramètre n'est pas nul ; si c'est le cas, traitez-le comme une erreur.
