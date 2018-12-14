---
název: Ladění - začínáme
dispozice: docs.hbs
---

# Ladění Průvodce

Tato příručka vám pomůže začít ladění Node.js aplikace a skripty.

## Povolit Inspektor

Když se to začalo s ** - zkontrolujte** přepínání, Node.js proces naslouchá přes WebSockets
pro diagnostické příkazy definované [Inspektor Protokol][],
ve výchozím nastavení se na hostitele a port 127.0.0.1:9229. Každý proces je také přiřazena
jedinečný [UUID][] (např. 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektor klienti musí vědět, a určit, hostitelská adresa, port, a UUID pro připojení
na WebSocket rozhraní. Celé URL
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, samozřejmě závislá
na skutečné hostitele a port a s správné UUID instance.

Inspektor také zahrnuje HTTP koncového bodu slouží metadata o debuggee,
včetně jeho WebSocket URL, UUID, a Chrome DevTools URL. Získat tato metadata
zasláním HTTP požadavku na `http://[host:port]/json/seznam`. To vrátí
JSON objekt, jako je následující; použijte `webSocketDebuggerUrl majetek jako
URL pro připojení přímo na Inspektora.

<!-- eslint-přeskočit -->
``javascript
{
"popis": "node.js stupně",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "uzel",
"typ": "uzel",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

A Node.js proces začal *bez* `--zkontrolujte, zda` mohou být také poučeni, aby začít
poslech pro ladění zprávy signalizace je s SIGUSR1` (na Linuxu a
OS X). Jako Uzlu 7 tím se aktivuje odkaz Ladicího programu API; v Uzlu 8 a novější
to bude aktivovat Inspektor API.

---
## Bezpečnostní Důsledky

Protože ladicí program má plný přístup k Node.js spuštění prostředí, 
škodlivé herec schopen připojit se k tomuto portu může být schopen spustit libovolný
kód jménem Uzlu procesu. Je důležité pochopit, bezpečnostní
důsledky odhalení debugger port na veřejné a privátní sítě.

### Vystavovat debug port veřejně je nebezpečné

Pokud ladicí program je vázán na veřejnou IP adresu, nebo 0.0.0.0, jakýkoliv klienty
může dosáhnout vaše IP adresa bude moci připojit k debugger bez
omezení a budete moci spustit libovolný kód.

Ve výchozím nastavení se uzel --zkontrolujte, zda se váže na 127.0.0.1. Explicitně je třeba poskytnout
veřejnou IP adresu nebo 0.0.0.0, atd., pokud máte v úmyslu povolit externí připojení
ladicí program. Pokud tak učiníte, může vystavit vás potenciálně významné bezpečnostní
škodlivý. Doporučujeme vám zajistit vhodné firewally a získejte přístup k ovládací prvky v místě
aby se zabránilo bezpečnostní expozice.

Naleznete v části[Umožňuje vzdálené ladění scénáře](#umožňují-remote-debugging-scénáře) na nějaké rady, jak
bezpečně umožnit vzdálené ladicí program klientům připojit.

### Lokální aplikace mají plný přístup k inspektor

I když budete vázat inspektor port pro 127.0.0.1 (výchozí), všechny aplikace
běží lokálně na vašem počítači, budou mít neomezený přístup. Toto chování je záměrné
chcete-li povolit místní ladicí programy, aby se mohli připojit pohodlně.

### Prohlížeče, WebSockets a stejného původu politiky

Webové stránky otevřené ve webovém prohlížeči může WebSocket a HTTP požadavky v rámci
zabezpečení prohlížeče modelu. Počáteční připojení HTTP je nutné získat
unikátní debugger session id. Stejného původu-politiky, zabraňuje webové stránky z bytí
schopen, aby se toto připojení HTTP. Pro další zabezpečení proti
[DNS vazeb útoky](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
ověřuje, že "Host" záhlaví pro připojení buď
zadejte IP adresu nebo `localhost` nebo `localhost6 "" přesně tak.

Tyto zásady zabezpečení zakázat připojení k vzdálené ladění serveru
uvedením hostname. Můžete obejít toto omezení se zadáním
buď IP adresu nebo pomocí ssh tunely, jak je popsáno níže.

## Inspektor Klienty

Několik komerčních a open source nástrojů lze připojit k Uzlu Inspektor. Základní
info o těchto:

#### [node-prohlédněte](https://github.com/nodejs/node-inspect)

* CLI Debugger podporován Node.js Nadace, která používá [Inspektor Protokol][].
* Verze je dodáván s Uzel a může být použit s `uzel zkontrolujte myscript.js`.
* Nejnovější verze může být nainstalována také samostatně (např. `npm nainstalovat-g uzel-zkontrolujte, zda`)
a používá se s `node-zkontrolujte, zda myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Varianta 1**: Otevřete chrome://kontrolovat v bázi Chromu
prohlížeče. Klikněte na tlačítko Konfigurovat a zajistili, že vaše cílové hostitele a portu
jsou uvedeny.
* **Varianta 2**: Copy `devtoolsFrontendUrl` z výstupu `/json/seznam`
(viz výše), nebo-zkontrolujte nápovědu text a vložit do Chrome.
* **Varianta 3**: Nainstalujte Chrome Rozšíření NIM (Node Inspector Správce): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* V Debug panelu, klepněte na ikonu nastavení otevřete `.vscode/spuštění.json`.
Zvolte "Node.js" pro počáteční nastavení.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Zvolte "Ladění > Spustit Ladění" z menu, nebo stiskněte F5.
* [Podrobný návod](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ a další JetBrains Ide

* Vytvořit nový Node.js ladění konfigurace a hit Ladění. `--zkontrolujte, zda se bude používat
 ve výchozím nastavení pro Node.js 7+. Zakázat, zrušte zaškrtnutí políčka `js.ladicí program.uzel.použití.zkontrolujte, zda v
IDE Registru.

#### [chrome-remote-rozhraní](https://github.com/cyrus-and/chrome-remote-interface)

* Knihovna k usnadnění připojení k Inspektor Protokol koncové body.

---

## Možnosti příkazového řádku

Následující tabulka uvádí vliv různých runtime vlajky na ladění:

<table cellpadding="0" cellspacing="0">
<tr><th>Vlajky</th><th>Význam</th></tr>
<tr>
<td>--zkontrolujte, zda</td>
<td>
<ul>
<li>Povolit inspector agent</li>
<li>Poslech na výchozí adresu a port (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--prohlédněte=<i>[host:port]</i></td>
<td>
<ul>
<li>Povolit inspector agent</li>
<li>Vázat na adresu nebo hostname <i>host</i> (výchozí: 127.0.0.1)</li>
<li>Poslouchat na portu <i>port</i> (výchozí: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--zkontrolujte, zda-brk</td>
<td>
<ul>
<li>Povolit inspector agent</li>
<li>Poslech na výchozí adresu a port (127.0.0.1:9229)</li>
<li>Přestávka před uživatelský kód začíná</li>
</ul>
</td>
</tr>
<tr>
<td>--zkontrolujte, zda-brk=<i>[host:port]</i></td>
<td>
<ul>
<li>Povolit inspector agent</li>
<li>Vázat na adresu nebo hostname <i>host</i> (výchozí: 127.0.0.1)</li>
<li>Poslouchat na portu <i>port</i> (výchozí: 9229)</li>
<li>Přestávka před uživatelský kód začíná</li>
</ul>
</td>
</tr>
<tr>
<td><code>uzel zkontrolujte <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn dítě proces spustit uživatelský skript ... prohlédněte vlajky;
a používat hlavní proces spustit CLI ladicí program.</li>
</ul>
</td>
</tr>
<tr>
<td><code>uzel zkontrolujte, --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Spawn dítě proces spustit uživatelský skript ... prohlédněte vlajky;
a používat hlavní proces spustit CLI ladicí program.</li>
<li>Poslouchat na portu <i>port</i> (výchozí: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Umožňuje vzdálené ladění scénáře

Doporučujeme, že jste nikdy mít ladicí program poslouchat na veřejnou IP adresu. Pokud
je třeba povolit vzdálené ladění připojení doporučujeme použít ssh
tunely místo. Poskytujeme následující příklad je pouze pro ilustraci.
Prosím, pochopit rizika zabezpečení umožňující vzdálený přístup k privilegované
služby před pokračováním.

Řekněme, že jste běží Uzel na vzdáleném počítači, remote.example.com,, že jsi
chci být schopen ladění. Na ten stroj, měli byste začít uzel, proces
s inspektorem poslouchat pouze na localhost (výchozí).

``bash
$ node --zkontrolujte, zda není server.js
``

Nyní, na váš lokální počítač, odkud chcete zahájit ladění klienta
připojení, můžete nastavit ssh tunel:

``bash
$ ssh-L 9221:localhost:9229 user@remote.example.com
``

To spustí ssh tunel zasedání, kde připojení k portu 9221 na vaše místní
stroj bude předán do přístavu 9229 na remote.example.com. Nyní můžete připojit
ladicí program jako Chrome DevTools nebo Visual Studio Code na localhost:9221,
který by měl být schopen ladění, jako kdyby Node.js aplikace byla spuštěna lokálně.

---

## Starší Ladicí Program

**Starší ladicí program byl kritizován jako Uzel 7.7.0. Prosím, použijte --zkontrolujte, zda není
a Inspektor místo.**

Když se to začalo s **--debug** nebo **--debug-brk** spínače ve verzi 7 a
dříve, Node.js naslouchá pro ladění příkazy definované přerušena
V8 Ladění Protokolu na TCP port, standardně `5858`. Žádné ladicí program klienta
které mluví tento protokol může připojit a ladit běžící proces; 
pár populárních ty jsou uvedeny níže.

V8 Ladění Protokolu je již zachována nebo zdokumentováno.

#### [Built-in Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start uzlu ladění script_name.js spustíte skript v rámci Uzlu je builtin
command-line debugger. Skript se spustí v jiném Uzlu proces začal s
`--debug-brk` možnost, a počáteční Uzel spustí proces `_debugger.js`
scénář a připojí se k své cíle.

#### [node-inspector](https://github.com/node-inspector/node-inspector)

Ladění Node.js aplikace s Chrome DevTools pomocí zprostředkovatele procesu
což se překládá Inspektor Protokol používaný v Chromu pro V8 Debugger
protokol používaný v Node.js.

<!-- rozhodčí -->

[Inspektor Protokol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122