---
otsikko: Testaus - aloittaminen
layout: docs.hbs
---

# Testaus Opas

Tämä opas auttaa sinua pääsemään alkuun jäljitettäessä Node.js sovellukset ja skriptit.

# # , Jotta Tarkastaja

Kun alkoi **--tarkastaa** switch, Node.js prosessi kuuntelee kautta WebSockets
diagnostisia komentoja määritelty [Tarkastaja Pöytäkirjan][],
oletuksena isäntä ja port 127.0.0.1:9229. Jokainen prosessi on myös osoitettu
ainutlaatuinen [UUID][] (esim. `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Tarkastaja asiakkaiden täytyy tietää ja määritellä palvelimen osoite, portti, ja UUID-yhteyden
sen WebSocket käyttöliittymä. Täydellinen URL-osoite on
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, tietenkin riippuvainen
todellinen isäntä ja portti ja oikeat UUID esimerkiksi.

Tarkastaja sisältää myös HTTP-päätepisteen palvella metatietoa debuggee,
mukaan lukien sen WebSocket URL, UUID-tunnus, ja Chrome DevTools URL-osoite. Hanki tämä metadata
lähettämällä HTTP-pyyntö http://[host:port]/json/list`. Tämä palauttaa
JSON-objekti, kuten seuraavat; käytä `webSocketDebuggerUrl` omaisuutta kuten
URL liittää suoraan Tarkastaja.

<!-- eslint-skip -->
``javascript
{
"description": "node.js esimerkiksi",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "solmu",
"tyyppi": "solmu",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

A Node.js prosessi alkoi *ilman* `--tarkastaa voidaan myös neuvottu aloittaa
kuuntele virheenkorjaus viestejä signalointi se `SIGUSR1` (Linux ja
OS X). Koska Solmu 7 tämä aktivoi legacy Debuggeri API; Solmu 8 ja myöhemmin
se aktivoi Tarkastaja API.

---
## Turvallisuusvaikutuksia

Koska debuggeri on täysi pääsy Node.js execution environment, 
ilkeä näyttelijä voi liittää tähän porttiin voi olla mahdollista suorittaa mielivaltaista
koodin puolesta Solmu prosessi. On tärkeää ymmärtää, että turvallisuus
vaikutukset paljastaen debugger-porttiin julkisten ja yksityisten verkkojen.

### Paljastaen debug port julkisesti on vaarallinen

Jos debuggeri on varmasti julkinen IP-osoite, tai 0.0.0.0, kaikki asiakkaat, jotka
voi saavuttaa oman IP-osoitteen voi liittää virheenkorjauksen ilman
rajoitus ja voi suorittaa haluamaansa koodia.

Oletuksena `solmu --tarkastaa sitoutuu 127.0.0.1. Erikseen täytyy antaa
julkinen IP-osoite tai 0.0.0.0, jne., jos aiot salli ulkoiset yhteydet
debuggeri. Näin voi altistaa sinut mahdollisesti merkittävä turvallisuus
uhka. Sinun kannattaa varmistaa asianmukainen palomuurit ja käytön valvonnasta paikka
estää turvallisuuden altistuminen.

Ks. kohta '[Mahdollistaa kauko-testaus skenaarioita](#mahdollistaminen-kauko-testaus-skenaariot)' joitakin neuvoja, miten
turvallisesti sallia remote debugger asiakkaiden yhteyden.

### Paikallisia sovelluksia on täysi pääsy tarkastaja

Vaikka sitoa tarkastaja 127.0.0.1 portti (oletus), kaikki sovellukset
käynnissä paikallisesti koneellasi on rajoittamaton pääsy. Tämä on suunnittelun
jotta paikallinen debuggereita voi liittää kätevästi.

### Selaimet, WebSockets ja same-origin policy

Sivustot avata web-selain voi tehdä WebSocket ja HTTP-pyyntöjen alle
selaimen tietoturva-malli. Ensimmäinen HTTP-yhteys on tarpeen saada
ainutlaatuinen debugger session-id. Sama alkuperä-politiikka estää sivustot on
voi tehdä HTTP-yhteys. Lisäturvaa vastaan
[DNS-rebinding-iskujen](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
tarkistaa, että "Host" - otsikot yhteyden joko
määritä IP-osoite tai `localhost` tai `localhost6` juuri.

Nämä turvallisuuspolitiikassa estää yhteyden kauko debug server
pääkoneen nimi. Voit kiertää tämän rajoituksen määrittämällä
joko IP-osoite tai käyttämällä ssh-tunneleita, kuten alla on kuvattu.

## Tarkastaja Asiakkaita

Useita kaupallisia ja avoimen lähdekoodin työkalut voi yhdistää Solmun Tarkastaja. Perus
info näitä ovat seuraavat:

#### [solmu-tarkasta](https://github.com/nodejs/node-inspect)

* CLI Debuggeri tukee Node.js Säätiö, joka käyttää [Tarkastaja Pöytäkirjan][].
* Versio on yhdistetty Solmu ja voidaan käyttää `solmu tarkastaa myscript.js`.
* Uusin versio voidaan asentaa myös itsenäisesti (esim. npm asentaa -g solmu-tarkista`)
ja käyttää `solmu-tarkastaa myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Vaihtoehto 1**: Avaa chrome://tarkastaa on Kromi-pohjainen
selaimella. Napsauta Määritä-painiketta ja varmista, että tavoite isäntä ja portti
on lueteltu.
* **Vaihtoehto 2**: Kopioi `devtoolsFrontendUrl` ulostulo `/json/list`
(ks. edellä) - tai-tarkastaa vihje teksti ja liitä Chrome.
* **Vaihtoehto 3**: Asenna Chrome Laajennus NIM (Solmu Tarkastaja Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* Debug-paneeli, napsauta asetukset-kuvaketta voit avata `.vscode/käynnistää.json`.
Valitse "Node.js" initial setup.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Valitse "Debug - > Start Debugging" valikosta tai paina F5.
* [Yksityiskohtaiset ohjeet](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ ja muut IDEs JetBrains

* Luo uusi Node.js debug-kokoonpano ja hit Debug. `--tarkastaa käytetään
 oletuksena Node.js 7+. Poista poista `js.debuggeri.solmu.käyttää.tarkasta` 
IDE-Rekisterissä.

#### [chrome-etäkäyttö-käyttöliittymä](https://github.com/cyrus-and/chrome-remote-interface)

* Kirjasto helpottaa yhteyksiä Tarkastaja Pöytäkirjan päätepisteet.

---

## Command-line options

Seuraavassa taulukossa esitetään vaikutus eri runtime liput-testaus:

<table cellpadding="0" cellspacing="0">
<tr><th>Lippu</th><th>Merkitys</th></tr>
<tr>
<td>--tarkastaa</td>
<td>
<ul>
<li>Ota inspector agent</li>
<li>Kuunnella default-osoite ja portti (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--tarkasta=<i>[host:port]</i></td>
<td>
<ul>
<li>Ota inspector agent</li>
<li>Sitoa osoite tai hostname <i>isäntä</i> (oletus: 127.0.0.1)</li>
<li>Kuuntele port < / i> - portti</i> (oletus: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--tarkasta-brk - </td>
<td>
<ul>
<li>Ota inspector agent</li>
<li>Kuunnella default-osoite ja portti (127.0.0.1:9229)</li>
<li>Tauko ennen kuin käyttäjä koodi alkaa</li>
</ul>
</td>
</tr>
<tr>
<td>--tarkasta-brk=<i>[host:port]</i></td>
<td>
<ul>
<li>Ota inspector agent</li>
<li>Sitoa osoite tai hostname <i>isäntä</i> (oletus: 127.0.0.1)</li>
<li>Kuuntele port < / i> - portti</i> (oletus: 9229)</li>
<li>Tauko ennen kuin käyttäjä koodi alkaa</li>
</ul>
</td>
</tr>
<tr>
<td><code>solmu tarkastaa < / i>script.js</i></code></td>
<td>
<ul>
<li>Kutemaan lapsi prosessi juosta käyttäjän käsikirjoituksen mukaan-tarkista lipun alla;
ja käyttää tärkein prosessi toimimaan CLI debugger.</li>
</ul>
</td>
</tr>
<tr>
<td><code>solmu tarkastaa --port=xxxx <->script.js</i></code></td>
<td>
<ul>
<li>Kutemaan lapsi prosessi juosta käyttäjän käsikirjoituksen mukaan-tarkista lipun alla;
ja käyttää tärkein prosessi toimimaan CLI debugger.</li>
<li>Kuuntele port < / i> - portti</i> (oletus: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Mahdollistaa kauko-testaus skenaarioita

Suosittelemme, että sinun ei tarvitse debugger kuunnella julkinen IP-osoite. Jos
sinun täytyy sallia remote debugging yhteydet suosittelemme käyttämään ssh
tunneleiden sijaan. Tarjoamme seuraavat esimerkiksi suuntaa antava.
Yritä ymmärtää, että turvallisuus riski mahdollistaa etäyhteyden etuoikeutettu
palvelu, ennen kuin jatkat.

Oletetaan, että sinulla on käynnissä Solmu kauko-kone, remote.example.com, että et
haluatko pystyä debug. Koneen, sinun pitäisi aloittaa prosessi solmu
tarkastaja kuuntelee vain localhost (oletus).

``bash
$ node --tarkastaa server.js
``

Nyt, paikalliseen koneeseen, josta haluat aloittaa debug client
yhteys, voit setup ssh-tunneli:

``bash
$ ssh-L 9221:localhost:9229 user@remote.example.com
``

Tämä käynnistyy ssh-tunnelin istunto, jossa yhteys portti 9221 paikalliseen
kone toimitetaan port 9229 päälle remote.example.com. Voit nyt liittää
debuggeri, kuten Chrome DevTools-tai Visual Studio Koodi localhost:9221,
joka pitäisi pystyä debug kuin jos Node.js sovellus oli käynnissä paikallisesti.

---

## Legacy Debuggeri

** * * * * Legacy debuggeri on ollut vanhentunut kuin Solmun 7.7.0. Käytä --tarkastaa
ja Tarkastaja sijaan.**

Kun alkoi **--debug** tai **--debug-brk** kytkimet versio 7 ja
aiemmin Node.js kuuntelee testaus komentoja määritelty lopetettu
V8-Testaus-Protokollaa TCP-portti, oletuksena `5858`. Mitään debuggeri asiakas
joka puhuu tämän pöytäkirjan voi muodostaa yhteyden ja debug käynnissä prosessi; 
pari suosituimmista lajeista on lueteltu alla.

V8-Testaus-Protokollaa ei enää ylläpidetä tai dokumentoitu.

#### [Sisäänrakennettu Debuggeri](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Käynnistä solmu debug script_name.js` aloittaa käsikirjoituksen alle Solmun builtin
command-line debuggeri. Käsikirjoitus alkaa toinen Solmu prosessi alkoi
`--debug-brk-vaihtoehto, ja ensimmäinen Solmu prosessi toimii `_debugger.js`
käsikirjoitus ja yhdistää teidän tavoite.

#### [solmu-tarkastaja](https://github.com/node-inspector/node-inspector)

Debug Node.js app Chrome DevTools käyttämällä välittäjää prosessi
joka kääntää Tarkastaja Pöytäkirjan käytetään Kromi V8 Debuggeri
protokollaa käytetään Node.js.

<!-- refs -->

[Tarkastaja Pöytäkirjan]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122