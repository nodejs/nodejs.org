---
başlık: hata ayıklama - Başlarken
düzen: dokümanlar.hbs
---

# Hata Ayıklama Kılavuzu

Bu kılavuz Düğüm hata ayıklama başlamanıza yardımcı olur.js uygulamaları ve komut dosyaları.

## Enable Inspector

** -- İnspect * * anahtarı, bir düğüm ile başlatıldığında.JS süreci WebSockets üzerinden dinler
[Inspector protokolü] tarafından tanımlanan tanılama komutları için][],
varsayılan olarak host ve port 127.0.0.1: 9229. Her işlem de atanır
benzersiz [UUID][] (örneğin `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Müfettiş istemcileri bilmek ve bağlanmak için ana bilgisayar adresi, bağlantı noktası ve UUID belirtmeniz gerekir
WebSocket arayüzüne. Tam URL
`ws:/ / 127.0.0.1: 9229 / 0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, elbette.
gerçek bir ana bilgisayar ve Bağlantı Noktası ve örnek için doğru UUID ile.

Müfettiş ayrıca hata ayıklayıcı hakkında meta veriler sunmak için bir HTTP uç noktası içerir,
WebSocket URL, UUID ve Chrome DevTools URL'si de dahil olmak üzere. Bu meta verileri almak 
`http://[host:port] / json / list ' bir HTTP isteği göndererek.  Bu döndürür
Aşağıdaki gibi json nesnesi; 'webSocketDebuggerUrl' özelliğini kullanın
URL Müfettiş doğrudan bağlanmak için.

<!-- eslint-skip - >
"'javascript
{
  "açıklama": "düğüm.JS örneği",
  "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/ınspector.html mi?deneyler=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "ıd": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "title": "düğüm",
  "tür": "düğüm",
  "url": "dosya://",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
"`

düğümlü.JS süreci başladı* * `--ınspect ' olmadan da başlatmak için talimat olabilir
`SİGUSR1` (Linux ve Linux üzerinde) ile sinyal vererek hata ayıklama iletileri dinleme
OS X). Düğüm 7'den itibaren bu, eski hata ayıklayıcı API'sini etkinleştirir; düğüm 8 ve sonraki sürümlerde
Müfettiş API'sini etkinleştirecektir.

---
## Güvenlik Etkileri

Hata ayıklayıcı beri Düğüm tam erişimi vardır.JS yürütme ortamı, a
bu bağlantı noktasına bağlanabilen kötü amaçlı aktörler rasgele yürütebilir
düğüm işlemi adına kod. Güvenliği anlamak önemlidir
hata ayıklayıcı bağlantı noktasını genel ve özel ağlarda açığa çıkarmanın etkileri.

### Hata ayıklama bağlantı noktasını herkese açık olarak açığa çıkarmak güvensizdir

Hata ayıklayıcı bir ortak IP adresine bağlı veya 0.0.0.0, herhangi bir istemci
IP adresinize ulaşabilir herhangi bir hata ayıklayıcıya bağlanabilecektir
kısıtlama ve keyfi kod çalıştırmak mümkün olacak.

Varsayılan olarak 'node -- ınspect' 127.0.0.1'e bağlanır. Açıkça bir sağlamak gerekir
genel IP adresi veya 0.0.0.0, vb., dış bağlantılara izin vermek istiyorsanız
hata ayıklayıcıya. Bunu yapmak size potansiyel olarak önemli bir güvenlik ortaya çıkarabilir
tehdit. Uygun güvenlik duvarları ve erişim denetimlerini yerinde sağlamanızı öneririz
bir güvenlik maruz kalmasını önlemek için.

Bazı tavsiyelerde ' [uzaktan hata ayıklama senaryolarını etkinleştirme](#enabling-remote-debugging-scenarios) 'bölümündeki bölümüne bakın
uzaktan hata ayıklayıcı istemcilerinin bağlanmasına güvenli bir şekilde izin vermek için.

### Yerel uygulamalar müfettişe tam erişime sahip

Müfettiş bağlantı noktasını 127.0.0.1 (varsayılan), herhangi bir uygulamaya bağlarsanız bile
makinenizde yerel olarak çalışan sınırsız erişime sahip olacaktır. Bu tasarıma göre
yerel hata ayıklayıcıların rahatça takabilmesine izin vermek için.

### Tarayıcılar, WebSockets ve aynı köken ilkesi

Bir web tarayıcısında açık web siteleri WebSocket ve HTTP istekleri altında yapabilirsiniz
tarayıcı güvenlik modeli. Bir ilk HTTP bağlantısı elde etmek için gerekli olan bir
benzersiz hata ayıklayıcı oturum kimliği. Aynı köken ilkesi web sitelerinin olmasını engeller
bu HTTP bağlantısını yapabilir. Karşı ek güvenlik için
[DNS rebinding saldırıları] (https://en.wikipedia.org/wiki/DNS_rebinding), düğüm.js
bağlantı için' ana bilgisayar ' başlıklarının da doğrular
tam olarak bir IP adresi veya `localhost` veya `localhost6` belirtin.

Bu güvenlik ilkeleri tarafından uzak bir hata ayıklama sunucusuna bağlanmayı izin vermez
ana bilgisayar adını belirtme. Bu kısıtlamayı belirterek çalışabilirsiniz
IP adresi veya aşağıda açıklandığı gibi ssh tünelleri kullanarak.

## Müfettiş.

Birkaç ticari ve açık kaynak araçları düğümün Müfettiş bağlanabilir. Temel
bunlar hakkında bilgi aşağıdaki gibidir:

#### kontrol [düğüm] https://github.com/nodejs/node-inspect)

* Düğüm tarafından desteklenen CLI hata ayıklayıcı.[Müfettiş protokolü] [] kullanan JS Vakfı.
* Bir sürüm düğüm ile birlikte ve 'düğüm' myscript ile kullanılabilir . js'.
* En son sürümü de bağımsız olarak monte edilebilir (örneğin`npm ınstall-g node-ınspect')
  ve ' node-ınspect myscript ile kullanılır.js'.

#### [Chrome DevTools] (https://github.com/ChromeDevTools/devtools-frontend) 55+

* * * Seçenek 1**: Açık `krom://ınspect` bir Krom tabanlı
  tarayıcı. Yapılandırma düğmesini tıklatın ve hedef ana bilgisayar ve bağlantı noktası emin olun
  listelenir.
* * * Seçenek 2**: `/json/list` çıkışından `devtoolsFrontendUrl`kopyalayın
  (yukarıya bakın) veya --ipucu metnini inceleyin ve Chrome'a yapıştırın.
** * Seçenek 3**: Chrome uzantısı NIM (düğüm Müfettiş Yöneticisi) yükleyin):  
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio kodu] (https://github.com/microsoft/vscode) 1.10+

* Hata ayıklama panelinde ' açmak için ayarlar simgesini tıklatın.vscode / başlatma.json'.
  "Düğüm"İ Seçin .ilk kurulum için js".

#### [Visual Studio] (https://github.com/Microsoft/nodejstools) 2017

* Menüden "hata ayıklama > hata ayıklamayı Başlat" ı seçin veya F5 tuşuna basın . 
* [Ayrıntılı talimatlar] (https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm] (https://www.jetbrains.com/webstorm/) 2017.1 + ve diğer JetBrains IDEs

* Yeni bir düğüm oluşturun . JS hata ayıklama yapılandırma ve hata ayıklama vurdu. '--ınspect ' kullanılacaktır
  düğüm için varsayılan olarak.js 7+. JS işaretini kaldırın devre dışı bırakmak için.hata ayıklayıcı.düğümlü.kullanma.ınspect ' in
  IDE kayıt defteri.

#### [chrome-remote-ınterface] (https://github.com/cyrus-and/chrome-remote-interface)

* Kütüphane Müfettiş Protokol uç noktaları bağlantıları kolaylaştırmak için.

---

## Komut satırı seçenekleri

Aşağıdaki tabloda çeşitli çalışma zamanı bayrakları hata ayıklama üzerindeki etkisini listeler:

< table cellpadding="0" cellspading="0">
  <tr><th>bayrak</th><Th>anlam</th> < /tr>
  < tr>
    <td>--ınspect < /td>
    < td>
      < ul>
        <li>Müfettiş aracısını Etkinleştir < /li>
        <li>varsayılan adres ve bağlantı noktasını dinleyin (127.0.0.1:9229) < / li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    < td>--ınspect= < i > [host:port]</i>< / td>
    < td>
      < ul>
        <li>Müfettiş aracısını Etkinleştir < /li>
        <li>adres veya ana bilgisayar adı<i>ana bilgisayar</i> (varsayılan: 127.0.0.1) < /li>
        <li>Port Dinle<i>port</i> (varsayılan: 9229) < /li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    < td>--ınspect-brk</td>
    < td>
      < ul>
        <li>Müfettiş aracısını Etkinleştir < /li>
        <li>varsayılan adres ve bağlantı noktasını dinleyin (127.0.0.1:9229) < / li>
        <li>kullanıcı kodu başlamadan önce kırın < /li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    < td>--ınspect-brk= < i > [host:port]</i></td>
    < td>
      < ul>
        <li>Müfettiş aracısını Etkinleştir < /li>
        <li>adres veya ana bilgisayar adı<i>ana bilgisayar</i> (varsayılan: 127.0.0.1) < /li>
        <li>Port Dinle<i>port</i> (varsayılan: 9229) < /li>
        <li>kullanıcı kodu başlamadan önce kırın < /li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    <td> < code>düğüm denetimi < i>komut dosyası.js < / i > < / code > < / td>
    < td>
      < ul>
        < li>kullanıcının komut dosyasını --ınspect bayrağı altında çalıştırmak için alt işlemi Spawn;
            ve CLI hata ayıklayıcısını çalıştırmak için ana işlemi kullanın.< / li>
      < / ul>
    < / td>
  < / tr>
  < tr>
    <td> < code>node ınspect -- port = xxxx < i>komut dosyası.js < / i > < / code > < / td>
    < td>
      < ul>
        < li>kullanıcının komut dosyasını --ınspect bayrağı altında çalıştırmak için alt işlemi Spawn;
            ve CLI hata ayıklayıcısını çalıştırmak için ana işlemi kullanın.< / li>
        <li>Port Dinle<i>port</i> (varsayılan: 9229) < /li>
      < / ul>
    < / td>
  < / tr>
</Tablo>

---

## Uzaktan hata ayıklama senaryolarını etkinleştirme

Hata ayıklayıcı bir ortak IP adresi üzerinde dinlemek asla öneririz. Eğer
uzaktan hata ayıklama bağlantılarının ssh kullanımını önermesine izin vermeniz gerekir
bunun yerine tüneller. Sadece açıklayıcı amaçlar için aşağıdaki örneği sağlıyoruz.
Ayrıcalıklı bir uzaktan erişim sağlayan güvenlik riskini anlamak lütfen
devam etmeden önce servis.

Diyelim ki uzak makinede düğüm çalıştırıyorsunuz, remote.example.com, bu sen
hata ayıklama yapabilmek istiyorum. O makinede, düğüm işlemini başlatmalısınız
Müfettiş yalnızca localhost (varsayılan) dinlerken.

```deneme
$ node -- ınspect server.js
"`

Şimdi, yerel makinenizde bir hata ayıklama istemcisi başlatmak istediğiniz yerden
bağlantı, bir ssh tüneli kurabilirsiniz:

```deneme
$ ssh-l 9221: localhost: 9229 user@remote.example.com
"`

Bu, yerel bağlantı noktanızdaki 9221 bağlantı noktasına bir ssh tünel oturumu başlatır
makine port 9229 iletilir remote.example.com. Artık ekleyebilirsiniz
Chrome DevTools veya Visual Studio kodu localhost: 9221 gibi bir hata ayıklayıcı,
hangi düğüm gibi hata ayıklama gerekir.js uygulaması yerel olarak çalışıyordu.

---

## Eski Hata Ayıklayıcı

** Eski hata ayıklayıcı düğüm 7.7.0 itibariyle kullanımdan kaldırılmıştır. Lütfen kullanın -- ınspect
ve bunun yerine Müfettiş.**

**--Debug ile başlatıldığında** veya **--debug-brk** sürüm 7 anahtarları ve
daha önce, Node.js, kullanıcı tarafından tanımlanan hata ayıklama komutlarını dinler
V8 hata Ayıklama TCP bağlantı noktası iletişim Kuralı, varsayılan `5858. Herhangi bir hata ayıklayıcı istemcisi
hangi Bu Protokol bağlanmak ve çalışan işlemi hata ayıklama konuşuyor; a
birkaç popüler olanlar aşağıda listelenmiştir.

V8 hata ayıklama Protokolü artık korunur veya belgelenmez.

#### [Yerleşik hata ayıklayıcı] (https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Başlat ' düğüm hata ayıklama script_name.JS ' düğümün yerleşik altında komut dosyası başlatmak için
komut satırı hata ayıklayıcı. Komut dosyanız ile başlayan başka bir düğüm işleminde başlar
'--debug-brk ' seçeneği ve ilk düğüm işlemi `_debugger.js`
komut dosyası ve hedef bağlanır.

###[düğüm-Müfettiş](https://github.com/node-inspector/node-inspector # )

Düğümünüzü hata ayıklayın.aracı bir işlem kullanarak Chrome DevTools ile JS uygulaması
Chromium'da kullanılan Müfettiş protokolünü V8 hata Ayıklayıcısına çevirir
düğümde kullanılan protokol.js.

<!-- hakemler -->

[Müfettiş Protokolü]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122