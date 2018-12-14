---
title: debugowanie - początek pracy
layout: docs.hbs
---

# Instrukcja Debugowania

Ten poradnik pomoże ci rozpocząć debugowanie węzła.js aplikacje i skrypty.

## Włączyć Inspektor

Po uruchomieniu z** --inspect * * przełącznik, węzeł.proces JS słucha przez WebSockets
dla diagnostycznych zespołów, określonych protokołem [Inspector][],
domyślnie w węźle i Portu 127.0.0.1: 9229. Dla każdego procesu jest również przypisany
unikalny identyfikator UUID][] (na przykład, `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Klienci inspektora muszą znać i podać adres hosta, port i UUID do podłączenia
do interfejsu WebSocket. Pełny adres URL
`z WS://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e, oczywiście zależy
na rzeczywistym Komputerze i do Portu oraz z prawidłowym UUID dla instancji.

Inspektor zawiera także punkt końcowy HTTP do obsługi metadanych o отлаживаемом obiekcie,
w tym adres URL WebSocket, UUID i adres URL, Chrome DevTools. Zobacz te metadane
wysłanie żądania HTTP w ' http://[host: port] / json / list`.  To zwraca
JSON-obiekt, tak jak w poniższym; używać webSocketDebuggerUrl` tytułów jak
Adres URL do podłączenia bezpośrednio do inspektorowi.

<!-- eslint-skip -->
``яваскрипт
{
  "opis": "węzeł.wystąpienie js",
  "devtoolsFrontendUrl": "chrome developer tools://programisty/zestawie/inspektor.Kod HTML?eksperymenty=true&v8only=prawda i WS=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "nazwa": "węzeł",
  "typ": "węzeł",
  "adres": "plik://",
  "webSocketDebuggerUrl": "z WS://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
`

węzeł.proces JS początku *bez* `--sprawdzić można również polecił rozpocząć
słuchanie komunikatów diagnostycznych za pomocą sygnalizacji SIGUSR1 (w systemie Linux i
OS X). Z węzła 7 to aktywuje przestarzałe API debugera; w węźle 8 i później
aktywuje API inspektora.

---
## konsekwencje dla bezpieczeństwa

Tak jak debuger ma pełny dostęp do witryny.środowisko wykonawcze js, a
osoba atakująca, w stanie podłączyć do tego portu, może wykonać taką
kod w imieniu procesu hosta. Ważne jest, aby zrozumieć, bezpieczeństwo
konsekwencje udzielenia portu debugera w publicznych i prywatnych sieciach.

### Publiczny dostęp do portu debugowania nie jest czysty

Jeśli debuger przywiązany do adresu IP, lub 0.0.0.0, klienci,
może osiągnąć twój adres IP będzie połączyć się z debugerem bez jakichkolwiek
ograniczenia i możliwość uruchomienia dowolnego kodu.

Domyślnie `node --inspect ' przywiązuje się do 127.0.0.1. Należy wyraźnie podać
publiczny adres IP 0.0.0.0, itp., jeśli planuje zezwolić na połączenia zewnętrzne
z debugerem. To może prowadzić do potencjalnie dużej bezpieczeństwa
zagrożenie. Zalecamy, aby zapewnić odpowiednie zapory i środki kontroli dostępu
aby uniknąć zagrożenia.

Cm. sekcja "[włączanie skryptów zdalnego debugowania] (#enabling-remote debugging-scenaries) " o niektórych rad o tym, jak
aby bezpiecznie zezwolić klientom zdalny debugger do podłączenia.

### Aplikacje lokalne mają pełny dostęp do inspektorowi

Nawet jeśli привязываете port inspektora do 127.0.0.1 (domyślnie), żadnych aplikacji
uruchomienie lokalnie na komputerze będzie mieć nieograniczony dostęp. Ten
do tego, aby lokalne debugery, aby móc wygodnie przyczepić.

### Przeglądarki, WebSockets i polityka tego samego pochodzenia

Strony internetowe, otwarte w przeglądarce internetowej, mogą robić WebSocket i żądania HTTP, pod
model zabezpieczeń przeglądarki. W celu uzyskania początkowego połączenia HTTP, należy
unikalny identyfikator sesji debuggera. Polityka tego samego pochodzenia nie pozwala witrynom być
możliwość zrobić to połączenie HTTP. Dla zwiększenia bezpieczeństwa przeciw
[DNZ ponownego wiązania atakami](https://en.wikipedia.org/wiki/DNS_rebinding), węzeł.js
sprawdzić, że nagłówki 'Host' dla połączenia lub
dokładnie określ adres IP lub `localhost` lub `localhost6`.

Te zasady bezpieczeństwa zabraniają połączenie do serwera zdalnego debugowania
określa nazwę hosta. To ograniczenie można obejść, podając
lub adres IP lub za pomocą tuneli ssh, jak opisano poniżej.

## Klienci Inspektora

Do inspektorowi węzła można podłączyć kilka komercyjnych narzędzi i narzędzi open-source. Główny
informacje o tym poniżej:

#### [node-inspect](https://github.com/nodejs/node-inspect)

* Debuger CLI, obsługiwany węzłem.JS Foundation, który wykorzystuje [protokół inspektora][].
* Wersja pochodzi z Node i może być używany z `node inspect myscript.js.
* Najnowszą wersję można również zainstalować samodzielnie (na przykład, `npm install-g node-inspect`)
  i jest używany z ' node-inspect myscript.js.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* * * * Wariant 1**: Otwarte " chrome: / / inspect` w chromie na podstawie
  z poziomu przeglądarki internetowej. Kliknij przycisk ustawienia i upewnij się, że docelowy host i port
  są wymienione.
* **Opcja 2**: skopiować `devtoolsFrontendUrl` na wyjściu `/JSON/lista`
  (patrz wyżej) lub-sprawdź podpowiedź tekst i wkleić w Chrom.
* * * * Opcja 3**: Zainstaluj rozszerzenie Chrome NIM (Node Inspector Manager):  
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* Na panelu debugowania kliknij ikonę ustawienia, aby otworzyć `.vscode / startup.format JSON.`
  wybrany węzeł.js " do początkowej konfiguracji.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Wybierz opcję "debugowanie > rozpocząć debugowanie" w menu lub naciśnij F5.
* [Szczegółowa instrukcja](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [Firmy JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ i inne firmy JetBrains Эйдос

* Utwórz nowy węzeł.JS отлаживает konfigurację i kliknie Debug. `--skanowanie będzie używany
  domyślnie dla węzła.js 7+. Aby wyłączyć wyczyść pole wyboru ' js.debugger.węzeł.używać.sprawdzić w
  rejestr IDE.

#### [chrome remote interface](https://github.com/cyrus-and/chrome-remote-interface)

* Biblioteka dla uproszczenia połączenia do punktów końcowych protokołu inspektora.

---

## Opcja wiersza polecenia

W poniższej tabeli przedstawiono wpływ różnych flag środowiska wykonawczego na debugowanie:

elementy <table cellpadding="0" cellspacing="0">
  <tr><th>flaga</th><th>znaczenie</tg></tr>
  <tr>
    <td>--sprawdźcie</ТD>
    <TD>
      <ul>
        <Li>włącz inspektor agent</li>
        < li>słuchanie adresu i portu (domyślnie 127.0.0.1:9229)< / li>
      < / ul>
    </TD>
  < / tr>
  <tr>
    <td>--sprawdzić=<ja>[serwer:port]</i></ТD>
    <TD>
      <ul>
        <Li>włącz inspektor agent</li>
        < li>przyciągaj do adresu lub nazwy hosta < i>host< / i> (domyślnie: 127.0.0.1)< / li>
        <li>port <ja>port</i> (domyślnie: 9229)</li>
      < / ul>
    </TD>
  < / tr>
  <tr>
    <td>--sprawdzić-БРК</ТD>
    <TD>
      <ul>
        <Li>włącz inspektor agent</li>
        < li>słuchanie adresu i portu (domyślnie 127.0.0.1:9229)< / li>
        < li>przerwa przed uruchomieniem kodu użytkownika< / li>
      < / ul>
    </TD>
  < / tr>
  <tr>
    <td>--sprawdzić-БРК=<ja>[serwer:port]</i></ТD>
    <TD>
      <ul>
        <Li>włącz inspektor agent</li>
        < li>przyciągaj do adresu lub nazwy hosta < i>host< / i> (domyślnie: 127.0.0.1)< / li>
        <li>port <ja>port</i> (domyślnie: 9229)</li>
        < li>przerwa przed uruchomieniem kodu użytkownika< / li>
      < / ul>
    </TD>
  < / tr>
  <tr>
    <td><code>node inspect < I>skrypt.js</i> < / code>< / td>
    <TD>
      <ul>
        < li>tworzy proces potomny, aby uruchomić skrypt użytkownika pod flagą --inspect;
            i użyj podstawowy proces do wykonania debugera CLI.</Lee>
      < / ul>
    </TD>
  < / tr>
  <tr>
    <td> < code>node inspect --port=xxxx < i>skrypt.js</i> < / code>< / td>
    <TD>
      <ul>
        < li>tworzy proces potomny, aby uruchomić skrypt użytkownika pod flagą --inspect;
            i użyj podstawowy proces do wykonania debugera CLI.</Lee>
        <li>port <ja>port</i> (domyślnie: 9229)</li>
      < / ul>
    </TD>
  < / tr>
</tabela>

---

## Włączanie zdalnego debugowania skryptów

Nie zaleca się, aby debuger klimatów publiczny adres IP. Jeśli
trzeba zezwolić na zdalne debugowanie połączeń zaleca się korzystać z ssh
zamiast tego tunele. Prezentujemy kolejny przykład tylko do celów ilustracyjnych.
Należy zwrócić uwagę na zagrożenie bezpieczeństwa związane ze zdalnym dostępem do ograniczonego
obsługa przed kontynuacją.

Załóżmy, uruchomić Node na zdalnej maszynie, remote.example.com co ty
chcesz mieć możliwość debugowania. Na tym komputerze należy uruchomić proces hosta
przy tym inspektor słucha tylko localhost (domyślnie).

```bić
$ node --inspect serwer.js
`

Teraz na lokalnym komputerze, z którego chcesz uruchomić klienta debugowania
połączenia, można skonfigurować SSH tunel:

```bić
$ ssh-L 9221: localhost: 9229 user@remote.example.com
`

To uruchamia sesję tunelu ssh, gdzie połączenie z portem 9221 na lokalnym
maszyna zostanie przekazana do portu 9229 dalej remote.example.com. Teraz możesz dołączyć
debuger, takie jak Chrome DevTools lub Visual Studio Code to localhost: 9221,
który powinien być w stanie debugować, jak węzeł.aplikacja js działało lokalnie.

---

## Przestarzały Debugger

** Przestarzały debugger jest nieaktualny z węzła 7.7.0. Użyj-sprawdź
a zamiast niego inspektor.**

Po uruchomieniu z przełącznikami** --debug **lub** --debug-brk * * w wersji 7 i
wcześniej witrynę.js słucha polecenia debug, niektóre porzucone
Protokół debugowania V8 na porcie TCP, domyślnie '5858'. Każdy klient debugera
co mówi ten protokół może połączyć się z i отлаживаться idącym procesem; a
para najpopularniejsze z nich są wymienione poniżej.

Protokół debugowania V8 nie jest już obsługiwany i nie jest udokumentowane.

#### [Wbudowany debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Uruchom ' имя_скрипта debugowania węzła.js ', aby uruchomić skrypt pod Node's builtin
narzędzie wiersza polecenia. Skrypt uruchamia się w innym procesie węzła, uruchomionym z
opcja '--debug-brk`, i początkowy proces hosta uruchamia ' _debugger.js`
scenariusz i podłącza się do swojego celu.

#### [Node-inspector](https://github.com/node-inspector/node-inspector)

Debugowanie węzła.js aplikacji z Chrome DevTools za pomocą pośredniego procesu
który konwertuje protokół inspektora, który jest używany w Chromium, w debugger V8
protokół używany w witrynie.js.

<!-- bibl. -->

[Protokół inspektora]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122