---
title: debuggen-starten
layout: docs.hbs
---

# Debuggids

Deze gids zal u helpen met het debuggen van uw Node.js apps en scripts.

# Inspecteur Inschakelen

Wanneer gestart met de **--inspecteer** switch, een Node.js-proces luistert via WebSockets
voor diagnostische opdrachten zoals gedefinieerd in het [Inspector Protocol][],
standaard bij host en poort 127.0.0.1: 9229. Elk proces krijgt ook een
Wanneer Node.js gestart wordt met de **--inspect** switch, luistert het process via WebSockets
voor diagnostische opdrachten zoals gedefinieerd in het [Inspector Protocol][],
standaard op host en poort 127.0.0.1:9229. Elk proces krijgt ook een
uniek [UUID] [] (bv. "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e").

Inspecteur clients moeten host adres, poort en UUID kennen en specificeren om verbinding te maken
naar de WebSocket interface. De volledige URL is
"ws:/ / 127.0.0.1: 9229 / 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e", natuurlijk afhankelijk
op de werkelijke host en poort en met de juiste UUID voor de instantie.

Inspecteur omvat ook een HTTP-eindpunt om metadata over de debuggee te dienen,
met inbegrip van de URL van WebSocket, UUID, en Chrome DevTools URL. Haal deze metadata
door een HTTP-verzoek te sturen naar `http://[host:port]/json/list`.  Dit geeft een
JSON object als het volgende; gebruik de eigenschap 'webSocketDebuggerUrl' als de
URL om direct met Inspecteur te verbinden.

<!-- eslint-skip -->
"'javascript
{
  "beschrijving": "node.js instantie",
  "devtoolsFrontendUrl": "chrome-devtools:/ / devtools/bundled / inspector.html?experimenten=true&v8only=true&ws=127.0.0.1: 9229 / 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "titel": "node",
  "type": "node",
  "url": "bestand://",
  "webSocketDebuggerUrl": "ws:/ / 127.0.0.1: 9229 / 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

Een Knooppunt.js proces gestart *zonder * '--inspection ' kan ook geïnstrueerd worden om te starten
luisteren naar debugberichten door het te signaleren met ' SIGUSR1` (op Linux en
OS X). Vanaf Node 7 activeert dit de Legacy Debugger API; in Node 8 en later
het zal de inspecteur API activeren.

---
## Veiligheidsimplicaties

Aangezien de debugger volledige toegang heeft tot de Node.js uitvoeringsomgeving, a
kwaadwillige actor in staat om verbinding te maken met deze poort kan in staat zijn om willekeurig uit te voeren
code namens het Nodeproces. Het is belangrijk om de veiligheid te begrijpen
gevolgen van het blootstellen van de debuggerhaven op openbare en particuliere netwerken.

### Het blootstellen van de debug poort is onveilig

Als de debugger gebonden is aan een openbaar IP adres, of aan 0,0.0.0,
kan uw IP-adres bereiken zal in staat zijn om verbinding te maken met de debugger zonder enige
beperking en zal in staat zijn om willekeurige code uit te voeren.

Standaard` node --inspection ' bindt aan 127.0.0.1. U moet expliciet een
openbaar IP-adres of 0,0.0.0, enz., als u van plan bent om externe verbindingen toe te staan
op de debugger. Als je dat doet, kan je een potentieel belangrijke beveiliging ontmaskeren.
bedreiging. Wij stellen voor dat u zorgt voor de juiste firewalls en toegangscontrole op zijn plaats
om blootstelling aan beveiliging te voorkomen.

Zie het deel over '[het inschakelen van debuggingsscenario 's op afstand] (#het inschakelen van-remote-debuggingsscenario' s) ' op wat advies over hoe
om veilig debugger clients op afstand te kunnen verbinden.

### Lokale applicaties hebben volledige toegang tot de inspecteur

Zelfs als u de inspecteur poort bindt aan 127.0.0.1 (de standaard), zijn er toepassingen
lokaal draaien op uw machine heeft onbeperkte toegang. Dit is met opzet
om lokale debuggers in staat te stellen om gemakkelijk te bevestigen.

### Browsers, WebSockets en zelfde-origin beleid

Websites openen in een webbrowser kunnen WebSocket en HTTP verzoeken onder de
browser beveiligingsmodel. Een initiële HTTP-verbinding is nodig om een
unieke debugger sessie id. Hetzelfde-origin-beleid voorkomt dat websites
in staat om deze HTTP verbinding te maken. Voor aanvullende zekerheid tegen
[DNS rebinding aanvalt] (https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
controleert of de "Host" headers voor de verbinding hetzij
Specificeer een IP-adres of `localhost` of `localhost6` precies.

Dit beveiligingsbeleid staat verbinding met een debug server op afstand niet toe door
de hostnaam specificeren. U kunt werken-rond deze beperking door te specificeren
het IP-adres of door gebruik te maken van ssh-tunnels zoals hieronder beschreven.

## Inspector Clients

Verschillende commerciële en open source tools kunnen verbinding maken met Node ' s Inspector. Basic
informatie hierover:

#### [knooppunt-inspecteren](https://github.com/nodejs/node-inspect)

* Clip Debugger ondersteund door de Node.js Foundation die gebruik maakt van het [Inspector Protocol][].
* Een versie is gebundeld met Node en kan gebruikt worden met `node inspecteer myscript.js'.
* De laatste versie kan ook onafhankelijk worden geïnstalleerd (bv. ' npm install-g node-Inspector`))
  en gebruikt met ' node-inspecteer myscript.js'.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* Optie 1: Open 'chroom: / / inspecteren' in een chroom-gebaseerde
  browser. Klik op de knop Configureren en zorg ervoor dat uw doel host en poort
  zijn vermeld.
* Optie 2: kopieer de 'devtoolsFrontendUrl' uit de output van ' /json / list`
  (zie hierboven) of de --inspecteer hint tekst en plak in chroom.
* Optie 3: Installeer de Chrome Extension NIM (Node Inspector Manager):  
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1,10+

* In het Debugpaneel, klik op het instellingen pictogram om te openen'.vscode / lancering.json.
  Selecteer " Node.js " voor de eerste setup.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Kies "Debug > Start Debugging" uit het menu of druk op F5.
* [Gedetailleerde instructies](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017,1+ en andere JetBrains IDEs

* Maak een nieuwe Node.js debug configuratie en klik op Debug. '--inspection ' wordt gebruikt
  standaard voor Node.js 7+. Om uncheck `J ' s uit te schakelen.foutopsporingsprogramma.knooppunt.gebruik.inspecteren
  het IDE register.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Library to ease connections to Inspector Protocol endpoints.

---

## Opdrachtregeloptie

De volgende tabel geeft een overzicht van de impact van verschillende runtime vlaggen op debuggen:

<table cellpadding= " 0 "cellspacing= "0">
  <tr><th>vlag</th><th> Betekenis</th></tr>
  <tr>
    <td>--inspecteer</td>
    <td>
      <ul>
        <li>Inspecteur agent </li>inschakelen
        <li>luister naar standaard adres en poort (127.0.0.1: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspection=<i>[host: port]</i></td>
    <td>
      <ul>
        <li>Inspecteur agent </li>inschakelen
        <li>binden aan adres of hostnaam <i>host</i> (standaard: 127.0.0.1)</li>
        <li>luisteren op poort<i>Poort </i> (standaard: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspection-brk</td>
    <td>
      <ul>
        <li>Inspecteur agent </li>inschakelen
        <li>luister naar standaard adres en poort (127.0.0.1: 9229)</li>
        < li>breken voordat de gebruikerscode begint</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspection-brk=<i>[host: port]< / i></td>
    <td>
      <ul>
        <li>Inspecteur agent < /li>inschakelen
        <li>binden aan adres of hostnaam <i>host</i> (standaard: 127.0.0.1)</li>
        <li>luisteren op poort<i>Poort </i> (standaard: 9229)</li>
        <li>breken voordat de gebruikerscode begint</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspecteer <i>script.js</i></code></td>
    <td>
      <ul>
        <li>Spawn child proces om gebruikersscript te draaien onder --inspecteer vlag;
            en gebruik het hoofdproces om Clip debugger te draaien.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspecteren --port=xxxx<i>script.js</i></code></td>
    <td>
      <ul>
        <li>Spawn child proces om gebruikersscript te draaien onder --inspecteer vlag;
            en gebruik het hoofdproces om Clip debugger te draaien.</li>
        <li>luisteren op poort<i>Poort</i> (standaard: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## Debug-scenario ' s op afstand inschakelen

Wij raden u aan om de debugger nooit te laten luisteren op een openbaar IP-adres. Als
u moet op afstand debugverbindingen toestaan Wij raden het gebruik van ssh aan
tunnels in plaats daarvan. Wij geven het volgende voorbeeld alleen ter illustratie.
Begrijp het veiligheidsrisico van het toestaan van toegang op afstand tot een bevoorrechte
service alvorens verder te gaan.

Stel dat je knooppunt draait op een machine op afstand. remote.example.com, dat u
wil in staat zijn om te debuggen. Op die machine moet je het node proces starten.
de inspecteur luistert alleen naar localhost (the default).

"'bash
$ node -- inspecteer server.js
``

Nu, op uw lokale machine van waar u een debug client wilt starten
verbinding, U kunt een ssh tunnel installeren:

"'bash
 SSH-l 9221: localhost: 9229 user@remote.example.com
``

Dit begint een SSH tunnel sessie waar een verbinding met port 9221 op uw lokale
de machine wordt doorgestuurd naar port 9229 op remote.example.com. U kunt nu
een debugger zoals Chrome DevTools of Visual Studio Code naar localhost: 9221,
die in staat moet zijn om te debuggen als de Node.js toepassing werd lokaal uitgevoerd.

---

# Legacy Debugger

** De legacy debugger is afgekeurd als van Node 7.7.0. Gebruik alsjeblieft --inspecteer
en inspecteur in plaats daarvan.**

Wanneer gestart met de** --debug **of** --debug-brk * * schakelt in versie 7 en
eerder, Node.js luistert naar debug commando 's gedefinieerd door de beëindigde commando' s
V8 Debugging Protocol op een TCP-poort, standaard '5858'. Elke debugger client
wat spreekt dit protocol kan verbinding maken met en debuggen van het lopende proces; een
een paar populaire zijn hieronder vermeld.

Het V8 Debuggingsprotocol wordt niet langer onderhouden of gedocumenteerd.

#### [Ingebouwde Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

'Node debug script_name starten.js ' om je script te starten onder de ingebouwde Node
commandoregel debugger. Uw script begint in een ander Node proces begonnen met
de optie '--debug-brk `en het eerste Nodeproces draaien de '_debugger'.js`
script en verbinding met je doel.

#### [knooppunt-Inspecteur](https://github.com/node-inspector/node-inspector)

Debug je Node.js app met Chrome DevTools door middel van een intermediair proces
wat het in chroom gebruikte Inspectorprotocol vertaalt naar de V8-Debugger.
protocol gebruikt in Node.js.

<!-- ref ' s -->

[Inspecteur Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
