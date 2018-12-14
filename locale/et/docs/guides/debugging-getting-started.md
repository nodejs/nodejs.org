---
title: silumine-alustamine
layout: docs.hbs
---

# Silumine Guide

Käesolev juhend aitab teil alustada silumine oma sõlme.js rakendused ja skriptid.

## Luba Inspektor

Kui algas** --inspect * * Lüliti, sõlm.js protsessi kuulab kaudu WebSockets
diagnostiliste käskude puhul, nagu on määratletud [inspektori protokollis]][],
vaikimisi host ja port 127.0.0.1:9229. Iga protsess on ka määratud
unikaalne [UUID][] (nt `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektor kliendid peavad teadma ja täpsustama vastuvõtva aadress, port ja UUID ühendada
et WebSocket liides. Täielik URL on
"ws: / / 127.0.0.1: 9229 / 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e", muidugi sõltub
tegeliku vastuvõtva ja sadama ja õige UUID näiteks.

Inspektor ka HTTP tulemusnäitaja teenima metaandmete kohta debuggee,
sealhulgas selle WebSocket URL, UUID ja Chrome DevTools URL. Hangi metaandmed
saates HTTP taotluse "http://[host:port] / json / list".  See tagastab a
JSON objekti nagu järgmised; kasutada "webSocketDebuggerUrl" vara
Url ühenduda otse inspektor.

<!-- eslint-skip -->
"'javascript
{
  "kirjeldus": "sõlm.js näiteks",
  "devtoolsFrontendUrl": "chrome-devtools://devtools/komplekteeritud / inspektor.html?eksperimendid = true & v8only = true & ws = 127.0.0.1: 9229 / 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "pealkiri": "sõlm",
  "Tüüp": "sõlm",
  "url": "fail://",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
"`

sõlm.js protsess algas * ilma * ' --inspect` saab ka juhendada, et alustada
silumisteadete kuulamine SIGUSR1 - ga (Linuxi ja
OS X). Alates Node 7 see aktiveerib pärand Siluri API; sõlmes 8 ja hiljem
see aktiveerib inspektori API.

---
## Mõju Julgeolekule

Kuna Silur on täielik juurdepääs sõlme.js täitmise keskkond,
pahatahtlik näitleja, kes on võimeline ühenduma selle pordiga, võib olla võimeline käivitama suvalise
kood nimel sõlme protsessi. Oluline on mõista julgeolekut
mõju paljastamine siluri sadama avaliku ja erasektori võrkudes.

### Paljastamine debug port avalikult on ohtlik

Kui debugger on seotud avaliku IP-aadressi, või 0.0.0.0, kõik kliendid, kes
kas jõuda oma IP-aadressi saab ühendada siluri ilma
märkus: see lehekülg on tõlgitud masintõlke tarkvara, siis klikkige siia, et saada ingliskeelset versiooni.

Vaikimisi seondub` sõlm --inspect ' 127.0.0.1-ga. Teil on selgesõnaliselt vaja anda
avalik IP-aadress või 0.0.0.0, jne., kui te kavatsete lubada välisühendused
siluri juurde. Seejuures võib paljastada teile potentsiaalselt olulise turvalisuse
oht. Soovitame teil tagada asjakohased tulemüürid ja juurdepääsu kontroll paigas
et vältida turvariski.

Vaadake osa "kaugsilumise stsenaariumide lubamine" (#enabling-remote-debuging-scenarios) (#enabling-remote-debuging-scenarios), kuidas
et ohutult lubada serveri siluri klientide ühendamiseks.

### Kohalikud rakendused on täielik juurdepääs inspektor

Isegi kui seod inspektori porti 127.0.0.1 (vaikimisi), kõik rakendused
töötab kohapeal arvuti on piiramatu juurdepääs. See on kavandatud
et võimaldada kohalike silurite saaks lisada mugavalt.

### Brauserid, WebSockets ja sama päritoluga poliitika

Veebilehed avatud veebilehitseja saab teha WebSocket ja HTTP taotluste alusel
brauseri turvalisuse mudel. Esialgne HTTP ühendus on vajalik, et saada
unikaalne siluri seansi id. Sama päritolu-poliitika takistab veebisaitidel olemast
võimalik teha seda HTTP ühendus. Täiendav tagatis
[DNS rebinding rünnakud](https://en.wikipedia.org/wiki/DNS_rebinding), Sõlme.js
kontrollib, kas ühenduse päised "masin" on
määrata IP-aadressi või "localhost" või " localhost6` täpselt.

Need turvapoliitika keelata ühendamisel serveri debug server
masinanime määramine. Selle piirangu ületamiseks saab määrata
kas IP-aadress või kasutades ssh tunnelid, nagu allpool kirjeldatud.

# Inspektor Clients

Mitu äri-ja avatud lähtekoodiga tööriistu saab ühendada Sõlme Inspektor. Põhiline
info nende järgmiselt:

#### [sõlme-inspect](https://github.com/nodejs/node-inspect)

* CLI Siluri toetab sõlme.js Foundation, mis kasutab [Inspector Protocol][].
* Versioon on komplekteeritud sõlme ja saab kasutada " sõlme inspect myscript.js".
* Viimane versioon võib paigaldada ka iseseisvalt (NT " npm install-g sõlme-inspect`)
  ja kasutada " node-inspect myscript.js".

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* * * 1. võimalus**: avatud "chrome: / / inspect" on kroom põhinev
  veebibrauser. Klõpsake nuppu Konfigureeri ja veenduge, et teie siht host ja port
  on loetletud.
* * * Variant 2**: Kopeeri "devtoolsFrontendUrl" väljundist "/ json / list"
  (Vt eespool) või --inspect vihje teksti ja kleepida Chrome.
* * * 3. Võimalus**: Install Chrome pikendamine NIM (sõlme Inspector Manager):  
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio kood](https://github.com/microsoft/vscode) 1, 10+

* In Debug paneel, klõpsake Seaded ikoonil avada" `vscode / Start.json.
  Vali " Sõlm.js " esialgse setup.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Vali "Debug Start silumine" menüüst või vajuta F5.
* [Üksikasjalikud juhised](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ ja muud JetBrains Iidid

* Loo uus sõlm.js debug konfiguratsiooni ja vajuta Debug. '--inspect ' kasutatakse
  vaikimisi sõlme.js 7+. Eemalda märge ' js.Silur.sõlm.kasutama.inspect " in
  IDE register.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Raamatukogu kergendada ühendused inspektor protokolli näitajaid.

---

## Käsurea Valikud

Järgmises tabelis on loetletud mõju erinevate runtime lipud silumine:

tabel cellpadding= " 0 " cellspacing="0"
  <tr> < th>lipp< / th> < th>tähendus < / th > < / tr>
  < tr>
    td -- inspect/td
    < td>
      < ul>
        <li>Luba inspektor agent</li>
        <li>Kuula vaikimisi aadress ja port (127.0.0.1:9229)</li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    td--inspect=i [host: port]/i / td
    < td>
      < ul>
        <li>Luba inspektor agent</li>
        li siduda aadressi või hostinimi i host/i (vaikimisi: 127.0.0.1) / li
        < li>Kuula port < i > port< / i > (vaikimisi: 9229)< / li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    < td> -- inspect-brk< / td>
    < td>
      < ul>
        <li>Luba inspektor agent</li>
        <li>Kuula vaikimisi aadress ja port (127.0.0.1:9229)</li>
        < li>Break enne kasutaja kood algab< / li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    < td> -- inspect-brk= < i>[host: port]< / i>< / td>
    < td>
      < ul>
        <li>Luba inspektor agent</li>
        li siduda aadressi või hostinimi i host/i (vaikimisi: 127.0.0.1) / li
        < li>Kuula port < i > port< / i > (vaikimisi: 9229)< / li>
        < li>Break enne kasutaja kood algab< / li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    <td> < code > node inspect < i > script.js</i></kood></td>
    < td>
      < ul>
        < li>kudema lapse protsessi käivitada kasutaja skripti alla -- inspect lipp;
            ja kasutada põhiprotsessi joosta CLI siluri.< / li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    <td> < code > node inspect --port=xxxx i > script.js</i></kood></td>
    < td>
      < ul>
        < li>kudema lapse protsessi käivitada kasutaja skripti alla -- inspect lipp;
            ja kasutada põhiprotsessi joosta CLI siluri.< / li>
        < li>Kuula port < i > port< / i > (vaikimisi: 9229)< / li>
      < / ul>
    < / td>
  < / tr>
</Tabel>

---

## Lubamine Kaugsilumine stsenaariumid

Soovitame, et sa ei ole kunagi siluri kuulata avaliku IP-aadress. Kui
sa pead lubama Kaugsilumine ühendused soovitame kasutada ssh
tunnelid asemel. Pakume järgmine näide illustreerivatel eesmärkidel ainult.
Palun mõista turvariski võimaldab kaugjuurdepääsu privilegeeritud
teenistus enne jätkamist.

Oletame, et teil töötab sõlme etäkone, remote.example.com, et sa
tahad olla võimeline siluma. Selle masina, siis tuleb alustada sõlme protsessi
inspektor kuulab ainult localhost (vaikimisi).

"'bash
$ node -- inspect server.js
"`

Nüüd, oma kohalikus masinas, kust soovite algatada debug klient
ühendus, saate seadistada ssh tunnel:

"'bash
$ ssh-l 9221: localhost: 9229 user@remote.example.com
"`

See käivitab ssh tunneli seansi, kus ühendus port 9221 oma kohaliku
masin edastatakse port 9229 kohta remote.example.com. Võite nüüd lisada
siluri nagu Chrome DevTools või Visual Studio koodi localhost: 9221,
mis peaks suutma siluda nagu oleks sõlme.js rakendus töötas kohapeal.

---

# Pärand Silur

** Pärand siluri on iganenud alates sõlme 7.7.0. Palun kasuta --inspect
ja selle asemel inspektor.**

Kui algas * * -- debug * * või * * -- debug-brk* * Lülitid versioon 7 ja
varem, sõlm.js kuulab silumiskäsud määratletud lõpetada
V8 Silumisprotokoll TCP port, vaikimisi '5858'. Iga siluri klient
mis räägib seda protokolli saab ühendada ja debug käimasoleva protsessi;
paar populaarne on loetletud allpool.

V8 Silumisprotokolli enam ei hooldata ega dokumenteerita.

#### [Sisseehitatud Siluri](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Alusta sõlme silumist script_name.js", et alustada oma skripti all sõlme builtin
käsurea Silur. Skript käivitatakse teises Sõlmeprotsessis, mida alustati
võti '-- debug-brk `ja Algsõlme protsess käivitavad ' _debuggeri.js`
script ja ühendab oma eesmärgi.

#### [sõlme-inspektor](https://github.com/node-inspector/node-inspector)

Silu oma sõlm.js app koos Chrome DevTools abil vahendaja protsessi
mis tõlgib kroomis kasutatud inspektori protokolli V8 Siluriks
sõlmes kasutatav protokoll.js.

<!-- refs -->

[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122