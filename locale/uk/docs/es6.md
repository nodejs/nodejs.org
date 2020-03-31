---
title: ECMAScript 2015 (ES6) та вище
layout: docs.hbs
---

# ECMAScript 2015 (ES6) та вище

Node.js побудований на сучасних версіях [V8](https://v8.dev/). Ми певні в тому, що новий функціонал зі [специфікації JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) постачається Node.js–розробникам поступово, для подальшого підвищення швидкодії та стабільності, оскільки використовуємо найсвіжіші релізи цього рушія.

Весь ECMAScript 2015 (ES6) функціонал поділяється на три групи: **доставлені**, **підготовлені** та **у процесі**:

* Весь **доставлений** функціонал, який вважається у V8 стабільним, **увімкнений у Node.js за замовчуванням** і **НЕ** потребує будь–якого флага для оточення.
* **Підготовлений** функціонал, що містить майже готові нововведення, що розглядаються командою V8 як нестабільні, потребують флагу: `--harmony`.
* Функціонал **у процесі** може вмикатись окремо через власні harmony–флаги, хоча це не рекомендується, за виключенням, якщо ви звісно не тестуєте цей функціонал. Зауважте: ці флаги визначаються V8 і можуть бути змінені без будь–якого попередження.

## Який функціонал вже постачається з Node.js за замовчуванням?

Сайт [node.green](https://node.green/) надає прекрасний огляд всіх нововведень ECMAScript, що підтримуються у різних версіях Node.js, та базується на таблицях сумісності kangax.

## Який функціонал знаходиться у процесі підготовки?

Новий функціонал постійно додається у рушій V8. Взагалі кажучи очікується, що вони всі будуть підтримуватись у майбутньому релізі Node.js, хоча терміни поки невідомі.

Ви можете побачити список всього функціоналу, що знаходиться *у процесі* в кожній версії Node.js через грепінг з аргументом `--v8-options`. Майте на увазі, що цей функціонал може бути незакінченим, або зламаним функціоналом V8, тому його використання - це ваш власний ризик:

```bash
node --v8-options | grep "in progress"
```

## В мене є мої налаштування інфраструктури, що використовують флаг --harmony. Чи слід мені відмовитись від нього?

Наразі флаг `--harmony` в Node.js вмикає лише **підготовлений** функціонал. Зрештою, тепер це синонім `--es_staging`. Як згадано вище, цей функціонал є завершеним, але ще не вважається стабільним. Якщо ви хочете використовувати його безпечно, особливо на production–середовищах, краще видалити цей флаг з оточення, поки від не буде постачатись з V8 і, відповідно, у Node.js за замовчування. Якщо ви залишите його увімкненим, вам слід бути готовими до можливих оновлень Node.js, що зламають ваш код, якщо зміни у V8, їхня семантика буде більш точно відповідати стандарту.

Node.js надає простий спосіб для отримання списку залежностей та їх версій, що постачаються з певним бінарником через глобальний об’єкт `process`. У випадку з рушієм V8, введіть це в терміналі і ви отримаєте його версію:

## Як я можу дізнатись яка версія V8 постачається з певною версією Node.js?

The current behaviour of the `--harmony` flag on Node.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on Node.js. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.

## How do I find which version of V8 ships with a particular version of Node.js?

Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:

```bash
node -p process.versions.v8
```
