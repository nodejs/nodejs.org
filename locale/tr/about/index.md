---
layout: about.hbs
title: Hakkında
trademark: Trademark
---

# Node.js® Hakkında

Asenkron, olay tabanlı JavaScript çalışma ortamı olan Node.js, ölçeklenebilir ağ uygulamaları
oluşturmak için tasarlanmıştır. Aşağıdaki "hello world" örneğinde, birçok bağlantı
aynı anda ele alınabilir. Her bağlantıda geri çağırım başlatılır,
ancak yapılacak hiçbir iş yoksa Node.js uyuyacaktır.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Bu, işletim sistemi iş parçacıklarının(thread) kullanıldığı günümüzün yaygın
eşzamanlılık modelinin aksinedir. İş parçacığı tabanlı ağ iletişimi nispeten
yetersiz ve kullanmak için zor. Ayrıca, Node.js kullanıcıları işlemlerin
kilitlenmesinden endişe duymaz, çünkü kilitler yoktur. Node.js'deki neredeyse
hiçbir işlev doğrudan G/Ç gerçekleştirmez, bu yüzden işlem hiç bloklanmaz.
Hiçbir şey engellemediğinden, ölçeklenebilir sistemlerin Node.js'de geliştirilmesi çok makul.

Bu dilin bir kısmı alışılmadık geldiyse, [Blocking vs. Non-Blocking][] hakkında tam bir makale mevcut.

---

Node.js, Ruby'nin [Event Machine][] ve Python'ın [Twisted][] gibi sistemlerine
tasarım olarak benzer ve bunlardan etkilenmiştir. Node.js olay modelini biraz
daha ileri götürür. [event loop][]'u bir kütüphane yerine çalışma ortamı yapısı
olarak sunar. Diğer sistemlerde, genellikle event-loop'u başlatan bir blokeli
çağırım  vardır. Tipik olarak, davranış betiğin başlangıcındaki geri çağırımlar
vasıtasıyla tanımlanmıştır ve sonunda bir sunucu `EventMachine::run()` gibi bir
blokeli çağırım vasıtasıyla başlatılır. Node.js'de böyle bir olay-dongüsünü-başlat çağırımı
yoktur. Node.js girdi betiğini yürüttükten sonra basitçe olay döngüsüne girer.
Node.js yerine getirilecek daha fazla geri çağırım kalmadığı zaman olay döngüsünden çıkar.
Bu davranış internet tarayıcısındaki JavaScript gibidir - olay döngüsü kullanıcıdan gizlenmiştir.

HTTP, akış ve düşük gecikme süresi göz önünde bulundurularak tasarlanan Node.js'de birinci sınıf bir vatandaştır.
Bu, Node.js'yi bir web kütüphanesinin veya çatının oluşturulması için çok uygun yapar.

Node.js'nin iş parçacıkları olmadan tasarlanmış olması, ortamınızdaki
birden çok çekirdeğin avantajlarından yararlanamayacağınız anlamına gelmez.
Çocuk işlemler [`child_process.fork()`][] API'miz kullanılarak oluşturulabilirler
ve birbirleriyle iletişim kurması kolay olacak şekilde tasarlanmışlardır.
Aynı arayüz üzerine kurulu [`cluster`][] modülü, çekirdekleriniz üzerindeki
yük dengelemesini sağlamak için işlemler arasında soketleri paylaşmanıza olanak tanır.

[Blocking vs. Non-Blocking]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
