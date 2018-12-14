---
title: Hibakeresés - az első lépések
layout: docs.hbs
---

# Hibakeresési Útmutató

Ez az útmutató segít elindulni a hibakeresés Node.js alkalmazások, valamint a forgatókönyveket.

## Engedélyezése Felügyelő

Mikor kezdődött a **--ellenőrizze** kapcsoló, Node.js a folyamat figyel keresztül WebSockets
a diagnosztikai parancsok által meghatározott [a Felügyelő Protokoll][],
alapértelmezés szerint a host, port 127.0.0.1:9229. Minden folyamat is rendelni.
egyedi [UUID][] (pl. `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Felügyelő költségtérítést kell tudni, majd adja meg a fogadó cím, port, UUID csatlakozni
a WebSocket felület. A teljes URL
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, természetesen függ
a tényleges host, port, valamint a megfelelő UUID az esetben.

Felügyelő is magában foglalja HTTP végpont szolgálni metaadatok a debuggee,
beleértve a WebSocket URL UUID, Chrome DevTools URL-t. Ezt a metaadat
küld egy HTTP kérést, `http://[host:port]/json/list`. Ennek eredménye egy
JSON objektum, mint a következő; a `webSocketDebuggerUrl` tulajdonság, mint a
URL csatlakoztassa közvetlenül Felügyelő.

<!-- eslint-skip -->
``javascript
{
"description": "node.js például az",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
a "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "csomópont",
az "type": "csomópont",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

Egy Node.js a folyamat elkezdődött *nélkül* `--vizsgálja meg` is utasította, hogy a start
hallgat hibakeresési üzenetek által jelzett `SIGUSR1` (Linux alatt, valamint
OS X). A Csomópont 7 ez aktiválja a legacy Debugger API; a Csomópont 8 vagy újabb
ez aktiválja a Felügyelő API.

---
## Biztonsági Vonatkozásai

Mivel a debugger teljes hozzáférése van a Node.js végrehajtási környezetben, egy
rosszindulatú színész képes csatlakozni ehhez a porthoz lehet, hogy végre tetszőleges
kód nevében a Csomópont folyamat. Fontos megérteni, hogy a biztonsági
következményei kiteszik a debugger port a nyilvános vagy személyes hálózatokhoz.

### Kiteszik a debug port nyilvánosan nem biztonságos

Ha a debugger van kötve, hogy egy nyilvános IP-cím, vagy 0.0.0.0, semmilyen költségtérítést, hogy
elérheti az IP-cím lesz képes csatlakozni a debugger nélkül
korlátozás, illetve képes lesz arra, hogy tetszőleges kód futtatását.

Alapértelmezés szerint a `csomópont-ellenőrizze` kötődik a 127.0.0.1. Külön meg kell adni
nyilvános IP-cím, vagy 0.0.0.0, stb. ha az a szándékod, hogy a külsõ kapcsolatok
a debugger. Ha így tesz ki, egy potenciálisan jelentős biztonsági
fenyegetés. Javasoljuk, hogy biztosítják a megfelelő tűzfal, valamint a hozzáférési ellenőrzések hely
hogy megakadályozza a biztonsági expozíció.

Lásd a '[, amely Lehetővé teszi a távoli hibakeresés forgatókönyvek](#engedélyezése-távirányító-hibakeresés-forgatókönyvek) néhány tanácsot, hogyan
biztonságosan allow remote debugger költségtérítést csatlakozni.

### A helyi alkalmazások teljes hozzáférés a felügyelő

Akkor is, ha kötődik a felügyelő port 127.0.0.1 (az alapértelmezett), akkor bármilyen alkalmazások
futó helyben a gép korlátlan hozzáférés. Ez a design
hogy lehetővé teszi a helyi debuggers, hogy képes lesz arra, hogy csatolja kényelmesen.

### Böngészők, WebSockets, azonos eredetű politika

Weboldalak nyissa meg a web-böngészőt, hogy WebSocket, valamint a HTTP-kérelmek alapján
böngésző biztonsági modell. Kezdeti HTTP kapcsolat szükséges ahhoz, hogy egy
egyedi debugger session id-t. Az azonos eredetű,-a házirend megakadályozza, hogy a webhelyek, hogy
képes arra, hogy ez a HTTP-kapcsolatot. További biztonsági ellen
[DNS-akkor az nem érinti a támadások](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
ellenőrzi, hogy a "Házigazda", fejlécek, a kapcsolat vagy
adjon meg egy IP-címet vagy `localhost`, vagy `localhost6` pontosan.

Ezek a biztonsági házirendek letiltja a csatlakozás távoli hibakeresés a kiszolgáló által
meghatározza a hálózati név. Dolgozhat-e körül korlátozásának megadásával,
vagy az IP-címet vagy ssh alagutakat, az alább leírtak szerint.

## Felügyelő Költségtérítést

Több kereskedelmi, valamint a nyílt forráskódú eszközök csatlakoztathatók Csomópont Felügyelő. Alap
infó ezek a következők:

#### [node-ellenőrizze](https://github.com/nodejs/node-inspect)

* CLI Debugger által támogatott Node.js Alapítvány, amely a [Felügyelő Protokoll][].
* Egy változat csomagban Csomópont is használható a `csomópont ellenőrizze myscript.js`.
* A legújabb verzió is telepíthető önállóan (pl. `npm install-g csomópont-ellenőrizze`)
használt a `csomópont-ellenőrizze myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Lehetőség 1**: Nyisd ki a chrome://vizsgáljuk meg a Króm-alapú
böngésző. Kattintson a Konfigurálás gombra, majd biztosítsa, hogy a megcélzott host, port
vannak felsorolva.
* **Lehetőség 2**: Másolja a `devtoolsFrontendUrl` kimenet `/json/list`
(lásd fent), vagy a ... ellenőrizze tipp szöveget, majd illessze be a Chrome-ot.
* **Lehetőség 3**: Telepítse a Chrome Kiterjesztés NIM (Csomópont Felügyelő Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Kód](https://github.com/microsoft/vscode) 1.10+

* A Debug panelen, kattintson a beállítások ikonra, hogy nyissa meg `.vscode/dob.json`.
Válassza ki a "Node.js" a kezdeti beállítás.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Válassza ki a "Debug > Start Debugging" menüből, vagy nyomja meg az F5 billentyűt.
* [Részletes útmutató](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ egyéb JetBrains IDEs

* Hozzon létre egy új Node.js debug konfiguráció, majd nyomja Debug. `--vizsgálja meg` fogja használni
 alapértelmezés szerint Node.js 7+. Letiltásához törölje `js.debugger.node.használja.ellenőrizze` 
az IDE Rendszerleíró.

#### [chrome-távirányító-interfész] elemet(https://github.com/cyrus-and/chrome-remote-interface)

* A könyvtár, hogy könnyű kapcsolatokat Felügyelő Jegyzőkönyv végpontok.

---

## Parancssori opciók

A következő táblázat felsorolja a hatása a különböző futási a zászlók, hibakeresés:

<table cellpadding="0" cellspacing="0">
<tr><th>Zászló</th><th>Azaz</th></tr>
<tr>
<td>--ellenőrizze</td>
<td>
<ul>
<li>Engedélyezés felügyelő ügynök</li>
<li>Figyelj alapértelmezett cím, port (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--ellenőrizze=<én>[host:port]</i></td>
<td>
<ul>
<li>Engedélyezés felügyelő ügynök</li>
<li>Kötődik a cím vagy név <->host</i> (alapértelmezett: 127.0.0.1)</li>
<li>Figyelj a port <én>port</i> (alapértelmezett: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--ellenőrizze-brk</td>
<td>
<ul>
<li>Engedélyezés felügyelő ügynök</li>
<li>Figyelj alapértelmezett cím, port (127.0.0.1:9229)</li>
<li>Szünetet, mielőtt felhasználói kód kezdődik,</li>
</ul>
</td>
</tr>
<tr>
<td>--ellenőrizze-brk=<én>[host:port]</i></td>
<td>
<ul>
<li>Engedélyezés felügyelő ügynök</li>
<li>Kötődik a cím vagy név <->host</i> (alapértelmezett: 127.0.0.1)</li>
<li>Figyelj a port <én>port</i> (alapértelmezett: 9229)</li>
<li>Szünetet, mielőtt felhasználói kód kezdődik,</li>
</ul>
</td>
</tr>
<tr>
<td><code>node vizsgálja meg <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn gyermek folyamat futtatásához felhasználó forgatókönyvet ... vizsgálja meg a zászlót;
használja fő folyamat futtatásához CLI debugger.</li>
</ul>
</td>
</tr>
<tr>
<td><code>node ellenőrizze --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn gyermek folyamat futtatásához felhasználó forgatókönyvet ... vizsgálja meg a zászlót;
használja fő folyamat futtatásához CLI debugger.</li>
<li>Figyelj a port <én>port</i> (alapértelmezett: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Amely lehetővé teszi a távoli hibakeresés forgatókönyvek

Javasoljuk, hogy soha nem a debugger figyelj egy publikus IP-címet. Ha
meg kell, hogy távoli hibakeresés kapcsolatok javasoljuk, hogy az ssh
alagút helyett. Mi biztosítja a következő példa illusztrációk.
Kérem, értsék meg, hogy a biztonsági kockázat, amely lehetővé teszi a távoli hozzáférést, hogy egy privilegizált
a szolgáltatás megkezdése előtt.

Tegyük fel, hogy fut Csomópont a távoli gép, remote.example.com,, hogy
szeretné, hogy képes elhárítani. Azt a gépet, meg kell kezdeni a csomópont folyamat
a felügyelő figyel csak a localhost (az alapértelmezett).

``bash
$ node vizsgálja meg, hogy ... server.js
``

Most, a helyi gép, honnan szeretné, hogy kezdeményezzen egy debug ügyfél
kapcsolat, akkor telepítés ssh-alagúton:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Ez elindít egy ssh session, ahol egy kapcsolat port 9221 a helyi
gép lesz továbbított port 9229 a remote.example.com. Most már csatolja
egy debugger, mint a Chrome DevTools vagy Visual Studio Kód localhost:9221,
ami képesnek kell lennie arra, hogy a hibakeresés, mint ha a Node.js alkalmazás fut helyben.

---

## Legacy Debugger

**Az örökség debugger már elavult, mint a Csomópont 7.7.0. Kérjük, használja vizsgálja meg, hogy ... 
úr helyett.**

Mikor kezdődött a **--debug** vagy **--debug-brk** kapcsolók a 7-es verzió,
korábban Node.js hallgat a hibakeresés parancsok által meghatározott megszűnt
V8-as Hibakeresés Protokoll, a TCP port, alapértelmezés szerint `5858`. Minden debugger ügyfél
ami beszél ez a jegyzőkönyv tud csatlakozni, illetve debug a futó folyamat; 
néhány népszerű, akik az alább felsorolt.

A V8-as Hibakeresés Jegyzőkönyv már nem tartjuk karban, vagy dokumentált.

#### [Beépített Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `csomópont debug script_name.js hogy indítsa el a forgatókönyvet alatt Csomópont beépített
parancssori debugger. A script-ben kezdődik, egy másik Csomópont a folyamat azzal kezdődött, hogy
a `--debug-brk` opció, az első Csomópont folyamat fut a `_debugger.js`
script, majd csatlakozik a cél.

#### [node-felügyelő](https://github.com/node-inspector/node-inspector)

A Debug Node.js az alkalmazást a Chrome DevTools segítségével közvetítő folyamat
ami azt jelenti, hogy a Felügyelő használt Protokoll a Króm, hogy a V8-as Debugger
jegyzőkönyv használt Node.js.

<!-- bíró -->

[Felügyelő Jegyzőkönyv]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122