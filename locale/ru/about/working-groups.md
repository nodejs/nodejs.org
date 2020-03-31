---
layout: about.hbs
title: Рабочие группы
---

# Основные рабочие группы
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Основные рабочие группы создаются [Техническим руководящим комитетом (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Текущие рабочие группы

* [API расширений](#addon-api)
* [Бенчмаркинг](#benchmarking)
* [Сборка](#build)
* [Диагностика](#diagnostics)
* [Docker](#docker)
* [Евангелизм](#evangelism)
* [i18n](#i18n)
* [Релиз](#release)
* [Безопасность](#security)
* [Стримы](#streams)

### [API расширений](https://github.com/nodejs/nan)

Рабочая группа API расширений отвечает за поддержку проекта NAN и соответствующего пакета _nan_ в npm. Проект NAN предоставляет уровень абстракции для авторов нативных надстроек на Node.js, помогая в написании кода, совместимого со многими активно используемыми версиями Node.js, V8 и libuv.

Обязанности:

* Maintaining the [NAN](https://github.com/nodejs/nan) GitHub repository, including code, issues and documentation.
* Поддержка [addon-examples](https://github.com/nodejs/node-addon-examples) на GitHub, включая код, проблемы и документацию.
* Поддержка C++ Addon API в проекте Node.js, в подчинении Node.js TSC.
* Maintaining the Addon documentation within the Node.js project, in subordination to the Node.js TSC.
* Maintaining the _nan_ package in npm, releasing new versions as appropriate.
* Уведомление сообщества о будущем интерфейса Node.js и NAN. Текущие члены могут быть найдены в [README](https://github.com/nodejs/nan#collaborators).

Цель рабочей группы бенчмаркинга ― добиться консенсуса по согласованному набору критериев, которые используются для:

### [Бенчмаркинг](https://github.com/nodejs/benchmarking)

Обязанности:

* отслеживания и пропагандирования изменений производительности, достигнутых между версиями Node.js
* избежания снижения производительности между версиями

Обязанности:

* Определение 1 и более ориентиров, которые отражают пользовательские потребности. Вероятнее всего, требуется более одного показателя, чтобы покрыть типичные варианты использования Node.js, включая низкую задержку и высокий параллелизм.
* Работа с целью получения согласие сообщества на выбранный список критериев.
* Добавление регулярного выполнения выбранных тестов в сборки Node.js.
* Отслеживание/публикация результатов производительности между сборками/релизами.

### [Сборка](https://github.com/nodejs/build)

Обязанности:

Обязанности:

* Создание сборок для всех целевых платформ.
* Запуск тестов.
* Выполнение тестирования производительности и их сравнения.
* Создание и управление контейнерами сборок.

### [Диагностика](https://github.com/nodejs/diagnostics)

Обязанности:

Обязанности:

* Сотрудничество с V8 для интеграции `v8_inspector` в Node.js.
* Сотрудничество с V8 для интеграции `trace_event` в Node.js.
* Сотрудничество с Core для совершенствования `async_wrap` и `async_hooks`.
* Поддержание и улучшение интеграции системы трассировки ОС (например, ETW, LTTNG, dtrace).
* Документирование диагностических возможностей и API в Node.js и его компонентах.
* Exploring opportunities and gaps, discussing feature requests, and addressing conflicts in Node.js diagnostics.
* Fostering an ecosystem of diagnostics tools for Node.js.
* Defining and adding interfaces/APIs in order to allow dumps to be generated when needed.
* Defining and adding common structures to the dumps generated in order to support tools that want to introspect those dumps.

### [Docker](https://github.com/nodejs/docker-node)

Обязанности:

Обязанности:

* Обновление официальных образов Docker в соответствии с новыми релизами Node.js.
* Решать и реализовывать улучшения образов и/или их исправления.
* Поддерживать и улучшать документацию образов.

### [Евангелизм](https://github.com/nodejs/evangelism)

Обязанности:

Обязанности:

* Упрощение коммуникации внутри проекта.
* Управление официальными социальными сетями проекта.
* Продвижение докладчиков на встречах и конференциях.
* Продвижение общественных мероприятий.
* Публикация регулярных обновлений и других рекламных материалов.

### [i18n](https://github.com/nodejs/i18n)

Каждая команда организована вокруг общего разговорного языка. Каждое языковое сообщество может создать несколько локализаций для различных ресурсов проекта.

Обязанности:

Обязанности:

* Translating any Node.js materials they believe are relevant to their community.
* Reviewing processes for keeping translations up to date and of high quality.
* Управление и мониторинг социальных сетей на их языке.
* Продвижение спикеров Node.js для встреч и конференций на их языке.

Рабочая группа по релизам управляет процессом выпусков для Node.js.

* [nodejs-ar - Арабский (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Болгарский (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Бенгали (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Китайский (中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Чешский (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Датский (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - Немецкий (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Грецкий (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Испанский (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Персидский (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Финский (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - Французский (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Иврит (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Хинди (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Венгерский (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Индонезийский (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Итальянский (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Японский (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Грузинский (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Корейский (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Македонский (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Малайский (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Голландский (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Норвежский (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Польский (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Португальский (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Румынский (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Русский (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Шведский (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Тамильский (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Турецкий (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Тайваньский (國語)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Украинский (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Вьетнамский (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Релиз](https://github.com/nodejs/Release)

Обязанности:

Обязанности:

* Определение процессов для релиза.
* Определение содержания релиза.
* Генерация и создание релизов.
* Тестовые релизы.
* Manage the Long Term Support and Current branches including backporting changes to these branches.
* Define the policy for what gets backported to release streams

### [Безопасность](https://github.com/nodejs/security-wg)

Обязанности:

Обязанности:

* Определение и контроль политики и процедуры безопасности для:
  * основного проекта Node.js
  * других проектах, поддерживаемых Техническим руководящим комитетом Node.js (TSC).
* Work with the Node Security Platform to bring community vulnerability data into the foundation as a shared asset.
* Контроль своевременного обновления данных об уязвимости. Например, обеспечение хорошо документированных процессов для сообщения об уязвимостях в модулях сообщества.
* Рассмотрение и рекомендация процессов обработки отчетов о безопасности (но не фактическое администрирование отчетов, которые проверяются группой людей, непосредственно делегированных TSC).
* Определение и контроль политики и процедуры для координации проблем безопасности во внешней экосистеме с открытым исходным кодом Node.js.
* Оказание помощи владельцам пакетов npm для исправления серьезных ошибок безопасности.
* Поддержание и предоставление данные об обнаруженных уязвимостях в:
  * основного проекта Node.js
  * других проектов, поддерживаемых технической группой Фонда Node.js.
  * внешней экосистеме с открытым исходным кодом Node.js
* Содействие улучшению практик безопасности в экосистеме Node.js.
* Рекомендации улучшений безопасности для основного проекта Node.js.
* Облегчение и содействие расширению здоровой экосистемы услуг безопасности и поставщиков продуктов.

### [Стримы](https://github.com/nodejs/readable-stream)

Обязанности:

Обязанности:

* Решение проблем с потоками на трекере проблем Node.js.
* Создание и редактирование документации потоков в рамках проекта Node.js.
* Просмотр изменений в подклассах потоков в проекте Node.js.
* Перенаправление изменений в потоки из проекта Node.js в этот проект.
* Помощь в реализации потоковых провайдеров в Node.js.
* Рекомендация версий `readable-stream` для включения в Node.js.
* Сообщения о будущем потоков, чтобы заранее уведомить сообщество об изменениях.
