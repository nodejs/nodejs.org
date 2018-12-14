---
titlu: Depanare - Noțiuni de bază
layout: docs.hbs
---

# Ghid De Depanare

Acest ghid vă va ajuta să începeți depanare ta Node.js aplicații și script-uri.

## Permite Inspector

Când a început cu ** * * --verificați dacă** comutator, un Node.js procesul ascultă prin WebSockets
pentru comenzi de diagnosticare astfel cum sunt definite de către Inspectorul de Protocol][],
în mod implicit, la gazdă și portul 127.0.0.1:9229. Fiecare proces este, de asemenea, atribuie o
unic [UUID][] (de exemplu, `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspector clienții trebuie să cunoască și să specificați adresa de gazdă, port, iar UUID-ul pentru a conecta
la WebSocket interfață. URL-ul complet este
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, desigur dependente
pe real gazdă și port și cu UUID-ul corect pentru instanță.

Inspector include, de asemenea, un HTTP final pentru a servi metadate despre debuggee,
inclusiv WebSocket URL, UUID, și DevTools Chrome URL-ul. Obține acest metadate
trimitand o cerere HTTP pentru a `http://[host:port]/json/list`. Acesta întoarce o
Obiect JSON, cum ar fi următoarele; a folosi `webSocketDebuggerUrl proprietatea ca
URL-ul pentru a se conecta direct la Inspector.

<!-- eslint-skip ... >
`javascript
{
"descriere": "node.js exemplu",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "nod",
"tip": "nod",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

O Node.js procesul a început *fără* `--verificați dacă poate fi, de asemenea, instruit pentru a începe
ascultare pentru depanare mesaje de semnalizare cu SIGUSR1` (pe Linux și
OS X). Ca de Nod 7 aceasta activeaza moștenirea Debugger API; în Nodul 8 și mai târziu
se va activa funcția de Inspector API.

---
## Implicații De Securitate

Din debugger are acces deplin la Node.js mediu de executie, un
malware actor capabil să se conecteze la acest port poate fi în măsură să execute arbitrare
codul cu privire la numele de Nod proces. Este important să înțelegem de securitate
implicațiile expunerea debugger portul de rețele publice și private.

### Expunerea de depanare port public este nesigur

Dacă depanatorul este obligat să o adresă IP publică, sau de la 0.0.0.0, nici clientii care
poate ajunge la adresa dvs. de IP va fi capabil să se conecteze la debugger, fără nici
restricții și va fi capabil să ruleze cod arbitrar.

În mod implicit `nod --verificați dacă` se leagă la 127.0.0.1. În mod explicit necesitatea de a oferi un
adresa IP publică sau 0.0.0.0, etc., dacă doriți să permiteți conexiuni externe
la depanator. Acest lucru poate expune un potențial semnificativ de securitate
amenințare. Vă sugerăm să se asigure corespunzător firewall-uri și de control de acces în loc
pentru a preveni expunerea securitate.

A se vedea secțiunea privind '[Activarea remote debugging scenarii](#permițându-de la distanță-depanare-scenarii) pe un sfat cum
pentru a în condiții de siguranță permite remote debugger clienților să se conecteze.

### Aplicații locale au acces deplin la inspector

Chiar dacă ai lega inspector port la 127.0.0.1 (implicit), orice aplicații
rulează local pe mașină va avea acces nerestricționat. Acest lucru este de design
pentru a permite locală debugger-ele să fie capabil să se atașeze în mod convenabil.

### Browsere, WebSockets și aceeași origine politica

De a deschide site-uri într-un web-browser-ul poate face WebSocket și cereri HTTP sub
browser-model de securitate. O primă conexiune HTTP este necesar să se obțină o
unic debugger id de sesiune. Aceeași origine-politica previne site-uri de a fi
în măsură să facă această conexiune HTTP. Pentru securitate suplimentară împotriva
[DNS re-legare atacuri](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
verifică faptul că "Gazdă" anteturile pentru conexiune
specificați o adresă IP sau `localhost " sau " localhost6` precis.

Aceste politici de securitate interzice conectarea la o distanță serverul de depanare
specificarea numelui de gazdă. Puteți lucra în jurul valorii de această limitare prin specificarea
fie adresa IP sau prin utilizarea ssh tuneluri așa cum este descris mai jos.

## Inspector Clienti

Mai multe utilitare și instrumente open source se poate conecta la Nod Inspector. De bază
informatii cu privire la aceste cum urmează:

#### [nod-inspect](https://github.com/nodejs/node-inspect)

* CLI Debugger susținută de Node.js Fundația care utilizează [Inspector de Protocol][].
* O versiune este la pachet cu Nod și poate fi folosit cu nod inspecta myscript.js`.
* Cea mai recentă versiune poate fi, de asemenea, instalat în mod independent (de exemplu, `npm install-g nod-inspect`)
și utilizate cu nod-inspect myscript.js`.

#### [DevTools Chrome](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Opțiunea 1**: Deschide chrome://controlați într-o bazat pe Crom
browser-ul. Faceți clic pe butonul Configurare și de a asigura ținta de gazdă și port
sunt listate.
* **Varianta 2**: Copia `devtoolsFrontendUrl de ieșire de `/json/lista`
(a se vedea mai sus) sau --verificați dacă sugestie de text și inserați codul în Chrome.
* **Opțiunea 3**: Instalați Extensia Chrome NIM (Nod Inspector Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* În panoul de Depanare, faceți clic pe pictograma setări pentru a deschide `.vscode/lansare.json`.
Selectați "Node.js" pentru configurarea inițială.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Alege "Debug > Start Debugging" din meniu sau lovit F5.
* [Instrucțiuni detaliate](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ și alte JetBrains Idele

* Crearea unui nou Node.js depanare configurare și lovit de Depanare. `--verificați dacă` va fi folosit
 în mod implicit pentru Node.js 7+. Pentru a dezactiva debifați `js.debugger.nod.utilizare.verificați în
IDE Registry.

#### [crom-telecomanda-interfata](https://github.com/cyrus-and/chrome-remote-interface)

* Biblioteca pentru a facilita conexiuni la Inspector de Protocol obiective.

---

## Opțiuni de linie de comandă

Următorul tabel listează impactul de diverse runtime steaguri pe de depanare:

<table cellpadding="0" cellspacing="0">
<tr><th>Flag</th><th></th></tr>
<tr>
<td>--verificați dacă</td>
<td>
<ul>
<li>Permite inspector agent</li>
<li>Asculta pe default adresa și portul (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--verificați=<i>[host:port]</i></td>
<td>
<ul>
<li>Permite inspector agent</li>
<li>se Leagă de adresa sau numele de <i>host</i> (default: 127.0.0.1)</li>
<li>Asculta pe portul <i>port</i> (default: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--verificați-brk</td>
<td>
<ul>
<li>Permite inspector agent</li>
<li>Asculta pe default adresa și portul (127.0.0.1:9229)</li>
<li>Pauză înainte de codul de utilizator începe</li>
</ul>
</td>
</tr>
<tr>
<td>--verificați-brk=<i>[host:port]</i></td>
<td>
<ul>
<li>Permite inspector agent</li>
<li>se Leagă de adresa sau numele de <i>host</i> (default: 127.0.0.1)</li>
<li>Asculta pe portul <i>port</i> (default: 9229)</li>
<li>Pauză înainte de codul de utilizator începe</li>
</ul>
</td>
</tr>
<tr>
<td><code>nod inspecta <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn proces copil pentru a rula utilizatorului script sub --verificați dacă pavilion;
și de a folosi procesul principal pentru a rula CLI debugger.</li>
</ul>
</td>
</tr>
<tr>
<td><code>nod inspecta --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn proces copil pentru a rula utilizatorului script sub --verificați dacă pavilion;
și de a folosi procesul principal pentru a rula CLI debugger.</li>
<li>Asculta pe portul <i>port</i> (default: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Activarea remote debugging scenarii

Vă recomandăm să nu aveți debugger asculta pe o adresă IP publică. Dacă
aveți nevoie pentru a permite depanarea la distanță conexiuni recomandăm utilizarea ssh
tuneluri în loc. Noi oferim următorul exemplu doar pentru motive ilustrative.
Vă rugăm să înțelegeți riscul de securitate de a permite accesul de la distanță la un privilegiat
service înainte de a continua.

Să presupunem că se execută Nodul pe mașină de la distanță, remote.example.com, care te
vreau să fie în măsură pentru a depana. Pe această mașină, ar trebui să înceapă nodul proces
cu inspectorul de a asculta numai la localhost (implicit).

``bash
$ nod --verificați dacă server.js
``

Acum, pe mașina locală la care doriți să inițieze un interpretor de client
conexiune, puteți configura un tunel ssh:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Aceasta pornește un tunel ssh sesiune în cazul în care o conexiune la portul 9221 pe local
masina va fi transmis la port 9229 pe remote.example.com. Acum puteți atașa
un program de depanare, cum ar fi Chrome DevTools sau Cod Visual Studio la localhost:9221,
care ar trebui să fie în măsură pentru a depana ca în cazul în care Node.js cererea a fost de funcționare la nivel local.

---

## Legacy Depanator

**Moștenirea debugger a fost dezaprobată de Nod 7.7.0. Vă rugăm să folosiți --verificați dacă
și Inspector în schimb.**

Când a început cu ** * * --debug** sau **--debug-brk** switch-uri în versiunea 7 și
mai devreme, Node.js ascultă pentru depanare comenzi definite de către întrerupt
V8 Protocol de Depanare de pe un port TCP, în mod implicit `5858`. Orice depanator client
care vorbește despre acest protocol se poate conecta la și de depanare procesul de funcționare; o
două cele mai populare sunt enumerate mai jos.

V8 Protocol de Depanare nu mai este menținută sau documentate.

#### [Built-in Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `nod de depanare script_name.js pentru a începe script sub Nod interna
linie de comandă debugger. Scenariul pornește de la un alt Nod procesul a început cu
`--debug-brk` opțiune, și Nodul inițial proces conduce `_debugger.js`
script-ul și se conectează la dvs. țintă.

#### [nod-inspector](https://github.com/node-inspector/node-inspector)

Depanare Node.js app cu Chrome DevTools prin utilizarea unui intermediar în procesul de
care se traduce Inspector de Protocol folosit în Crom la V8 Depanator
protocolul utilizat în Node.js.

<!-- ref -->

[Inspector de Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122