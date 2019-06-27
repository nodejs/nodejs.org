---
title: Как прочесть файл в node.js?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 2
layout: knowledge-post.hbs
---

<!-- Reading the contents of a file into memory is a very common programming task, and, as with many other things, the Node.js core API provides methods to make this trivial.  There are a variety of file system methods, all contained in the `fs` module.  The easiest way to read the entire contents of a file is with `fs.readFile`, as follows: -->
Чтение содержимого файла - очень распространенная задача программирования, и, как и для многих других вещей, базовый API Node.js предоставляет методы, позволяющие упростить эту задачу. Существует множество методов файловой системы, все они содержатся в модуле `fs`. Самый простой способ прочитать все содержимое файла, это с помощью `fs.readFile`. Выглядит это следующим образом:

    fs = require('fs');
    fs.readFile(file, [encoding], [callback]);

    // file = (string) путь до файла, который нужно прочитать

<!-- `encoding` is an optional parameter that specifies the type of encoding to read the file. Possible encodings are 'ascii', 'utf8', and 'base64'. If no encoding is provided, the default is `null`. -->
`encoding` это необязательный параметр, который указывает тип кодировки, с которой будет прочитан файл. Возможные кодировки: 'ascii', 'utf8' и 'base64'. Если кодировка не указана, по умолчанию используется значение `null`.

<!-- `callback` is a function to call when the file has been read and the contents are ready - it is passed two arguments, `error` and `data`.  If there is no error, `error` will be `null` and `data` will contain the file contents; otherwise `err` contains the error message. -->
`callback` - это функция, которая вызывается, когда файл был прочитан и содержимое готово - ей передается два аргумента,` error` и `data`. Если ошибки нет, `error` будет иметь значение` null`, а `data` будет содержать содержимое файла; иначе `err` содержит сообщение об ошибке.

<!-- So if we wanted to read `/etc/hosts` and print it to stdout (just like UNIX `cat`): -->
Поэтому, если мы хотим прочитать `/etc/hosts` и вывести его в stdout (точно так же, как `cat` в UNIX):

    fs = require('fs')
    fs.readFile('/etc/hosts', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });

<!-- The contents of `/etc/hosts` should now be visible to you, provided you have permission to read the file in the first place. -->
Содержимое `/etc/hosts` теперь должно быть видно вам, но при условии, что у вас есть разрешение на чтение файла.

<!-- Let's now take a look at an example of what happens when you try to read an invalid file - the easiest example is one that doesn't exist. -->
Давайте теперь рассмотрим пример того, что происходит, когда вы пытаетесь прочитать недопустимый файл - самый простой пример - это тот файл, которого не существует.

    fs = require('fs');
    fs.readFile('/несуществующий/файл', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });

<!-- This is the output: -->
Это вывод:

    { stack: [Getter/Setter],
      arguments: undefined,
      type: undefined,
      message: 'ENOENT, No such file or directory \'/несуществующий/файл\'',
      errno: 2,
      code: 'ENOENT',
      path: '/несуществующий/файл' }

<!-- This is a basic Node.js [Error object](/what-is-the-error-object) - it can often be useful to log `err.stack` directly, since this contains a stack trace to the location in code at which the Error object was created. -->
Это базовый [Объект ошибки](/what-is-the-error-object) Node.js - часто может быть полезно вызывать `err.stack` напрямую, поскольку он содержит трассировку стека до места в коде, в котором был создан Объект ошибки.
