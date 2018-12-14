---
nosaukums: Debugging - darba Sākšana
plānojums: docs.hbs
---

# Atkļūdošanas Ceļvedis

Šis ceļvedis palīdzēs jums sākās atkļūdošana Node.js un skriptos.

## Ļautu Inspektors

Kad sāku ar **--pārbaudīt** pārslēgt, Node.js process klausās ar WebSockets
diagnostikas komandas, kā noteikts [Inspektors Protokols][],
pēc noklusējuma pie uzņēmējas un ostas 127.0.0.1:9229. Katrā procesā ir arī piešķirts
unikālo [UUID][] (piemēram, `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektors klientiem, ir jāzina, un norādīt, resursdatora adrese, ports, un UUID, lai izveidotu savienojumu
uz WebSocket interfeisu. Pilnu URL
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e", kas, protams, ir atkarīga
par faktisko uzņēmēja un ostu un ar pareizo UUID lai instance.

Inspektors arī HTTP galapunktu, lai kalpotu metadatus par debuggee,
tostarp tā WebSocket URL, UUID, un Chrome DevTools URL. Iegūtu šo metadatu
nosūtot HTTP pieprasījumu "http://[host:ports]/json/saraksts". Tas atgriež
JSON objektu, piemēram, šādu; izmantot "webSocketDebuggerUrl" īpašums, kā
URL, lai izveidotu tiešu savienojumu Inspektors.

<!-- eslint-izlaist -->
``javascript
{
"description": "node.js piemēram,",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "mezgls",
"type": "mezgls",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

A Node.js procesa sākšana *bez* `--pārbaudīt " var būt uzdots sākt
klausīties, lai atkļūdošanas ziņojumus, signalizācijas ar " SIGUSR1` (uz Linux un
OS X). No Mezgla 7 tas aktivizē mantojums Atkļūdotājs API; 8 Mezglu un vēlāk
tas aktivizē Inspektors API.

---
## Ietekmi Uz Drošību

Kopš atkļūdotājs ir pilnīga piekļuve Node.js izpildes vidi, 
ļaunprātīgas aktieris iespēja, lai izveidotu savienojumu ar šo portu var izpildīt patvaļīgu
kods vārdā Mezglu procesā. Ir svarīgi saprast, drošības
sekas, pakļaujot atkļūdotājs ostā par publisko un privāto tīklu.

### Pakļaujot debug ostas publiski ir nedroša

Ja atkļūdotājs ir saistoši publisko IP adresi, vai 0.0.0.0, jebkuru klientu, kas
var sasniegt jūsu IP adrese būs iespēja, lai izveidotu savienojumu ar atkļūdotājs bez
ierobežojuma un varēs palaist patvaļīgu kodu.

Pēc noklusējuma ir "mezglpunkts --pārbaudīt", kas saistās ar 127.0.0.1. Jūs skaidri nepieciešams, lai nodrošinātu
publisko IP adresi vai 0.0.0.0, utt., ja jūs plānojat, lai ļautu ārējie savienojumi
lai atkļūdotājs. To darot, var pakļaut jūs potenciāli nozīmīgs drošības
draudi. Mēs iesakām, lai jūs nodrošinātu pienācīgu ugunsmūrus un piekļuves kontroles vietā
lai novērstu drošības iedarbības.

Skatīt sadaļu "[kas Ļauj attālo atkļūdošanu scenāriji](#dodot iespēju-remote-atkļūdošanas scenāriji) " dažus padomus par to, kā
droši atļaut attālo atkļūdotājs klientiem, lai izveidotu savienojumu.

### Vietējo lietojumu, ir pilna piekļuve inspektors

Pat tad, ja jūs saista inspektors ostas uz 127.0.0.1 (noklusējuma), visas lietojumprogrammas
darbojas lokāli jūsu mašīna būs neierobežotu piekļuvi. Tas ir by design
lai ļautu vietējiem debuggers, lai varētu ērti pievienot.

### Pārlūkprogrammām, WebSockets un pašas izcelsmes politika

Tīmekļa vietnes, atvērtu web pārlūku, var veikt WebSocket un HTTP pieprasījumus
pārlūka drošība modeli. Sākotnējā HTTP savienojumu, ir nepieciešams, lai iegūtu
unikālo atkļūdotājs sesijas id. Tāpat-izcelsme-politika neļauj vietnēm, kas tiek
iespēja padarīt šo HTTP savienojumu. Par papildu drošību pret
[DNS rebinding uzbrukumiem](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
pārliecinās, ka "Host" galvenes savienojumu vai nu
norādītu IP adresi vai "localhost" vai "localhost6", kas precīzi.

Šie drošības politikas neatļaut izveidot savienojumu ar attālo serveri, debug
norādot uz resursdatora. Jūs varat strādāt ap šo ierobežojumu, nosakot
vai nu IP adresi vai izmantojot ssh tuneļus, kā aprakstīts tālāk.

## Inspektors Klientu

Vairāku komerciālo un atvērtā koda rīkus, var izveidot savienojumu ar Mezgls ir Inspektors. Pamata
info par šiem šādi:

#### [node-pārbaudīt](https://github.com/nodejs/node-inspect)

* CLI Atkļūdotājs atbalsta Node.js Fonds, kas izmanto [Inspektors Protokols][].
* Versija ir saistīta ar Mezglu, un to var izmantot ar " mezgls pārbaudīt myscript.js`.
* Jaunāko versiju var instalēt arī neatkarīgi (piemēram, " npm instalēt -g node-pārbaudīt`)
un izmantot " mezglpunkts-pārbaudīt myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **1. variants**: Atvērt "chrome://pārbaudīt" Hroma-pamatojoties
pārlūkprogrammu. Noklikšķiniet uz Konfigurēt pogas un pārliecinieties, vai jūsu mērķa uzņēmējas un ostas
ir uzskaitīti.
* **2. variants**: Kopijas "devtoolsFrontendUrl no" izejas "/json/saraksts"
(skatīt iepriekš) vai --pārbaudīt mājienu tekstu un ielīmējiet savā Chrome.
* **3. variants**: Instalētu Chrome Pagarinājumu NIM (Mezglu Inspektors Vadītājs): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Kodu](https://github.com/microsoft/vscode) 1.10+

* Debug panelis, noklikšķiniet uz ikonas iestatījumi, lai atvērtu `.vscode/uzsākt.json`.
Izvēlieties "Node.js" par sākotnējo uzstādīšanu.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Izvēlies "Atkļūdošanas > Start Debugging" no izvēlnes vai nospiediet F5.
* [Detalizētas instrukcijas](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ un citi JetBrains IDEs

* Izveidot jaunu Node.js atkļūdošanas konfigurācijas un hit Atkļūdot. `--pārbaudīt " tiks izmantoti
 pēc noklusējuma Node.js 7+. Lai atspējotu atzīmi no izvēles rūtiņas `js.atkļūdotājs.mezglu.izmantot.apskatīt"
IDE Reģistra.

#### [chrome-tālvadības interfeisu](https://github.com/cyrus-and/chrome-remote-interface)

* Bibliotēku, lai atvieglotu savienojumu, lai Inspektors Protokola parametrus.

---

## Komandrindas opcijas

Šajā tabulā ir uzskaitīti ietekmi dažādu runtime karogi par atkļūdošanu:

<table cellpadding="0" cellspacing="0">
<tr><th>Karoga</th><th>, kas Nozīmē</th></tr>
<tr>
<td>--pārbaudīt</td>
<td>
<ul>
<li>Iespējot inspektors aģents</li>
<li>Klausīties par noklusēto adresi un portu (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--pārbaudīt=<i>[host:port]</i></td>
<td>
<ul>
<li>Iespējot inspektors aģents</li>
<li>Saistās adresi vai resursdatora nosaukumu, <i>host</i> (noklusējums: 127.0.0.1)</li>
<li>Klausīties par ostas <i>osta</i> (noklusējums: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--pārbaudīt-brk</td>
<td>
<ul>
<li>Iespējot inspektors aģents</li>
<li>Klausīties par noklusēto adresi un portu (127.0.0.1:9229)</li>
<li>Pārtraukums, pirms lietotāja kods sākas</li>
</ul>
</td>
</tr>
<tr>
<td>--pārbaudīt-brk=<i>[host:port]</i></td>
<td>
<ul>
<li>Iespējot inspektors aģents</li>
<li>Saistās adresi vai resursdatora nosaukumu, <i>host</i> (noklusējums: 127.0.0.1)</li>
<li>Klausīties par ostas <i>osta</i> (noklusējums: 9229)</li>
<li>Pārtraukums, pirms lietotāja kods sākas</li>
</ul>
</td>
</tr>
<tr>
<td><code>node pārbaudīt <i>script.js</i></code></td>
<td>
<ul>
<li>Nārsto bērnu procesā, lai palaistu lietotāja skriptu saskaņā --pārbaudīt karoga;
un izmantot galveno procesu, lai palaistu CLI atkļūdotājs.</li>
</ul>
</td>
</tr>
<tr>
<td><code>node pārbaudīt --ostas=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Nārsto bērnu procesā, lai palaistu lietotāja skriptu saskaņā --pārbaudīt karoga;
un izmantot galveno procesu, lai palaistu CLI atkļūdotājs.</li>
<li>Klausīties par ostas <i>osta</i> (noklusējums: 9229)</li>
</ul>
</td>
</tr>
</table>

---

# # , Kas ļauj attālo atkļūdošanu scenāriji

Mēs iesakām, ka jums nekad ir atkļūdotājs klausīties par publisko IP adresi. Ja
jums ir nepieciešams atļaut attālo atkļūdošanu savienojumi, mēs iesakām izmantot ssh
tuneļu vietā. Mēs piedāvājam piemērā domāts tikai ilustratīviem nolūkiem.
Lūdzu, saprotiet, drošības riska, kas ļauj attālināti piekļūt priviliģētu
pakalpojumu pirms procedūras.

Pieņemsim, ka jūs izmantojat Mezglu uz attālo mašīna, remote.example.com, ka jūs
vēlaties, lai varētu, lai atkļūdot. Par šo mašīnu, jums vajadzētu sākt mezglu process
ar inspektors, klausoties tikai uz localhost (noklusējuma).

``bash
$ node pārbaudīt --server.js
``

Tagad, uz jūsu vietējo mašīna, no kuras vēlaties sākt debug klientu
savienojumu, jūs varat uzstādīt kādu ssh tuneli:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Tas sākas a ssh tunelis sesija, kur pieslēgumu ostas 9221 par vietējo
mašīna tiks nosūtīts ostas 9229 par remote.example.com. Varat tagad pievienot
atkļūdotāja, piemēram, Chrome DevTools vai Visual Studio Kods localhost:9221,
kas var debug, kā tad, ja Node.js pieteikums tika darbojas lokāli.

---

## Mantojums Atkļūdotājs

**Mantojums atkļūdotājs ir novecojusi, kā Mezglpunkts 7.7.0. Lūdzu, izmantojiet pārbaudīt --
un Inspektora vietā.**

Kad sāku ar **--debug** vai **--debug-brk** slēdži versiju, 7. un
agrāk, Node.js klausās atkļūdošanas komandas noteikts pārtraukta
V8 Atkļūdošanas Protokolu TCP portu, pēc noklusējuma `5858`. Jebkuru atkļūdotājs klientu
kas runā šim protokolam var pievienoties un atkļūdošanas darba procesu; 
pāris populāri, tie ir norādīti zemāk.

V8 Atkļūdošanas Protokols vairs nav spēkā vai tiek dokumentēta.

#### [Built-in Atkļūdotājs](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Sākums "mezgls debug script_name.js" sākt savu skriptu saskaņā Mezgls ir iebūvēto
komandrindas atkļūdotājs. Jūsu skripts sākas citā Mezglu procesam, kas sākās ar
"--debug-brk "iespēju, un sākotnējais Mezglu process darbojas" _debugger.js`
skriptu un izveido savienojumu ar savu mērķa.

#### [node-inspektors](https://github.com/node-inspector/node-inspector)

Atkļūdošanas jūsu Node.js app ar Chrome DevTools, izmantojot starpnieku process
kas nozīmē, ka Inspektors Protokols, kas tiek izmantots Hroms, lai V8 Atkļūdotājs
protokols, kas tiek izmantots Node.js.

<!-- refs -->

[Inspektors Protokolā]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122