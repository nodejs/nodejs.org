---
layout: about.hbs
title: Grupos de trabajo
---

# Grupos de trabajo centrales
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Los Grupos de trabajo centrales son creados por el [Comité de Dirección Técnica (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Grupos de Trabajo Actuales

* [API de complementos](#addon-api)
* [Compilación](#build)
* [Diagnósticos](#diagnostics)
* [Docker](#docker)
* [Evangelismo](#evangelism)
* [i18n](#i18n)
* [Mantenimiento de paquetes](#package-maintenance)
* [Versión](#release)
* [Seguridad](#security)
* [Streams](#streams)

### [API de complementos](https://github.com/nodejs/nan)

El Grupo de Trabajo de la API de complementos es responsable de mantener el proyecto NAN y su paquete _nan_ correspondiente en npm. El proyecto NAN pone a disposición una capa de abstracción para los autores de complementos nativos para Node.js, ayudando a escribir código que sea compatible con muchas versiones usadas activamente de Node.js, V8 y libuv.

Responsabilidades que incluye:

* Mantener el repositorio de GitHub [NAN](https://github.com/nodejs/nan), incluyendo código, problemas y documentación.
* Mantener el repositorio de GitHub de los [ejemplos de complementos](https://github.com/nodejs/node-addon-examples) incluyendo código, problemas y documentación.
* Mantener la API de complementos en C++ dentro del proyecto Node.js, en subordinación al TSC de Node.js.
* Mantener la documentación de complementos dentro del proyecto Node.js, en subordinación al TSC de Node.js.
* Mantener el paquete _nan_ en npm, lanzando nuevas versiones cuando sea apropiado.
* Intercambiar mensajes sobre el futuro de Node.js y la interfaz NAN para comunicar a la comunidad con anticipación los avances y cambios.

Los miembros actuales se pueden encontrar en el archivo [README](https://github.com/nodejs/nan#collaborators).

### [Compilación](https://github.com/nodejs/build)

El propósito del Grupo de Trabajo de Compilación es crear y mantener una infraestructura de automatización distribuida.

Responsabilidades que incluye:

* Producir paquetes para todas las plataformas.
* Ejecutar pruebas.
* Ejecutar pruebas de rendimiento y comparaciones.
* Crear y gestionar contenedores de compilación.

### [Diagnósticos](https://github.com/nodejs/diagnostics)

El propósito del Grupo de Trabajo de Diagnósticos es mostrar un conjunto de interfaces de diagnóstico integrales, documentadas y extensibles para el uso de las herramientas de Node.js y las máquinas virtuales de JavaScript.

Responsabilidades que incluye:

* Colaborar con V8 para integrar `v8_inspector` en Node.js.
* Colaborar con V8 para integrar `trace_event` en Node.js.
* Colaborar con Core para refinar `async_wrap` y `async_hooks`.
* Mantener y mejorar la integración del sistema de traza del sistema operativo (por ejemplo, ETW, LTTNG, dtrace).
* Documentar capacidades y APIs de diagnóstico en Node.js y sus componentes.
* Explorar oportunidades y brechas, discutiendo solicitudes de características y abordando conflictos en los diagnósticos de Node.js.
* Fomentar un ecosistema de herramientas de diagnósticos para Node.js.
* Definir y añadir interfaces/APIs para permitir que los volcados sean generados cuando se necesiten.
* Definir y añadir estructuras comunes para los volcados generados para soportar herramientas que quieran realizar introspección de esos volcados.

### [Docker](https://github.com/nodejs/docker-node)

El propósito del Grupo de Trabajo de Docker es construir, mantener y mejorar las imágenes oficiales de Docker para el proyecto Node.js.

Responsabilidades que incluye:

* Mantener actualizadas las imágenes oficiales de Docker en línea con los nuevos lanzamientos de Node.js.
* Decidir e implementar mejoras y/o correcciones en las imágenes.
* Mantener y mejorar la documentación de las imágenes.

### [Evangelismo](https://github.com/nodejs/evangelism)

El Grupo de Trabajo de Evangelismo promueve los logros de Node.js y permite a la comunidad saber cómo pueden involucrarse.

Responsabilidades que incluye:

* Facilitar el intercambio de mensajes sobre el proyecto.
* Gestionar las redes sociales oficiales de los proyectos.
* Gestionar la promoción de oradores en reuniones y conferencias.
* Gestionar la promoción de eventos de la comunidad.
* Publicar resúmenes de actualizaciones regulares y otros contenidos promocionales.

### [i18n](https://github.com/nodejs/i18n)

Los Grupos de Trabajo i18n gestionan más que solo traducciones. Son puntos de unión para que los miembros de la comunidad colaboren entre sí en el idioma que elijan.

Cada equipo está organizado en torno a un idioma común. Cada comunidad lingüística podría producir múltiples localizaciones para varios recursos del proyecto.

Responsabilidades que incluye:

* Traducir cualquier material de Node.js que crean relevantes para su comunidad.
* Revisar los procesos para mantener las traducciones actualizadas y de alta calidad.
* Gestionar y monitorear los canales de redes sociales en su idioma.
* Promover los oradores de Node.js para reuniones y conferencias en su idioma.

Cada comunidad lingüística mantiene su propia membresía.

* [nodejs-ar - Árabe (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Búlgaro (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengalí (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chino (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Checo (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danés (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - Alemán (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Griego (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Español (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persa (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finés (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - Francés (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebreo (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Húngaro (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesio (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italiano (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japonés (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgiano (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Coreano (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonio (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malayo (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Neerlandés (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Noruego (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polaco (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portugués (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Rumano (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Ruso (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Sueco (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turco (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanés (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ucraniano (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamita (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Mantenimiento de paquetes](https://github.com/nodejs/package-maintenance)

Responsabilidades que incluye:

* Construir, documentar y evangelizar la orientación, herramientas y procesos que hacen más fácil para los responsables mantener paquetes y aceptar ayuda de aquellos de quienes dependen sus paquetes.
* Gestión de los repositorios dentro de la organización de GitHub [pkgjs](https://github.com/pkgjs) incluyendo pero no limitado a:
  * Gestionar la lista de propietarios de la organización que complementa a los propietarios estándar de la organización Node.js como se describe en [https://github.com/nodejs/admin/blob/master/GITHUB_ORG_MANAGEMENT_POLICY.md#owners](https://github.com/nodejs/admin/blob/master/GITHUB_ORG_MANAGEMENT_POLICY.md#owners)
  * Supervisar nuevos repositorios (crear, mover, remover)
  * Gestionar los equipos de mantenimiento para todos los repositorios.
  * Política de contribución para los repositorios
* Dirección técnica para los proyecto dentro de la organización [pkgjs](https://github.com/pkgjs)
* Gestionar los equipos de mantenimiento y políticas de contribución para los siguientes repositorios
  * nodejs/ci-config-travis
  * nodejs/ci-config-github-actions
  * repositorio nodejs/package-maintenance.

### [Versión](https://github.com/nodejs/Release)

El Grupo de Trabajo de Versión gestiona el proceso de versionado para Node.js.

Responsabilidades que incluye:

* Definir el proceso de versionado.
* Definir el contenido de las versiones.
* Generar y crear versiones.
* Probar las versiones.
* Gestionar las ramas de Soporte de Largo Plazo y Actual incluyendo cambios de versiones anteriores a estas ramas.
* Definir la política de lo que se adapta de versiones anteriores para versionar streams

### [Seguridad](https://github.com/nodejs/security-wg)

El Grupo de Trabajo de Seguridad gestiona todos los aspectos y procesos vinculados a la seguridad de Node.js.

Responsabilidades que incluye:

* Definir y mantener las políticas y procedimientos de seguridad para:
  * el proyecto central de Node.js
  * otros proyectos mantenidos por el Comité Directivo Técnico (Technical Steering Committee o TSC) de Node.js.
* Trabajar con la Plataforma de Seguridad de Node para llevar datos de vulnerabilidad de la comunidad a la fundación como un activo compartido.
* Asegurar que los datos de vulnerabilidad sean actualizados de una forma eficiente y oportuna. Por ejemplo, asegurar que haya procesos bien documentados para reportar vulnerabilidades en los módulos de la comunidad.
* Revisar y recomendar procesos para gestionar los reportes de seguridad (pero no la administración real de los reportes de seguridad, los cuales son revisados por un grupo de personas delegadas directamente por el TSC).
* Definir y mantener políticas y procedimientos para la coordinación de problemas de seguridad dentro del ecosistema de código abierto externo de Node.js.
* Ofrecer ayuda a los mantenedores del paquete npm para corregir errores de seguridad de alto impacto.
* Mantener y poner a disposición datos sobre vulnerabilidades de seguridad revelados en:
  * el proyecto central de Node.js
  * otros proyectos mantenidos por el grupo técnico de la Fundación Node.js
  * el ecosistema de código abierto externo de Node.js
* Promover la mejora de las prácticas de seguridad dentro del ecosistema de Node.js.
* Recomendar mejoras de seguridad para el proyecto central de Node.js.
* Facilitar y promover la expansión de un servicio de seguridad saludable y un ecosistema de proveedores de productos.

### [Streams](https://github.com/nodejs/readable-stream)

El Grupo de Trabajo de Streams está dedicado al soporte y mejora de la API Streams usado en Node.js y el ecosistema npm. Buscamos crear una API componible que resuelva el problema de representar múltiples ocurrencias de un evento a lo largo del tiempo de una manera humana y de bajo costo. Las mejoras a la API serán dirigidas por las necesidades del ecosistema; la interoperabilidad y compatibilidad con otras soluciones y versiones previas tienen una importancia primordial.

Responsabilidades que incluye:

* Abordar problemas de stream en el sistema de seguimiento de incidentes de Node.js.
* Crear y editar documentación de stream dentro del proyecto Node.js.
* Revisar cambios a las subclases de stream dentro del proyecto Node.js.
* Redirigir los cambios a streams del proyecto Node.js a este proyecto.
* Asistir en la implementación de proveedores de stream dentro de Node.js.
* Recomendar versiones de `readable-stream` para ser incluidas en Node.js.
* Intercambiar mensajes sobre el futuro de streams para comunicar a la comunidad con anticipación de los cambios.
