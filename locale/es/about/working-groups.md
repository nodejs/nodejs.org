---
layout: about.hbs
title: Grupos de Trabajo
---

# Grupos de Trabajo Centrales
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Los Grupos de trabajo centrales son creados por el [Comité de Dirección Técnica (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Grupos de Trabajo Actuales

* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [Docker](#docker)
* [Evangelism](#evangelism)
* [i18n](#i18n)
* [Release](#release)
* [Security](#security)
* [Streams](#streams)

### [Addon API](https://github.com/nodejs/nan)

El Grupo de Trabajo Addon API es responsable de mantener el proyecto NAN y su paquete _nan_ correspondiente en npm. El proyecto NAN pone a disposición una capa de abstracción para los autores de complementos nativos para Node.js, ayudando a escribir código que sea compatible con muchas versiones usadas activamente de Node.js, V8 y libuv.

Responsabilidades que incluye:

* Mantener el repositorio [NAN](https://github.com/nodejs/nan) en GitHub, incluyendo el código, los issues y la documentación.
* Mantener el repositorio de ejemplos [addon-examples](https://github.com/nodejs/node-addon-examples) de GitHub, incluyendo el código, los issues y documentación.
* Mantener la API C++ Addon dentro del proyecto Node.js, en subordinación al Node.js TSC.
* Mantener la documentación de Addon dentro del proyecto Node.js, en subordinación al Node.js TSC.
* Mantener el paquete nan en npm, lanzando nuevas versiones según corresponda.
* Intercambiar mensajes sobre el futuro de Node.js y la interface NAN para comunicar a la comunidad con anticipación los avances y cambios.

Los miembros actuales se pueden encontrar en el archivo [README](https://github.com/nodejs/nan#collaborators).

### [Benchmarking](https://github.com/nodejs/benchmarking)

El propósito del Grupo de Trabajo Benchmark es lograr un consenso sobre un conjunto acordado de puntos de referencia o benchmarks que se pueden utilizar para:

* Rastrear y evangelizar las mejoras de rendimiento realizadas entre las versiones de Node.js.
* Evitar regresiones de rendimiento entre versiones.

Responsabilidades que incluye:

* Identificar 1 o más benchmarks o puntos de referencia que reflejen el uso del cliente. Probablemente necesitará más de uno para cubrir los casos de uso típicos de Node.js, incluida baja latencia y alta concurrencia.
* Trabajar para lograr el consenso de la comunidad en la lista elegida.
* Incorporar de form regular la ejecución de benchmarks o puntos de referencia elegidos a las compilaciones de Node.js.
* Seguimiento/divulgación del rendimiento entre compilaciones/releases

### [Build](https://github.com/nodejs/build)

El propósito del Grupo de Trabajo Build es crear y mantener una infraestructura de automatización distribuida.

Responsabilidades que incluye:

* Producir paquetes para todas las plataformas.
* Ejecutar de pruebas.
* Ejecutar de pruebas de rendimiento y comparaciones.
* Crear y gestionar contenedores de compilación.

### [Diagnostics](https://github.com/nodejs/diagnostics)

El propósito del Grupo de Trabajo Diagnostics es mostrar un conjunto de interfaces de diagnóstico integrales, documentadas y extensibles para el uso de las herramientas de Node.js y las máquinas virtuales de JavaScript.

Responsabilidades que incluye:

* Colaborar con V8 para integrar `v8_inspector` en Node.js.
* Colaborar con V8 para integrar `trace_event` en Node.js.
* Colaborar con Core para refinar `async_wrap` y `async_hooks`.
* Mantener y mejorar la integración del sistema de traza del sistema operativo (por ejemplo, ETW, LTTNG, dtrace).
* Documentar capacidades de diagnóstico y API en Node.js y sus componentes.
* Explorar oportunidades y brechas, discutir solicitudes sobre características y abordar conflictos en los diagnósticos de Node.js.
* Fomentar un ecosistema de herramientas de diagnóstico para Node.js.
* Definir y agregar interfaces/API para permitir que se generen volcados cuando sea necesario.
* Definir y agregar estructuras comunes a los volcados generados con el fin de dar soporte a herramientas que deseen inspeccionar esos volcados.

### [Docker](https://github.com/nodejs/docker-node)

El propósito del Grupo de Trabajo Docker es construir, mantener y mejorar las imágenes oficiales de Docker para el proyecto Node.js.

Responsabilidades que incluye:

* Mantener las imágenes oficiales de Docker actualizadas en línea con los nuevos lanzamientos de Node.js.
* Decidir e impolementar mejoras y/o correcciones en las imágenes.
* Mantener y mejorar la documentación de las imágenes.

### [Evangelism](https://github.com/nodejs/evangelism)

El Grupo de Trabajo Evangelism promueve los logros de Node.js y le permite a la comunidad saber cómo pueden involucrarse.

Responsabilidades que incluye:

* Facilitar el intercambio de mensajes sobre el proyecto.
* Gestionar proyectos oficiales en redes sociales.
* Gestionar la difusión de speakers en reuniones y conferencias.
* Gestionar la difusión de eventos de comunidades.
* Publicar resúmenes de actualizaciones regulares y otro contenidos promocionales.

### [i18n](https://github.com/nodejs/i18n)

Los Grupos de Trabajo i18n gestionan más que nada traducciones. Son puntos de unión para que los miembros de la comunidad colaboren entre sí en el idioma que elijan.

Cada equipo está organizado en torno a un idioma hablado común. Cada comunidad lingüística podría producir múltiples localizaciones para varios recursos del proyecto.

Responsabilidades que incluye:

* Traducción de cualquier material de Node.js que se considere relevante para la comunidad.
* Revisión de procesos para mantener las traducciones actualizadas y de buena calidad.
* Gestión y seguimiento de canales de redes sociales en su idioma.
* Promover speakers de Node.js para reuniones y conferencias en su idioma.

Cada comunidad lingüística mantiene su propio intercambio de mensajes.

* [nodejs-ar - Arabic (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Release](https://github.com/nodejs/Release)

El Grupo de Trabajo Release administra el proceso de lanzamiento de Node.js.

Responsabilidades que incluye:

* Definir el proceso de lanzamiento.
* Definir el contenido de los lanzamientos.
* Generar y crear lanzamientos.
* Lanzar grupos de pruebas.
* Gestionar el Long Term Support o soporte a largo plazo y los branches actuales, incluyendo cambios para el respaldo con parches a estos branches.
* Definir la política de lo que se hace en cada parche para lanzar streams.

### [Security](https://github.com/nodejs/security-wg)

El Grupo de Trabajo Security gestiona todos los aspectos y procesos vinculados a la seguridad de Node.js.

Responsabilidades que incluye:

* Definir y mantener políticas y procedimientos de seguridad para:
  * El proyecto core Node.js.
  * Otros proyectos mantenidos por el Node.js Technical Steering Committee (TSC).
* Trabajar con la Node Security Platform para llevar los datos de vulnerabilidad de la comunidad dentro de la fundación en un documento compartido.
* Asegúrese de que los datos de vulnerabilidad se actualicen de manera eficiente y oportuna. Por ejemplo, garantizar que haya procesos bien documentados para informar de vulnerabilidades en los módulos de la comunidad.
* Revisar y recomendar procesos para la gestión de informes de seguridad (pero no la administración real de informes de seguridad, que son revisados por un grupo de personas directamente delegadas por el TSC).
* Definir y mantener políticas y procedimientos para la coordinación de las cuestiones de la seguridad dentro del ecosistema Open Source de Node.js.
* Ofrecer ayuda a las personas que mantienen los paquetes de npm para solventar errores de seguridad de alto impacto.
* Mantener y poner a disposición datos sobre vulnerabilidades de seguridad reveladas en:
  * El core del proyecto Node.js.
  * En otros proyectos mantenidos por el grupo técnico de la Fundación Node.js.
  * El ecosistema externo Open Source de Node.js.
* Promover la mejora de las prácticas de seguridad dentro del ecosistema Node.js.
* Recomendar mejoras de seguridad para el proyecto core de Node.js.
* Facilitar y promover la expansión de un servicio de seguridad saludable y un ecosistema de proveedores de productos.

### [Streams](https://github.com/nodejs/readable-stream)

El Grupo de Trabajo Streams se dedica al soporte y la mejora de la API de Streams usado en Node.js y el ecosistema npm. Buscamos crear una API composable que resuelva el problema de representar múltiples ocurrencias de un evento a lo largo del tiempo de una manera humana y de bajo costo. Las mejoras a la API serán impulsadas por las necesidades del ecosistema; La interoperabilidad y la compatibilidad con otras soluciones y versiones anteriores tienen una importancia primordial.

Responsabilidades que incluye:

* Abordar issues de stream en el seguimiento de issue de Node.js.
* La creación y edición de la documentación de stream dentro del proyecto Node.js.
* La revisión de cambios para las subclases de stream dentro del proyecto Node.js.
* Redireccionar los cambios a streams del proyecto Node.js a este proyecto.
* Ayudar en la implementación de proveedores de stream dentro de Node.js.
* Recomendar versiones de `readable-stream` para ser incluirán en Node.js.
* Intercambiar mensajes sobre el futuro de streams para comunicar a la comunidad con anticipación de los cambios.
