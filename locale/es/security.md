---
layout: security.hbs
title: Seguridad
---

# Seguridad

## Reporte de errores

Todos los problemas de seguridad en Node.js se tratan seriamente y deben ser reportados enviando un correo a [security@nodejs.org](mailto:security@nodejs.org).
Este será recibido por un subgrupo del equipo central encargado de los problemas de seguridad.

Su correo será revisado en 24 horas, y usted recibirá una respuesta detallada a su mensaje en las siguientes 48 horas indicando los pasos a seguir en el proceso de su reporte.

Luego de la respuesta inicial a su reporte, el equipo de seguridad se esforzará en mantenerlo informado del progreso hecho en
dirección a la solución y el anuncio público, también pueden pedir información adicional ó instrucciones sobre el error reportado.
Estas actualizaciones serán enviadas por lo menos cada cinco días, en la práctica será aproximadamente cada 24-48 horas.

Errores de seguridad en módulos de terceros deben ser reportados a sus respectivos encargados y también deben ser coordinados
a través de [Node Security Project](https://nodesecurity.io).

Gracias por mejorar la seguridad de Node.js. Sus esfuerzos y su confidencialidad responsable son gratamente apreciados
y serán reconocidos.

## Política de divulgación

Esta es la política de divulgación de Node.js

* El reporte de seguridad es recibido y asignado a un responsable inicial. Esta persona coordinará la solución y el proceso
de publicación. Una vez el problema es confirmado y se determina una lista de todas las versiones afectadas. El código es auditado
para encontrar potenciales problemas similares. Se preparan las soluciones para todas las versiones que están en mantenimiento.
Estas soluciones no son enviadas al repositorio público, en cambio son retenidas localmente hasta el anuncio público.

* Una fecha de embargo para esta vulnerabilidad es seleccionada y un CVE (Common Vulnerabilities and Exposures (CVE®))
es solicitado para la vulnerabilidad.

* En la fecha de embargo, se le envía una copia del anuncio a la lista de correo de seguridad de Node.js. Los cambios son subidos al repositorio público y nuevas versiones son desplegadas en nodejs.org. En las siguientes 6 horas de la notificación a la lista de correo, una copia del anuncio será publicada en el blog de Node.js.

* Típicamente la fecha de embargo será fijada 72 horas desde la creación del CVE. Sin embargo, esto puede variar dependiendo de
la severidad del error ó la dificultad en aplicar la solución.

* Este proceso puede tomar algún tiempo, especialmente cuando se requiere cordinación con responsables de otros proyectos. Cada
esfuerzo posible se hará para encargarse del error en la forma más oportuna posible, sin embargo, es importante que sigamos el
proceso descrito arriba, para asegurarse que la divulgación sea manejada de una manera consistente.

## Reciba actualizaciones de seguridad

Las notificaciones de seguridad serán distribuidas usando los siguientes medios.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

## Comentarios sobre esta política

Si usted tiene sugerencias sobre como puede ser mejorado ese proceso, por favor envíe un [pull request](https://github.com/nodejs/nodejs.org)
ó un mensaje a [security@nodejs.org](mailto:security@nodejs.org) para discutirlo.
