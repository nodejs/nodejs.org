---
title: ECMAScript 2015 (ES6) y más allá
layout: docs.hbs
---

# ECMAScript 2015 (ES6) y más allá

Node.js está construido en base a versiones modernas de [V8](https://v8.dev/). Al mantenernos actualizados con las últimas versiones de este motor, aseguramos nuevas características del [La Especificación ECMA-262 de JavaScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) que proporciona a los desarrolladores de Node.js, así como mejoras continuas en el rendimiento y la estabilidad.

Todas las características de ECMAScript 2015 (ES6) se dividen en tres grupos **shipping**, **staged** y **in progress**:

* Todas las funcionalidades en **shipping**, que V8 considera estable, se activan **de forma predeterminada en Node.js** y hacen que **NO** se requiera ninguna bandera o flag en tiempo de ejecución.
* Las funciones en **staged**, que son características casi completas que el equipo V8 no las considera estables, requieren un bandera o flag en tiempo de ejecución: `--harmony`.
* **In progress**, las características pueden ser activadas individualmente por su respectiva bandera o flag, aunque esto es altamente desaconsejado a menos que sea para propósitos de pruebas. Nota: estos indicadores están expuestos por V8 y potencialmente cambiarán sin previo aviso de desaprobación.

## ¿Cuales de las características se incluyen con cada versión de Node.js por defecto?

El sitio web [node.green](https://node.green/) proporciona una excelente visión general sobre las funciones compatibles de ECMAScript en varias versiones de Node.js, basadas en la tabla de compatibilidad de kangax.

## ¿Cuales de las características están en progreso?

Las nuevas características se agregan constantemente al motor V8. En términos generales, espere que lleguen en su futuro lanzamiento en Node.js, aunque se desconoce el momento.

Puede detallar todas las funciones *in progress* disponibles en cada versión de Node.js mediante el argumento `--v8-options`. Tenga en cuenta que estas son características incompletas y posiblemente rotas de V8, así que úselas bajo su propio riesgo:

```bash
node --v8-options | grep "in progress"
```

## Tengo mi infraestructura configurada para aprovechar la bandera --harmony. ¿Debo eliminarlo?

El comportamiento actual del indicador `--harmony` en Node.js es habilitar solo las funcionalidades en **staged**. Después de todo, ahora es sinónimo de `--es_staging`. Como se mencionó anteriormente, estas son características completas que aún no se han considerado estables. Si desea jugar de forma segura, especialmente en entornos de producción, considere eliminar este indicador de tiempo de ejecución hasta que se envíe de forma predeterminada en V8 y, en consecuencia, en Node.js. Si mantiene esto habilitado, debe estar preparado para futuras actualizaciones de Node.js que puedan romper su código si V8 cambia su semántica para seguir más de cerca el estándar.

## ¿Cómo encuentro qué versión de V8 se envía con una versión de Node.js en particular?

Node.js proporciona una manera simple de enumerar todas las dependencias y versiones que se envían con un binario específico a través del objeto global `process`. En el caso del motor V8, escriba lo siguiente en su terminal para recuperar su versión:

```bash
node -p process.versions.v8
```
