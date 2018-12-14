---
titel: Debugging - Kom godt i Gang
layout: docs.hb
---

# Debugging Guide

Denne guide vil hjælpe dig med at komme i gang med fejlfinding af din Node.js apps og scripts.

## Aktiver Inspektør

Når de er startet med **--inspicere** skifte, en Node.js processen lytter via WebSockets
for diagnostiske kommandoer som defineret i [Inspektør Protocol][],
som standard ved host og port 127.0.0.1:9229. Hver proces er også tildelt en
unik [UUID][] (fx `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektør kunder skal vide, og angive host-adresse, port og UUID til at forbinde
til WebSocket interface. Den fulde URL ' er
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, selvfølgelig afhængig
på den faktiske host og port, og med de rigtige UUID for eksempel.

Inspektør også indeholder en HTTP-endpoint til at tjene metadata om debuggee,
herunder dens WebSocket URL, UUID, og Chrome DevTools URL. Få denne metadata
ved at sende en HTTP-anmodning til `http://[host:port]/json/ - liste". Denne returnerer en
JSON objekt som følgende; brug `webSocketDebuggerUrl` ejendom, som
URL til at forbinde direkte til Inspektøren.

<!-- eslint-spring -->
``javascript
{
"description": "node.js eksempel",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "node",
"type": "node",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

En Node.js processen i gang *uden* `--undersøg` kan også blive bedt om at starte
at lytte til fejlfinding meddelelser ved signalering det med " SIGUSR1` (på Linux og
OS X). Som Node 7 dette aktiverer de ældre Debugger API, i Node 8 og senere
det vil aktivere Inspektør API.

---
## Sikkerhedsmæssige Konsekvenser

Da debugger har fuld adgang til Node.js execution environment), en
ondsindede skuespiller i stand til at oprette forbindelse til denne port kan være i stand til at udføre vilkårlig
kode på vegne af Node proces. Det er vigtigt at forstå sikkerhed
konsekvenser af at udsætte debugger-port på offentlige og private netværk.

### Udsætte debug port offentligt er usikre

Hvis debugger er bundet til en offentlig IP adresse, eller at 0.0.0.0, er, at nogen kunder
kan nå din IP-adresse vil blive i stand til at oprette forbindelse til debugger uden nogen
begrænsning og vil være i stand til at køre vilkårlig kode.

Som standard `node --undersøg`, der binder sig til 127.0.0.1. Du udtrykkeligt har brug for at give en
offentlig IP-adresse eller 0.0.0.0, osv., hvis du har til hensigt at tillade eksterne forbindelser
til debugger. Dette kan udsætte dig en potentielt væsentlig sikkerhed
trussel. Vi foreslår, at du sikre en passende firewalls og få adgang til kontrol på plads
for at forhindre en sikkerhed eksponering.

Se afsnittet " [Muliggør remote debugging scenarier](#aktivering-remote-debugging-scenarier) på nogle råd om, hvordan
for sikkert at tillade fjernkørsel af debugger-klienter at oprette forbindelse.

### Lokale applikationer har fuld adgang til inspektøren

Selv hvis du binder inspektøren port til 127.0.0.1 (standard), alle programmer
kører lokalt på din maskine, vil have ubegrænset adgang. Dette er af design
for at give de lokale debuggers at være i stand til at knytte bekvemt.

### Browsere, WebSockets og samme oprindelse politik

Hjemmesider åbner i en web-browser kan gøre WebSocket og HTTP-anmodninger i henhold til den
browser-security modellen. En indledende HTTP-forbindelse er nødvendig for at opnå en
unikke debugger session-id. Det samme oprindelse-politik forhindrer hjemmesider i at blive
i stand til at gøre dette til HTTP-forbindelse. For ekstra sikkerhed mod
[DNS rebinding angreb](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
kontrollerer, at 'Host' - overskrifter for tilslutning enten
angiv en IP-adresse eller `localhost` eller `localhost6 " netop.

Disse sikkerheds-politikker afvise tilslutning til en ekstern debug server ved
angivelse af værtsnavn. Du kan arbejde omkring denne begrænsning ved at angive
enten IP-adresse eller ved at bruge ssh tunneler, som er beskrevet nedenfor.

## Inspektør Kunder

Flere kommercielle og open source værktøjer kan oprette forbindelse til Node-Inspektør. Grundlæggende
info om disse følger:

#### [node-inspicere](https://github.com/nodejs/node-inspect)

* CLI Debugger, der understøttes af Node.js Foundation, som bruger den [Inspektør Protocol][].
* En version er samlet med en Knude og kan bruges med `node inspicere myscript.js`.
* Den nyeste version kan også installeres uafhængigt af hinanden (fx `npm installere -g node-undersøg`)
og bruges med `node-kontrollere myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Løsning 1**: Åben " chrome://undersøg` i en Chrom-baseret
browser. Klik på knappen Konfigurer og sikrer dit mål host og port
er opført.
* **Mulighed 2**: Kopier `devtoolsFrontendUrl` fra produktionen af `/json/liste`
(se ovenfor) eller --inspicere antyde tekst og indsætte i Chrome.
* **Mulighed 3**: Installere Chrome Udvidelse, NIM (Node Inspektør Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* I Debug-panel, klik på indstillinger-ikonet for at åbne `.vscode/lancering.json`.
Vælg "Node.js" for første opsætning.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Vælg "Debug > Start Debugging" fra den menu, eller tast F5.
* [Detaljeret vejledning](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ og andre JetBrains IDEs

* Opret en ny Node.js debug-konfigurationen og ramte Debug. `--inspicere " vil blive brugt
 som standard for Node.js 7+. For at deaktivere skal du fjerne markeringen `js.debugger.node.brug.undersøg` i
IDE-Registreringsdatabasen.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Bibliotek til at lette forbindelser til Inspektør Protokol endepunkter.

---

## Kommandolinjeparametre

Den følgende tabel viser virkningen af forskellige runtime-flag på fejlretning:

<table cellpadding="0" cellspacing="0">
<tr><th>Flag</th><th>Betydning</th></tr>
<tr>
<td>--inspicere</td>
<td>
<ul>
<li>Aktivér inspektør agent</li>
<li>Lyt på standard-adresse og port (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--inspicere=<jeg>[host:port]</i></td>
<td>
<ul>
<li>Aktivér inspektør agent</li>
<li>Binder til adresse eller værtsnavn <i>vært</i> (standard: 127.0.0.1)</li>
<li>Lyt på port <i>port</i> (standard: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--inspicere-brk</td>
<td>
<ul>
<li>Aktivér inspektør agent</li>
<li>Lyt på standard-adresse og port (127.0.0.1:9229)</li>
<li>Pause, før du bruger koden begynder</li>
</ul>
</td>
</tr>
<tr>
<td>--inspicere-brk=<jeg>[host:port]</i></td>
<td>
<ul>
<li>Aktivér inspektør agent</li>
<li>Binder til adresse eller værtsnavn <i>vært</i> (standard: 127.0.0.1)</li>
<li>Lyt på port <i>port</i> (standard: 9229)</li>
<li>Pause, før du bruger koden begynder</li>
</ul>
</td>
</tr>
<tr>
<td><code>node inspicere <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn child proces til at køre brugerens script --inspicere flag;
og bruge vigtigste proces til at køre CLI debugger.</li>
</ul>
</td>
</tr>
<tr>
<td><code>node inspicere --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn child proces til at køre brugerens script --inspicere flag;
og bruge vigtigste proces til at køre CLI debugger.</li>
<li>Lyt på port <i>port</i> (standard: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Aktivering remote debugging scenarier

Vi anbefaler, at du aldrig har debugger lytte på en offentlig IP-adresse. Hvis
du er nødt til at tillade fjernfejlfinding forbindelser, anbefaler vi brug af ssh
tunneler i stedet. Vi tilbyder følgende eksempel til illustrative formål.
Bemærk at forstå sikkerhed risiko for at tillade ekstern adgang til en privilegeret
service før du fortsætter.

Lad os sige, at du kører Node på fjerncomputeren, remote.example.com, at du
ønsker at være i stand til at fejlrette. På denne maskine, skal du starte node proces
med inspektøren lytter kun til localhost (standard).

``bash
$ node --inspicere server.js
``

Nu, på din lokale maskine, hvor du ønsker at starte en debug-klient
forbindelse, kan du opsætte en ssh-tunnel:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Dette starter en ssh-tunnel-session, hvor en forbindelse til port 9221 på din lokale
maskinen vil blive sendt til port 9229 på remote.example.com. Du kan nu vedhæfte
en debugger som Chrome DevTools eller Visual Studio Kode for at localhost:9221,
der bør være i stand til at fejlrette, som om de Node.js programmet kører lokalt.

---

## Arv, Debugger

**Legacy debugger er blevet forældet som Node 7.7.0. Brug venligst --inspicere
og Inspektør i stedet for.**

Når de er startet med **--debug** eller **--debug-brk** skifter i version 7 og
tidligere Node.js lytter til debugging kommandoer, der er defineret ved at den ophørte
V8 Debugging-Protokollen på TCP-port som standard `5858`. Enhver debugger klient
der taler denne protokol kan oprette forbindelse til og fejlrette den løbende proces; en
par populære dem, der er anført nedenfor.

V8-Debugging-Protokollen er ikke længere vedligeholdes eller dokumenteret.

#### [Built-in Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start node debug script_name.js "til at starte dit script under Node' s indbyggede
kommando-linje debugger. Dit script starter i en anden Node proces i gang med
"--debug-brk` mulighed, og den første Node processen kører `_debugger.js`
script og opretter forbindelse til dit mål.

#### [node-inspektør](https://github.com/node-inspector/node-inspector)

Debug din Node.js app ' en med Krom DevTools ved hjælp af en mellemmand proces
hvilket svarer Inspektøren Protokol, der anvendes i Chrom til V8 Debugger
protokol, der anvendes i Node.js.

<!-- refs -->

[Inspektør Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122