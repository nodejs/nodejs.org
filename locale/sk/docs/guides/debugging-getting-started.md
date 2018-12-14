---
title: Mono - Začíname
layout: docs.hbs
---

# Ladenie Príručka

Táto príručka vám pomôže začať vyladenie Node.js aplikácie a skripty.

## Povoliť Inšpektor

Keď sa začalo s **--skontrolujte** prepínačom, Node.js proces počúva cez WebSockets
na diagnostické príkazy, ako sú definované v [Inšpektor Protokol][],
v predvolenom nastavení sa na hostiteľa a port 127.0.0.1:9229. Každý proces je tiež priradené
jedinečný [UUID][] (napr. `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inšpektor klientov, musí poznať a určiť, hostiteĺská adresa, port, a UUID pripojenie
na WebSocket rozhranie. Úplná adresa URL je
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, samozrejme závislé
o skutočných hosť a port a so správnym UUID pre stupňa.

Inšpektor tiež zahŕňa HTTP endpoint slúžiť metadáta o debuggee,
vrátane jeho WebSocket URL, UUID a Chrome DevTools URL. Získajte tento metaúdajov
zaslaním žiadosti HTTP "http://[host:port]/json/zoznam". To vráti
JSON objekt ako je nasledujúce; použitie "webSocketDebuggerUrl" majetok ako
Adresu URL na pripojenie priamo na Inšpektor.

<!-- eslint-preskočiť -->
``javascript
{
"description": "node.js stupňa",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "uzol",
"type": "uzol",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

A Node.js proces sa začal *bez* `--skontrolovat` môže byť tiež poučený na začiatku
počúvanie pre ladenie správy signalizácia to s " SIGUSR1` (na Linux a
OS X). Ako Uzol 7 toto aktivuje legacy Debugger API; v Uzle 8 a neskôr
bude aktivovať Inšpektor API.

---
## Bezpečnostné Dôsledky

Od ladiaci nástroj má plný prístup k Node.js výkonu prostredia, 
škodlivý herec schopný pripojiť sa k tomuto portu môže byť schopný vykonávať svojvoľné
kód v mene Uzol procesu. Je dôležité pochopiť, bezpečnostný
dôsledky toho, ladiaci nástroj port na verejné a súkromné siete.

### Vystavuje port ladenia verejne je nebezpečné

Ak ladiaci nástroj je viazaný na verejnú IP adresu, alebo, ak 0.0.0.0, všetky klientov, že
môže dosiahnuť vaša IP adresa bude môcť pripojiť ladiaci nástroj bez
obmedzenie a bude môcť spustiť ľubovoľný kód.

Predvolene `uzol --skontrolovat`, ktoré sa viaže na 127.0.0.1. Explicitne je potrebné zabezpečiť
verejnú IP adresu, alebo 0.0.0.0, atď., ak chcete povoliť externé pripojenia
na ladiaci nástroj. Pritom vám môže hroziť potenciálne významné bezpečnosť
hrozba. Odporúčame vám zabezpečiť vhodné brány firewall a ovládacie prvky prístupu, v objekte
aby sa zabránilo zabezpečenia expozície.

Pozrite si časť '[Umožniť vzdialené ladenie scenáre](#zapnutie-remote-ladenie-scenáre) na niektoré rady, ako
bezpečne umožniť vzdialené ladenie klientov pripojiť sa.

### Lokálne aplikácie mať plný prístup k inšpektor

Aj keď prepojíte inšpektor port na 127.0.0.1 (predvolené nastavenie), všetky aplikácie,
beží lokálne na vašom počítači, bude mať neobmedzený prístup. Je to dizajn
ak chcete povoliť miestne ladiace nástroje, aby byť schopní pripojiť pohodlne.

### Prehliadače, WebSockets a rovnakého pôvodu politiky

Webové stránky otvoriť webový prehliadač, môžete urobiť WebSocket a HTTP požiadavky podľa
bezpečnosť prehliadača model. Počiatočné HTTP súvislosti je potrebné získať
jedinečný nástroj na ladenie session id. Rovnakého pôvodu-politiky zabraňuje webových stránok, z toho
schopní urobiť tento HTTP pripojenia. Pre ďalšie zabezpečenie proti
[DNS rebinding útoky](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
overí, že "Host" hlavičky pre pripojenie buď
zadajte IP adresu alebo `localhost` alebo `localhost6` presne.

Tieto bezpečnostné politiky zakázať pripojenie k vzdialenej debug server
s uvedením názvu servera. Môžete obísť toto obmedzenie zadaním
buď IP adresu, alebo pomocou ssh tunelov, ako je opísané nižšie.

## Inšpektor Klientov

Niekoľko obchodných a open source nástroje, ktoré môžete pripojiť na Uzol je Inšpektor. Základné
info na tieto takto:

#### [uzol-skontrolujte](https://github.com/nodejs/node-inspect)

* CLI Ladiaci nástroj podporuje Node.js Nadácie, ktoré používa [Inšpektor Protokol][].
* Verzia je dodávaná s Uzol a môžu byť použité s `uzol nazerať myscript.js`.
* Najnovšia verzia môže byť tiež nainštalované samostatne (napr. `npm install-g uzol-skontrolovat`)
a používať " uzol-prezrieť myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Možnosť 1**: Otvoriť " chrome://skontrolovat` v Chróm-založené
prehliadač. Kliknite na tlačidlo Konfigurovať a zabezpečiť,, že vaša cieľová hosť a port
sú uvedené.
* **Voľba 2**: Kópiu "devtoolsFrontendUrl` z výstupu " /eu/zoznam"
(pozri vyššie) alebo --skontrolujte tip text a vložiť do prehliadača Chrome.
* **Možnosť 3**: Nainštalujte Rozšírenie prehliadača Chrome NIM (Uzol Inšpektor Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Kód](https://github.com/microsoft/vscode) 1.10+

* V Ladiaci panel, kliknite na ikonu nastavenia ak chcete otvoriť".vscode/spustenie.json`.
Vyberte "Node.js" pre počiatočné nastavenie.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Vyberte "Debug > Spustiť Ladenie" z menu alebo stlačte F5.
* [Podrobné pokyny](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ a iné JetBrains IDEs

* Vytvoriť nový Node.js debug konfigurácia a stlačte Ladenia. `--kontrolovať " sa používa
 v predvolenom nastavení Node.js 7+. Ak chcete zakázať, zrušte začiarknutie políčka " js.ladiaci nástroj.uzol.použitie.skontrolovat` v
IDE databázy Registry.

#### [chrome-remote-rozhranie](https://github.com/cyrus-and/chrome-remote-interface)

* Knižnica, jednoduchosť pripojenia na Inšpektor Protokol koncové body.

---

## Možnosti príkazového riadka

V nasledujúcej tabuľke sa uvádza vplyv rôznych runtime vlajky na ladenie:

<table cellpadding="0" cellspacing="0">
<tr><th>Vlajka</th><th>Zmysle</th></tr>
<tr>
<td>--skontrolujte</td>
<td>
<ul>
<li>Zapnúť inšpektor agent</li>
<li>Počúvať na predvolenú adresu a port (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--skontrolujte=<i>[host:port]</i></td>
<td>
<ul>
<li>Zapnúť inšpektor agent</li>
<li>Viažu na adresu alebo hostname <i>hosť</i> (default: 127.0.0.1)</li>
<li>Počúvať na porte <i>port</i> (default: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--kontrolovať-brk</td>
<td>
<ul>
<li>Zapnúť inšpektor agent</li>
<li>Počúvať na predvolenú adresu a port (127.0.0.1:9229)</li>
<li>Prestávku pred užívateľský kód začína</li>
</ul>
</td>
</tr>
<tr>
<td>--kontrolovať-brk=<i>[host:port]</i></td>
<td>
<ul>
<li>Zapnúť inšpektor agent</li>
<li>Viažu na adresu alebo hostname <i>hosť</i> (default: 127.0.0.1)</li>
<li>Počúvať na porte <i>port</i> (default: 9229)</li>
<li>Prestávku pred užívateľský kód začína</li>
</ul>
</td>
</tr>
<tr>
<td><code>uzol skontrolujte <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn dieťa proces spustiť používateľa skript podľa --skontrolujte vlajky;
a používať hlavný proces spustiť ladenie CLI.</li>
</ul>
</td>
</tr>
<tr>
<td><code>uzol skontrolujte --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn dieťa proces spustiť používateľa skript podľa --skontrolujte vlajky;
a používať hlavný proces spustiť ladenie CLI.</li>
<li>Počúvať na porte <i>port</i> (default: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Umožniť vzdialené ladenie scenáre

Odporúčame vám, aby ste nikdy ladiaci nástroj vypočuť na verejnú IP adresu. Ak
musíte umožniť vzdialené ladenie pripojenia odporúčame použitie ssh
tunely miesto. Poskytujeme nasledujúce príklad len pre ilustračné účely.
Vezmite prosím na vedomie bezpečnostné riziko umožnenie vzdialeného prístupu k privilegovaným
servis predtým, ako budete pokračovať.

Povedzme, že používate Uzol na vzdialený stroj, remote.example.com, že ste
chcete byť schopní ladenia. Na to, že stroj, mali by ste začať uzol procesu
s inšpektor počúvanie len na localhost (predvolené nastavenie).

``bash
$ uzol --nazerať server.js
``

Teraz, na vašom počítači, kde chcete začať ladiť klienta
spojenie, môžete nastaviť ssh tunel:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

To začína ssh tunela, relácie, kde pripojenie na port 9221 na lokálnej
stroj bude odovzdaný do prístavu na 9229 remote.example.com. Teraz môžete pripojiť
ladiaceho nástroja, napríklad Chrome DevTools alebo Visual Studio Kód localhost:9221,
ktorá by mala byť schopná debug ako keby Node.js aplikácia bola spustená lokálne.

---

## Legacy Debugger

**Legacy ladiaci nástroj bol zavrhované ako Uzol 7.7.0. Prosím, použite --nazerať
a Inšpektor miesto.**

Keď sa začalo s **--debug** alebo **--debug-brk** spínača vo verzii 7 a
skôr, Node.js počúva príkazy pre ladenie definovaná ukončené
V8 Ladenie Protokol na TCP port, štandardne `5858`. Všetky ladiaci nástroj klienta
čo hovorí tento protokol sa môžu pripojiť k a ladenie bežiaci proces; 
pár populárne nich sú uvedené nižšie.

V8 Ladenie Protokol je už netrvá, alebo zdokumentované.

#### [Zabudovaný nástroj na Ladenie](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `uzol ladenie script_name.js " spustíte skript pod Uzol je zabudovaný
command-line ladiaci nástroj. Váš skript spustí v inom Uzle proces sa začal s
`--debug-brk` voľbu a počiatočný Uzol proces prebieha " _debugger.js`
skript a pripája sa k vášmu cieľu.

#### [uzol-inšpektor](https://github.com/node-inspector/node-inspector)

Ladenie vášho Node.js aplikácia s Chrome DevTools pomocou sprostredkovateľa procesu
čo sa premietlo Inšpektor Protokol, používaný v Chróm pre V8 Debugger
protokol používaný v Node.js.

<!-- refs -->

[Inšpektor Protokol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122