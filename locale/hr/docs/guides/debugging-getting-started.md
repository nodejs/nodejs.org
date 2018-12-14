---
title: debugging - početak rada
layout: docs.hbs
---

# Vodič Za Ispravljanje Pogrešaka

Ovaj vodič će vam pomoći da počnete ispravljanje pogrešaka узла.јѕ aplikacije i skripte.

## Include Inspektor

Pri pokretanju s** --pregledajte * * prekidač za, mjesto.proces JS sluša kroz WebSockets
za dijagnostiku naredbe definirane protokolom [Inspector][],
propust u mjestu i Porto 127.0.0.1: 9229. Svaki proces je također dodijeljena
jedinstveni identifikator UUID][] (na primjer, `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Kupci inspektor bi trebao znati i ukazati adresa domaćina, port, i UUID za povezivanje
na sučelju WebSocket. Potpuna URL adresa
`s WS://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e, naravno ovisi
na stvarnoj Hosta i Port i s pravom UUID za primjer.

Inspektor također uključuje završnu točku za HTTP servis metapodataka o отлаживаемом objektu,
uključujući URL WebSocket, UUID i URL, Chrome DevTools. Dobiti ove metapodatke
šalje HTTP zahtjev u ' http://[host: port] / json / list`. To vraća
JSON objekt, kao u sljedećem; koristiti webSocketDebuggerUrl` vlasništva kao
URL za spajanje izravno na nadzornika.

<!-- eslint-skip -->
``яваскрипт
{
"opis": "čvor.primjer js",
 "devtoolsFrontendUrl": "krom developer tools://developer tools/zajedno/inspektor.HTML kod?eksperimenti=true&v8only=true i WS=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"naziv": "čvor",
"tip": "čvor",
"adresa": "file://",
"webSocketDebuggerUrl": "s WS://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
`

čvor.proces JS početka *bez* `--provjerite je također uputio početak
slušanje отладочных poruka alarm SIGUSR1 (u Linux i
OS X). Sa čvor 7 to aktivira out-of-date API za ispravljanje pogrešaka; u čvorištu 8 i kasnije
on omogućuje API inspektor.

---
## posljedice za sigurnost

Program za pronalaženje pogrešaka ima potpuni pristup web-mjestu.runtime js, a
napadač sposoban povezati na ovaj port može izvršiti proizvoljan
kod ime proces čvor. Važno je shvatiti sigurnost
posljedice davanja port debugger u javnih i privatnih mreža.

### Pristup javnosti priključak za ispravljanje pogrešaka nije siguran

Ako debugger vezan za IP-adresu, ili 0.0.0.0, kupci,
mogu postići vaša IP adresa će se povezati na отладчику bez bilo kakve
ograničavanje i mogućnost za pokretanje proizvoljnog programskog koda.

Default `node --pregledajte ' sjedne na 127.0.0.1. Treba jasno dati
javni IP adresu 0.0.0.0 i tako dalje, ako se planira riješiti vanjske veze
na отладчику. To može dovesti do potencijalno velikoj sigurnost
prijetnja. Preporučujemo vam osigurati odgovarajuće firewall i sredstva za kontrolu pristupa
da biste spriječili sigurnosne prijetnje.

Cm. odlomak "[omogućivanje skripti udaljenom debugging] (#enabling-remote-debugging-scenaries) " o nekim vijećima o tome kako
sigurno dopusti korisnicima da daljinski debugger za povezivanje.

### Lokalne aplikacije imaju potpuni pristup inspektor

Čak i ako ste привязываете luka inspektor na 127.0.0.1 (default), bilo koje aplikacije
pokretanje lokalno na vašem računalu će imati neograničen pristup. To
kako bi lokalne отладчики biti u mogućnosti jednostavno priključiti.

### Preglednici, WebSockets i politika iste podrijetla

Web-stranice, otvaranje web-preglednika, mogu učiniti WebSocket i HTTP zahtjeve pod
model sigurnost preglednika. Za dobivanje početne HTTP vezu je potrebno
jedinstveni identifikator sesije za ispravljanje pogrešaka. Politika istog podrijetla ne omogućuje web-stranicama biti
priliku da to učinite HTTP vezu. Za dodatnu sigurnost protiv
[CSN перепривязки napada](https://en.wikipedia.org/wiki/DNS_rebinding), узел.јѕ
provjerava da naslovi 'Host' za veze ili
točno navesti IP-adresu ili `localhost` ili `localhost6`.

Ove politike sigurnosti zabranjuju vezu s udaljenim poslužiteljem za ispravljanje pogrešaka
napomena ime hosta. Ovo ograničenje se može zaobići, što ukazuje na
bilo IP adresu ili preko ssh tunela, kao što je opisano u nastavku.

## Kupci Inspektor

Inspektora čvor možete povezati nekoliko komercijalnih alata i alata otvorenog koda. Glavni
informacije o tome u nastavku:

#### [node-pregledajte](https://github.com/nodejs/node-inspect)

* Debugger CLI, podržani узлом.ЈЅ Foundation, koji koristi [protokol inspektor][].
* Verzija dolazi s Node i može se koristiti sa `node inspekciju myscript.js.
* Najnoviju verziju možete sami instalirati (kao što su, `npm install-g node-pregledajte`)
i koristi se sa ' node-pregledajte myscript.js.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* * * * Varijanta 1**: Otvorite " chrome: / / pregledajte` u хроме na temelju
web preglednik. Kliknite customize (Prilagodi) i pobrinite se da je ciljani host i port
navedeni.
* **Opcija 2**: kopirati `devtoolsFrontendUrl` izlaz `/JSON/popis`
(vidi gore) ili-provjeriti savjet tekst i ubacite u Krom.
* * * * Opcija 3**: Postavite proširenje za Chrome NIM (Node Inspector Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* Na traci debug, kliknite ikonu mogućnosti, otvoriti `.vscode / trčanje.JSON format.`
odabrani узел.јѕ " za početne postavke.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Odaberite "debug > start debugging" u izbornik, ili pritisnite F5.
* [Detaljne upute](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [Kompanije JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ i druge tvrtke JetBrains Eidos

* Napravite novi узел.ЈЅ ispravlja programske pogreške iz konfiguraciju i klikne Debug. `--provjerite će se koristiti
 zadana postavka za узла.јѕ 7+. Da biste isključili poništite potvrdni okvir ' js.debugger.čvor.koristiti.provjerite u
registar IDE.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Biblioteka za pojednostaviti povezivanje krajnjih točaka protokola inspektor.

---

## Opcija naredbenog retka

U sljedećoj tablici navedene su utjecaj različitih metoda za izvođenje na ispravljanje pogrešaka:

elementi <table cellpadding="0" cellspacing="0">
<tr><th>zastava</th><th>smisao</tg></tr>
<tr>
<td>--pregledajte</ТD>
<TD>
<ul>
<Li>uključite inspektor agent</li>
< li>slušanje adrese i porta na default (127.0.0.1:9229)< / li>
 < / ul>
</TD>
< / tr>
<tr>
<td>--provjerite=<ja>[server:port]</i></ТD>
<TD>
<ul>
<Li>uključite inspektor agent</li>
< li>uvez na adresu ili ime hosta < i>host< / i> (default: 127.0.0.1)< / li>
<li>na portu <ja>port</i> (default: 9229)</li>
< / ul>
</TD>
< / tr>
<tr>
<td>--provjerite-БРК</ТD>
<TD>
<ul>
<Li>uključite inspektor agent</li>
< li>slušanje adrese i porta na default (127.0.0.1:9229)< / li>
< li>break prije pokretanja korisničkog koda< / li>
< / ul>
</TD>
< / tr>
<tr>
<td>--provjerite-БРК=<ja>[server:port]</i></ТD>
<TD>
<ul>
<Li>uključite inspektor agent</li>
< li>uvez na adresu ili ime hosta < i>host< / i> (default: 127.0.0.1)< / li>
<li>na portu <ja>port</i> (default: 9229)</li>
< li>break prije pokretanja korisničkog koda< / li>
< / ul>
</TD>
< / tr>
<tr>
<td><code>node pregledajte < I>скрипт.јѕ</i> < / code>< / td>
<TD>
<ul>
< li>generira proces dijete za pokretanje skripte korisnika pod zastavom --inspekciju;
i koristite glavni proces za obavljanje debugger CLI.</li>
< / ul>
</TD>
< / tr>
<tr>
<td> < code>node pregledajte --port=xxxx < i>скрипт.јѕ</i> < / code>< / td>
<TD>
<ul>
< li>generira proces dijete za pokretanje skripte korisnika pod zastavom --inspekciju;
i koristite glavni proces za obavljanje debugger CLI.</li>
<li>na portu <ja>port</i> (default: 9229)</li>
< / ul>
</TD>
< / tr>
</table>

---

## Omogućivanje skripti udaljenom debugging

Ne preporučuje, da debugger прослушивал javna IP-adresa. Ako
trebate omogućiti udaljenom debugging veza, preporučujemo da koristite ssh
umjesto toga tunela. Navodimo sljedeći primjer samo za ilustraciju svrhe.
Obratite pažnju na sigurnosni rizik povezan s udaljenim pristupom привилегированному
posluga u prije nastavka.

Recimo, vi trčite Node na udaljenom računalu, remote.example.com da si ti
želite imati priliku za ispravljanje pogrešaka. Na ovom stroju treba pokrenuti proces čvor
u tom slučaju inspektor sluša samo localhost (default).

``pobijediti
$ node --inspekciju сервер.јѕ
`

Sada je na lokalnom računalu s kojeg treba pokrenuti klijent za ispravljanje pogrešaka
povezivanje, možete postaviti SSH tunel:

``pobijediti
$ ssh-L 9221: localhost: 9229 user@remote.example.com
`

To pokreće sesiju ssh tunela, gdje je veza s lukom 9221 na vašem lokalnom
stroj će biti prebačen u luku 9229 dalje remote.example.com. Sada možete pričvrstiti
program za pronalaženje pogrešaka, kao što su Chrome DevTools ili Visual Studio Code to localhost: 9221,
koji bi trebao biti u mogućnosti da otkloni, kao da čvor.program js je radio na lokalnoj razini.

---

## Out-Of-Date Debugger

** Out-of-date debugger zastario čvor 7.7.0. Molimo vas, koristite-provjerite
a umjesto njega inspektor.**

Pri pokretanju s magnezijem** --debug **ili** --debug-brk * * u verziji 7 i
ranije узел.јѕ sluša naredbe za ispravljanje pogrešaka, određene прекращенным
Protokol za ispravljanje pogrešaka V8 na TCP port, default '5858'. Bilo koji klijent debugger
što kaže ovaj protokol može povezati s i отлаживаться vozi proces; te
par najpopularnijih od njih navedeni su u nastavku.

Protokol za ispravljanje pogrešaka V8 više nije podržan i neće biti dokumentirana.

#### [Ugrađeni debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Pokrenite 'имя_скрипта ispravljanje узла.јѕ' za pokretanje skripte pod Node's builtin
debugger naredbenog retka. Skripta se pokreće u nekom drugom postupku čvor, zapuštenom s
opcija '--debug-brk`, i početni proces čvor pokreće ' _debugger.js`
scenarij i spaja do svog cilja.

#### [Node-inspector](https://github.com/node-inspector/node-inspector)

Otkrivanje pogrešaka узла.јѕ app s Chrome DevTools uz pomoć middleware procesa
koji pretvara protokol inspektor koristi Chromium, u debugger V8
protokol koji se koristi u узле.јѕ.

<!-- refs -->

[Protokol inspektor]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122