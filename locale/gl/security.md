---
layout: security.hbs
title: Seguridade
---

# Seguridade

## Informando dun erro

Todos os erros de seguridade en Node.js son tomadas en serio e deben ser informadas por correo electrónico a
[security@nodejs.org](mailto:security@nodejs.org).
Este será recibido por un subconxunto do equipo central que lida con cuestións de seguridade.

O seu correo será revisado en 24 horas, e recibirá unha resposta máis detallada para o seu correo en 48 horas,
indicando os seguinte pasos do proceso do seu informe.

Tras a resposa inicial ao seu informe, o equipo de seguridade fará o posible para mantelo informado sobre o progreso
realizado na dirección á solución e o anuncio completo, e pode solicitar información adicional ou orientación sobre o
problema informado.
Estas actualizacións serán enviadas polo menos cada cinco días, na práctica vai ser probable que sexa cada 24-48
horas.

Erros de seguridade en módulos de terceiros deben ser informados aos seus respectivos encargados e tamén poden ser
coordinados mediante do [Node Security Project](https://nodesecurity.io).

Grazas por mellorar a seguridade de Node.js. Os seus esforzos e a súa divulgación responsable son moi apreciados e
serán recoñecidos.

## Política de divulgación

Esta é a política de divulgación de Node.js

* O informe de seguridade é recibido e asignado a un responsable inicial. Esta persoa vai coordinar a solución
e o proceso de publicación. Cando o problema é confirmado e unha lista de todas as versións afectadas é determinada.
O código é autidado para atopar calquea potenciais problemas semellantes. As correccións son preparadas para todas
as versións que aínda están baixo mantemento. Estas correccións non son enviadas ao repositorio público, senón que
son retidas localmente ata o anuncio público.

* Unha data suxerida de embargo para esta vulnerabilidade é escollida e un CVE (Common Vulnerabilities and Exposures (CVE®))
é solicitada para a vulnerabilidade.

* Na data de embargo, unha copia do anuncio é publicada na lista de correo de seguridade de Node.js. Os cambios son subidos ao repositorio público e novas versións son desplegadas en nodejs.org. Nas seguintes 6 horas da notificación á lista de correo, unha copia do anuncio será publicada no blog de Node.js.

* Normalmente a data de embargo será fixada 72 horas desde o momento que o CVE é emitido. Sin embargo, isto pode
variar en función da gravidade do erro ou da dificultade de aplicar unha corrección.

* Este proceso pode levar algún tempo, especialmente cando é requerida coordinación cos responsables de outros
proxectos. Cada esforzo posible será feito para manexar o erro da forma máis oportuna posible, con todo, é
importante que se siga o proceso descrito arriba, para garantir que a divulgación sexa tratada de forma
consistente.

## Recibindo actualizacións de seguridade

As notificacións de seguridade serán distribuídas usando os seguintes medios.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

## Comentarios sobre esta política

Se tes suxerencias sobre como este proceso podería ser mellorado, por favor envíe un [pull request](https://github.com/nodejs/nodejs.org)
ou un correo electrónico [security@nodejs.org](mailto:security@nodejs.org) para discutilo.
