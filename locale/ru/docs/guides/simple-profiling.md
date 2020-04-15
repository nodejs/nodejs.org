---
title: Простое профилирование Node.js приложений
layout: docs.hbs
---

# Простое профилирование Node.js приложений

Для профилирования приложений Node.js доступно множество сторонних инструментов,
но во многих случаях проще всего использовать встроенный профайлер Node.js.
Встроенный профайлер использует [профайлер V8][], который делит стек
выполняющейся программы на фрагменты через равные промежутки времени. Профайлер
представляет результаты этих фрагментов с учетом оптимизаций, таких как
Jit-компиляция, в виде ряда тиков:

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```

В прошлом требовался бы исходный код V8, чтобы иметь возможность анализировать
тики. К счастью, начиная с Node.js 4.4.0 были представлены инструменты, которые
облегчают использование этой информации без отдельной сборки V8. Давайте посмотрим,
как встроенный профайлер дает представление о производительности приложений.

Возьмем простое приложением Express, чтобы проиллюстрировать использование профайлера.
Приложение будет иметь два обработчика, один из которых будет использоваться для
добавления новых пользователей в систему:

```javascript
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = { salt, hash };

  res.sendStatus(200);
});
```

а другой - для проверки аутентификации пользователей:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});
```

*Обратите внимание, что это НЕ рекомендуемые обработчики для аутентификации
пользователей в приложениях Node.js. Они используются исключительно в качестве
примера. В целом, не следует пытаться разработать свои собственные механизмы
криптографической аутентификации. Гораздо лучше использовать готовые проверенные
решения.*

Теперь предположим, что мы развернули наше приложение, и пользователи жалуются
на высокую задержку запросов. Мы можем легко запустить приложение с помощью
встроенного профайлера:

```
NODE_ENV=production node --prof app.js
```

и добавить нагрузку на сервер с помощью `ab` (ApacheBench):

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

и получить на выходе:

```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```

По выводу видно, что обрабатывается только около 5 запросов в секунду, и в среднем
занимает чуть менее 4 секунд в обе стороны. В реальной ситуации могло бы
последовать еще множество вычислений от имени пользовательского запроса, но даже
в нашем простом примере могут возникать временные потери как при компиляции
регулярных выражений, генерации случайных солей и хешей из паролей пользователей,
так и внутри самого фреймворка Express.

Так как мы запустили приложение, используя опцию `--prof`, тиковый файл был
сгенерирован в том же каталоге, откуда приложение было запущено. Он должен быть
вида `isolate-0xnnnnnnnnnnnn-v8.log` (где `n` - цифра).

Чтобы разобраться в этом файле, используйте тиковый процессор в комплекте с двоичным
файлом Node.js. Чтобы запустить процессор, используйте флаг `--prof-process`:

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

Открыв обработанный текст в вашем любимом текстовом редакторе, вы увидите различного
вида информацию. Файл разбит на секции, которые разбиты по языкам. Взглянем сначала
на итоговый раздел:

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```

Это говорит нам о том, что 97% всех собранных замеров происходили в коде C++, 
и что при просмотре других разделов обработанного вывода мы должны уделять 
больше внимания работе, выполняемой именно в C++ (а не, к примеру, JavaScript). 
Имея это в виду, мы затем находим раздел [C++], который содержит информацию о том, 
какие функции C++ отнимают больше всего процессорного времени, и видим:

```
 [C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

Мы видим, что на первые три записи приходится 72,1% процессорного времени, 
используемого программой. Мы также сразу видим, что как минимум 51,8% 
процессорного времени занято функцией PBKDF2, которая соответствует нашей 
генерации хеш-кода из пароля пользователя. Тем не менее, может быть 
не сразу очевидно, как две нижние записи влияют на наше приложение 
(если же вы догадываетесь об этом, мы притворимся, что это не очевидно, в целях примера). 
Чтобы лучше понять взаимосвязь между этими функциями, мы обратимся затем к 
разделу [Bottom up (heavy) profile], который предоставляет информацию о том,
где чаще всего вызывается каждая функция. Исследуя этот раздел, мы находим:

```
   ticks parent  name
  19557   51.8%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
  19557  100.0%    v8::internal::Builtins::~Builtins()
  19557  100.0%      LazyCompile: ~pbkdf2 crypto.js:557:16

   4510   11.9%  _sha1_block_data_order
   4510  100.0%    LazyCompile: *pbkdf2 crypto.js:557:16
   4510  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30

   3165    8.4%  _malloc_zone_malloc
   3161   99.9%    LazyCompile: *pbkdf2 crypto.js:557:16
   3161  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30
```

Анализ этого раздела требует немного больше работы, чем простой подсчет тиков как выше. 
В каждом из вышеприведенных стеков вызовов процент в родительском столбце показывает 
процент выборок, для которых функция в строке выше была вызвана функцией в текущей строке. 
Например, в среднем стеке для _sha1_block_data_order мы видим, 
что вызов `_sha1_block_data_order` встречался в 11,9% выборок, что мы и так знали 
исходя из подсчетов выше. Однако теперь мы также можем сказать, 
что он всегда вызывался функцией pbkdf2 внутри модуля crypto Node.js. Мы видим, 
что аналогичным образом `_malloc_zone_malloc` вызывалась практически всегда 
той же функцией pbkdf2. Таким образом, используя информацию в этом представлении, 
мы можем сказать, что наше вычисление хеша из пароля пользователя составляет 
не только указанные 51,8%, а все процессорное время в 3 самых часто вызываемых функциях, 
так как вызовы `_sha1_block_data_order` и `_malloc_zone_malloc` были сделаны 
от имени функции pbkdf2.

Теперь становится ясно, что целью нашей оптимизации должна быть генерация хеша на основе пароля. 
К счастью, вы полностью усвоили [преимущества асинхронного программирования][] 
и понимаете, что работа по генерации хеша выполняется синхронно 
и, таким образом, связывает цикл обработки событий. Это лишает нас возможности работать с 
другими входящими запросами во время вычисления хеша.

Чтобы устранить эту проблему, внесем небольшую модификацию в наши обработчики, 
используя асинхронную версию функции pbkdf2:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
    if (users[username].hash.toString() === hash.toString()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});
```

В результате нового запуска теста ab для асинхронной версии приложения 
получаем результат:

```
Concurrency Level:      20
Time taken for tests:   12.846 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    19.46 [#/sec] (mean)
Time per request:       1027.689 [ms] (mean)
Time per request:       51.384 [ms] (mean, across all concurrent requests)
Transfer rate:          3.82 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (longest request)
```

Ура! Наше приложение теперь обрабатывает около 20 запросов в секунду, 
что примерно в 4 раза больше, чем при синхронном генерировании хешей. 
Кроме того, средняя задержка снизилась с 4 секунд 
до чуть более 1 секунды.

Надеемся, что благодаря разбору производительности этого 
(заведомо надуманного) примера вы увидели, как тиковый процессор 
V8 может дать вам лучшее понимание производительности ваших приложений Node.js.

[профайлер V8]: https://v8.dev/docs/profile
[преимущества асинхронного программирования]: https://nodesource.com/blog/why-asynchronous
