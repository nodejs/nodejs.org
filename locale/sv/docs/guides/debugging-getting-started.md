---
avdelning: felsökning-komma igång
layout: dokument.hbs
---

# Felsökning Guide

Denna guide hjälper dig att komma igång felsökning din nod.JS appar och skript.

## Aktivera Inspektör

När du börjar med **--inspect** switch, en nod.js process lyssnar via WebSockets
för diagnostiska kommandon enligt definitionen i [Inspector Protocol][],
som standard på värd och port 127.0.0.1: 9229. Varje process tilldelas också en
unikt [UUID][] (t ex `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektörsklienterna måste känna till och ange värdadress, port och UUID för att ansluta
till WebSocket-gränssnittet. Den fullständiga webbadressen är
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, givetvis beroende
på faktiska värd och port och med rätt UUID för instansen.

Inspektören innehåller också en HTTP-slutpunkt för att visa metadata om debuggee,
inklusive dess WebSocket URL, UUID, och Chrome DevTools URL. Hämta denna metadata
genom att skicka en HTTP-begäran till "http://[host: port] / json / list".  Detta returnerar en
JSON-objekt som följande; Använd egenskapen webSocketDebuggerUrl som
URL för att ansluta direkt till inspektören.

<!-- eslint-hoppa -->
``javascript
{
  "description": "nod.JS instans",
  "devtoolsFrontendUrl": "chrome-devtools://devtools/buntas/inspektör.html?experimenten=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "title": "nod",
  "type": "nod",
  "url": "fil://",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

nod.js process started * utan * '--inspect ' kan också instrueras att starta
lyssna efter felsökning meddelanden genom att signalera det med "SIGUSR1" (på Linux och
OS X). Från och med nod 7 aktiverar detta äldre debugger API; i Nod 8 och senare
det kommer att aktivera Inspector API.

---
## Säkerhet Konsekvenser

Eftersom debugger har full tillgång till noden.JS execution environment, a
skadlig skådespelare som kan ansluta till den här porten kan kunna exekvera godtyckligt
kod på uppdrag av Nodprocessen. Det är viktigt att förstå säkerheten
konsekvenserna av att exponera debugger-porten på offentliga och privata nätverk.

### Exponera felsökningsporten offentligt är osäker

Om felsökaren är bunden till en offentlig IP-adress, eller till 0.0.0.0, några kunder som
kan nå din IP-adress kommer att kunna ansluta till debugger utan någon
begränsning och kommer att kunna köra godtycklig kod.

Som standard `node --inspect` binder till 127.0.0.1. Du behöver uttryckligen tillhandahålla en
offentlig IP-adress eller 0.0.0.0, etc., om du tänker tillåta externa anslutningar
till debugger. Gör så kan utsätta dig en potentiellt betydande säkerhet
hot. Vi föreslår att du säkerställer lämpliga brandväggar och åtkomstkontroller på plats
för att förhindra en säkerhetsexponering.

Se avsnittet "[Aktivera fjärrfelsökningsscenarier] (#aktivera-fjärrfelsökning-scenarier) " på några råd om hur
för att säkert tillåta fjärrdebuggerklienter att ansluta.

### Lokala program har full tillgång till inspektören

Även om du binder inspector-porten till 127.0.0.1 (standard), alla program
kör lokalt på din maskin kommer att ha obegränsad tillgång. Detta är genom design
för att tillåta lokala felsökare att kunna bifoga bekvämt.

### Webbläsare, WebSockets och Policy för samma ursprung

Webbplatser öppnas i en webbläsare kan göra WebSocket och HTTP-förfrågningar under
webbläsare säkerhetsmodell. En initial HTTP-anslutning är nödvändig för att erhålla en
unik debugger session id. Principen om samma ursprung hindrar webbplatser från att
kunna göra denna HTTP-anslutning. För ytterligare säkerhet mot
[DNS-rebinding attacker](https://en.wikipedia.org/wiki/DNS_rebinding), Nod.js
verifierar att "värd" rubriker för anslutningen antingen
ange en IP-adress eller "localhost" eller "localhost6" exakt.

Dessa säkerhetspolicyer tillåter inte anslutning till en fjärrfelsökningsserver av
ange värdnamnet. Du kan arbeta runt denna begränsning genom att ange
antingen IP-adressen eller genom att använda SSH-tunnlar enligt beskrivningen nedan.

## Inspektörsklienter

Flera kommersiella och öppna källverktyg kan ansluta till nodes inspektör. Grundläggande
info om dessa följer:

#### [nod-inspektera](https://github.com/nodejs/node-inspect)

* CLI Debugger stöds av noden.JS Foundation som använder [Inspector Protocol] [].
* En version levereras med nod och kan användas med " node inspektera myscript.js`.
* Den senaste versionen kan också installeras oberoende (t. ex. "npm install - g node-inspect")
  och används med " node-inspektera myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* * * Alternativ 1**: Öppna "chrome: / / inspect" i en krombaserad
  webbläsare. Klicka på knappen Konfigurera och se till att din målvärd och port
  är listade.
** * Alternativ 2**: kopiera "devtoolsFrontendUrl" från utgången av " / json / lista`
  (se ovan) eller --inspektera ledtråd text och klistra in i Chrome.
* **Alternativ 3**: Installera Chrome Extension NIM (Nod Inspektör Manager):  
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Kod](https://github.com/microsoft/vscode) 1.10+

* I Felsökningspanelen klickar du på ikonen Inställningar för att öppna'.vscode / starta.json.
  Välj " Node.js " för första installationen.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Välj "Debug > starta felsökning" från menyn eller tryck på F5.
* [Detaljerade instruktioner](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ och andra JetBrains IDEs

* Skapa en ny nod.JS debug konfiguration och tryck Debug. '--inspect ' kommer att användas
  som standard för nod.js 7+. Om du vill inaktivera avmarkera `js.felsökare.nod.använda.inspektera " i
  Ide-registret.

#### [chrome-remote-gränssnitt](https://github.com/cyrus-and/chrome-remote-interface)

* Bibliotek för att underlätta anslutningar till Inspector Protocol endpoints.

---

## Kommandoradsalternativ

I följande tabell visas effekterna av olika runtime flaggor på Felsökning:

<table cellpadding="0" cellspacing="0">
  <tr> < th>flagga < / th> < th>betydelse < /th>< / tr>
  <tr>
    < td>--inspektera< / td>
    <td>
      <ul>
        < li>aktivera inspektör agent< / li>
        < li>lyssna på standardadress och port (127.0.0.1:9229)< / li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspektera=<jag>[värd:port]</i></td>
    <td>
      <ul>
        < li>aktivera inspektör agent< / li>
        < li>Bind till adress eller värdnamn <i>värd< / i> (standard: 127.0.0.1)</li>
        < li>lyssna på port <i > port < / i> (standard: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspektera-brk</td>
    <td>
      <ul>
        < li>aktivera inspektör agent< / li>
        < li>lyssna på standardadress och port (127.0.0.1:9229)< / li>
        < li>Bryt innan användarkoden startar< / li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspektera-brk=<jag>[värd:port]</i></td>
    <td>
      <ul>
        < li>aktivera inspektör agent< / li>
        < li>Bind till adress eller värdnamn <i>värd< / i> (standard: 127.0.0.1)</li>
        < li>lyssna på port <i > port < / i> (standard: 9229)</li>
        < li>Bryt innan användarkoden startar< / li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>nod inspektera < i>script.js< / I></code></td>
    <td>
      <ul>
        <li>Spawn barn processen att köra användarens manus under --inspektera flagga;
            och använd huvudprocessen för att köra CLI debugger.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>nod inspektera --port=xxxx <i>manus.js< / I></code></td>
    <td>
      <ul>
        <li>Spawn barn processen att köra användarens manus under --inspektera flagga;
            och använd huvudprocessen för att köra CLI debugger.</li>
        < li>lyssna på port <i > port < / i> (standard: 9229)</li>
      </ul>
    </td>
  </tr>
</tabell>

---

## Aktivera fjärrfelsökningsscenarier

Vi rekommenderar att du aldrig har debugger lyssna på en offentlig IP-adress. Om
du måste tillåta fjärrfelsökning anslutningar vi rekommenderar användning av SSH
tunnlar istället. Vi ger följande exempel endast för illustrativa ändamål.
Vänligen förstå säkerhetsrisken för att tillåta fjärråtkomst till en privilegierad
service innan du fortsätter.

Låt oss säga att du kör nod på fjärrmaskinen, remote.example.com, att du
vill kunna felsöka. På den maskinen bör du starta nodprocessen
med inspektören lyssnar bara på localhost (standard).

`"bash
$ node -- inspektera servern.js
``

Nu, på din lokala maskin från där du vill initiera en felsökningsklient
anslutning, kan du ställa in en SSH tunnel:

`"bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Detta startar en SSH tunnel session där en anslutning till port 9221 på din lokala
maskinen kommer att vidarebefordras till port 9229 på remote.example.com. Du kan nu bifoga
en debugger som Chrome DevTools eller Visual Studio Kod till localhost:9221,
som ska kunna felsöka som om noden.JS ansökan kördes lokalt.

---

## Legacy Debugger

** Den äldre felsökaren har avskrivits från nod 7.7.0. Använd -- inspektera
och inspektören istället.**

När den startas med **--debug** eller **--debug-brk** växlar i version 7 och
tidigare, Nod.js lyssnar på felsökningskommandon som definieras av de avvecklade
V8 Felsökning Protokoll på en TCP-port som standard `5858`. Alla debugger klient
som talar detta protokoll kan ansluta till och felsöka körprocessen; en
par populära är listade nedan.

V8 felsökning protokollet inte längre underhålls eller dokumenteras.

#### [Inbyggd Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Starta ' node debug script_name.js ' för att starta ditt skript under nodes inbyggda
kommandoradsdebugger. Skriptet startar i en annan Nodprocess som startas med
alternativet '--debug-brk 'och den ursprungliga Nodprocessen kör' _debugger.js`
script och ansluter till ditt mål.

#### [nod-inspektör](https://github.com/node-inspector/node-inspector)

Felsöka din nod.js app med Chrome DevTools med hjälp av en mellanhandsprocess
som översätter Inspektörsprotokollet som används i krom till V8 Debugger
protokoll som används i Nod.js.

<!-- refs -->

[Inspektörsprotokoll]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[HÄR]: https://tools.ietf.org/html/rfc4122