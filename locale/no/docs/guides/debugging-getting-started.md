---
title: Debugging - Hvordan komme i gang
layout: docs.hbs
---

# Debugging Guide

Denne guiden vil hjelpe deg med å komme i gang debugging din Node.js programmer og skript.

## Aktivere Inspector

Når begynte med **--inspisere** * slå, en Node.js prosessen lytter via WebSockets
for diagnostiske kommandoer som definert av [Inspector-Protokollen][],
standard på vertsnavn og port 127.0.0.1:9229. Hver prosess er også tildelt en
unik [UUID][] (f.eks `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektøren kunder må vite og angi vertsadresse, port, og UUID å koble
til WebSocket grensesnitt. Den fullstendige URL-er
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, selvfølgelig avhengig
på faktiske vertsnavn og port, og med riktig UUID for eksempel.

Inspektøren inneholder også en HTTP-endepunkt å tjene metadata om debuggee,
inkludert WebSocket URL, UUID og Chrome DevTools URL. Få denne metadata
ved å sende en HTTP-forespørsel til `http://[vert:port]/json/list". Dette gir en
JSON-objekt som følgende; bruk `webSocketDebuggerUrl` eiendom som
URL-adressen til å koble direkte til Inspektør.

<!-- eslint-hopp -->
``javascript
{
"description": "node.js forekomst",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "node",
"type": "node",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

En Node.js prosessen i gang *uten* `--inspisere` kan også bli bedt om å starte
lytte til feilsøking meldinger ved signaliserer det med " SIGUSR1` (på Linux og
OS X). Per Node 7 dette aktiverer arven Debugger API; i Node 8 og senere
det vil aktivere Inspector API.

---
## Sikkerhetsimplikasjoner

Siden feilsøkingsprogrammet har full tilgang til Node.js execution environment, 
skadelige skuespiller i stand til å koble til denne porten kan være i stand til å utføre vilkårlig
koden på vegne av Noden prosessen. Det er viktig å forstå sikkerhet
konsekvensene av å utsette debugger-port på offentlige og private nettverk.

### Utsette debug-port offentlig er usikre

Hvis feilsøkingsprogrammet er bundet til en offentlig IP-adresse, eller til 0.0.0.0, og alle klienter som
kan nå din IP-adresse vil være i stand til å koble til feilsøkingsprogrammet uten noen
begrensning og vil være i stand til å kjøre vilkårlig kode.

Som standard `node --inspisere` binder seg til 127.0.0.1. Du nødvendigvis trenger å gi en
offentlige IP-adressen eller 0.0.0.0, etc., hvis du har tenkt å tillate eksterne tilkoblinger
til feilsøkingsprogrammet. Dette kan utsette deg en potensielt betydelig sikkerhet
trusselen. Vi foreslår at du sikrer hensiktsmessige brannmurer og få tilgang til kontrollene på plass
for å hindre en sikkerhet eksponering.

Se avsnittet om '[Aktivere remote debugging scenarier](#aktivere-ekstern-debugging-scenarier)' på noen råd om hvordan
du trygt kan tillate eksterne feilsøkingsprogrammet kunder til å koble til.

### Lokale applikasjoner har full tilgang til inspektør

Selv om du binder inspektøren port til 127.0.0.1 (standard), alle programmer
kjører lokalt på din maskin vil ha ubegrenset tilgang. Dette er av design
å tillate lokal debuggers å være i stand til å feste beleilig.

### Nettlesere, WebSockets og samme opprinnelse politikk

Nettsteder åpnes i en nettleser kan gjøre WebSocket og HTTP-forespørsler under
nettleser sikkerhet modell. En innledende HTTP-tilkobling er nødvendig for å oppnå en
unike debugger økt-id. Samme opprinnelse-politikk hindrer nettsteder fra å være
i stand til å gjøre denne HTTP-tilkobling. For ekstra sikkerhet mot
[DNS rebinding angrep](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
bekrefter at 'Host' topptekst for tilkoblingen
angi en IP-adresse eller `localhost` eller `localhost6` presist.

Disse retningslinjer for sikkerhet nekte å koble til en ekstern feilsøking av server
angi vertsnavnet. Du kan jobbe rundt denne begrensningen ved å angi
enten IP-adressen eller ved hjelp av ssh tunneler som beskrevet nedenfor.

## Inspektør Kunder

Flere kommersielle og open source-verktøy kan koble til en Node er Inspektør. Grunnleggende
info om disse på følgende måte:

#### [node-inspisere](https://github.com/nodejs/node-inspect)

* CLI Debugger støttes av Node.js Stiftelsen som bruker [Inspector-Protokollen][].
* En versjon er sammen med Node og kan brukes med `node inspisere myscript.js`.
* Den siste versjonen kan også være installert uavhengig av hverandre (f.eks. `npm installere -g-node-inspisere`)
og brukt med `node-inspisere myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Alternativ 1**: Åpne " chrome://inspisere` i en Krom-basert
nettleseren. Klikk på Konfigurer-knappen og sikre dine mål vertsnavn og port
er oppført.
* **Alternativ 2**: Kopier `devtoolsFrontendUrl` fra produksjon av `/json/list"
(se ovenfor) eller --inspisere hint teksten og lim inn i Chrome.
* **Alternativ 3**: Installer Chrome Extension NIM (Node Inspektør Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio-Kode](https://github.com/microsoft/vscode) 1.10+

* I Debug-panelet, klikker du på innstillinger-ikonet for å åpne `.vscode/lansere.json`.
Velg "Node.js" for det første oppsettet.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Velg "Feilsøk > Start Debugging" fra menyen, eller trykk F5.
* [Detaljerte instruksjoner](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ og andre JetBrains IDEs

* Opprette en ny Node.js debug-konfigurasjon, og trykk Debug. `--inspisere` vil bli brukt
 standard for Node.js 7+. Fjern merket for å deaktivere `js.feilsøkingsprogrammet.node.bruk.inspisere` i
IDE-Registeret.

#### [chrome-ekstern-grensesnitt](https://github.com/cyrus-and/chrome-remote-interface)

* Bibliotek for å forenkle forbindelser til Inspektør Protokollen endepunkter.

---

## Kommando-linje valg

Følgende tabell viser effekten av ulike runtime flagg på feilsøking:

<table cellpadding="0" cellspacing="0">
<tr><th>Flagg</th><th>som Betyr</th></tr>
<tr>
<td>--inspisere</td>
<td>
<ul>
<li>Aktiver inspektør agent</li>
<li>Lytt på standard-adresse og port (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--inspisere=<i>[vert:port]</i></td>
<td>
<ul>
<li>Aktiver inspektør agent</li>
<li>Binde seg til-adresse eller et vertsnavn <i>host</i> (standard: 127.0.0.1)</li>
<li>Lytte på port <i> - port</i> (standard: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--inspisere-brk</td>
<td>
<ul>
<li>Aktiver inspektør agent</li>
<li>Lytt på standard-adresse og port (127.0.0.1:9229)</li>
<li>Pause før du bruker koden starter</li>
</ul>
</td>
</tr>
<tr>
<td>--inspisere-brk=<i>[vert:port]</i></td>
<td>
<ul>
<li>Aktiver inspektør agent</li>
<li>Binde seg til-adresse eller et vertsnavn <i>host</i> (standard: 127.0.0.1)</li>
<li>Lytte på port <i> - port</i> (standard: 9229)</li>
<li>Pause før du bruker koden starter</li>
</ul>
</td>
</tr>
<tr>
<td><code> - noden inspisere <i>script.js</i></code></td>
<td>
<ul>
<li>Gyte barn prosess for å kjøre brukerens skriptet under --inspisere flagg;
og bruk viktigste prosessen for å kjøre CLI feilsøkingsprogrammet.</li>
</ul>
</td>
</tr>
<tr>
<td><code> - noden inspisere --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Gyte barn prosess for å kjøre brukerens skriptet under --inspisere flagg;
og bruk viktigste prosessen for å kjøre CLI feilsøkingsprogrammet.</li>
<li>Lytte på port <i> - port</i> (standard: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Aktivere remote debugging scenarier

Vi anbefaler at du aldri har feilsøkingsprogrammet lytte på en offentlig IP-adresse. Hvis
du må tillate eksterne tilkoblinger feilsøking vi anbefaler bruk av ssh
tunneler i stedet. Vi tilbyr følgende eksempel som illustrasjon.
Vennligst forstå sikkerhet risiko for å tillate ekstern tilgang til en privilegert
service før du fortsetter.

La oss si at du kjører Node på ekstern maskin, remote.example.com at du
ønsker å være i stand til å feilsøke. På den maskinen, bør du starte prosessen node
med inspektør lytter bare til localhost (standard).

``bash
$ node --inspisere server.js
``

Nå, på din lokale maskin fra der du ønsker å starte en debug-klient
- tilkobling, kan du sette opp en ssh-tunnel:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Dette starter en ssh-tunnel session der en tilkobling til porten på din lokale 9221
maskinen vil bli videresendt til port 9229 på remote.example.com. Nå kan du feste
en debugger, for eksempel Chrome DevTools eller Visual Studio-Koden for å localhost:9221,
som bør være i stand til å feilsøke som om Node.js programmet var å kjøre lokalt.

---

## Eldre Feilsøkingsprogrammet

**Legacy debugger har blitt avskrevet som for Node 7.7.0. Vennligst bruk --inspisere
og Inspektør i stedet.**

Når begynte med **--debug** eller **--debug-brk** brytere i versjon 7 og
tidligere, Node.js lytter til feilsøking kommandoer er definert av avviklet
V8 Debugging-Protokollen på en TCP-port som standard `5858`. Noen debugger klient
som taler denne protokollen kan koble til og feilsøke prosess; en
par populære de er listet opp nedenfor.

V8 Debugging-Protokollen er ikke lenger opprettholdes eller dokumentert.

#### [Innebygd Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `node debug script_name.js " for å starte skriptet under Noden er bygd inn
kommando-linje feilsøkingsprogrammet. Skriptet starter i en annen Node prosessen startet med
`--debug-brk " - alternativet, og den første Noden prosessen går `_debugger.js`
skriptet, og kobles til målet.

#### [node-inspektøren](https://github.com/node-inspector/node-inspector)

Debug din Node.js app med Chrome DevTools ved hjelp av en mellommann prosessen
som oversetter Inspektøren Protokoll som brukes i Krom til V8 Feilsøkingsprogrammet
protokollen som brukes i Node.js.

<!-- refs -->

[Inspector-Protokollen]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
