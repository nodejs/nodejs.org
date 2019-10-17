---
layout: security.hbs
title: Seguretat
---

# Seguretat

## Informe d'errors

Tots els problemes de seguretat en Node.js es tracten seriosament i han de ser reportats enviant un correu a [security@nodejs.org](mailto:security@nodejs.org).
Aquest serà rebut per un subgrup de l'equip central encarregat dels problemes de seguretat.

El seu correu serà revisat en 24 hores, i vostè rebrà una resposta detallada al seu missatge en les següents 48 hores indicant els passos a seguir en el procés del seu informe.

Després de la resposta inicial al seu informe, l'equip de seguretat s'esforçarà a mantenir-lo informat del progrés fet en
direcció a la solució i l'anunci públic, també poden demanar informació addicional o instruccions sobre l'error reportat.
Aquestes actualitzacions seran enviades com a mínim cada cinc dies, a la pràctica serà aproximadament cada 24-48 hores.

Errors de seguretat en mòduls de tercers han de ser reportats als seus respectius encarregats i també han de ser coordinats
a través de [Node Security Project](https://nodesecurity.io).

Gràcies per millorar la seguretat de Node.js. Els seus esforços i la seva confidencialitat responsable són gratament apreciats
i han de ser reconeguts.

## Política de divulgació

Aquesta és la política de divulgació de Node.js

* L'informe de seguretat és rebut i assignat a un responsable inicial. Aquesta persona coordinarà la solució i el procés
de publicació. Un cop el problema és confirmat es determina una llista de totes les versions afectades. El codi és auditat
per trobar potencials problemes similars. Es preparen les solucions per a totes les versions que estan en manteniment.
Aquestes solucions no són enviades al repositori públic, en canvi són retingudes localment fins a l'anunci públic.

* Una data d'embargament per a aquesta vulnerabilitat és seleccionada i un CVE (Common Vulnerabilities and Exposures (CVE®))
és sol·licitat per la vulnerabilitat.

* A la data d'embargament, se li envia una còpia de l'anunci a la llista de correu de seguretat de Node.js. Els canvis són pujats al repositori públic i noves versions són desplegades en nodejs.org. En les següents 6 hores de la notificació a la llista de correu, una còpia de l'anunci es publicarà al blog de Node.js.

* Normalment la data d'embargament s'establirà 72 hores des de la creació del CVE. Però això pot variar depenent de
la severitat de l'error o la dificultat a aplicar la solució.

* Aquest procés pot trigar algun temps, especialment quan es requereix coordinació amb els encarregats del manteniment d'altres projectes.
Es farà tot el possible per gestionar l'error en la forma més oportuna possible, però, és important que seguim el procés descrit a dalt per assegurar que la divulgació es gestiona d'una manera consistent.

## Rebi actualitzacions de seguretat

Les notificacions de seguretat seran distribuïdes usant els següents mitjans.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

## Comentaris sobre aquesta política

Si vostè té suggeriments sobre com pot ser millorat aquest procés, si us plau enviï un [pull request](https://github.com/nodejs/nodejs.org)
o un mitssage a [security@nodejs.org](mailto:security@nodejs.org) per discutir-ho.
