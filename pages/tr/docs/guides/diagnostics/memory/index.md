---
title: Bellek Hataları Teşhisi
layout: docs.hbs
---

# Bellek

Bu dokümanda bellek ile ilgili hataların nasıl çözüleceğini öğrenebilirsin.

* [Bellek](#memory)
  * [Bellek yetersizliği](#my-process-runs-out-of-memory)
    * [Belirtiler](#symptoms)
    * [Yan Etkiler](#side-effects)
  * [Belleğin verimsiz kullanılması](#my-process-utilizes-memory-inefficiently)
    * [Belirtiler](#symptoms-1)
    * [Yan Etkiler](#side-effects-1)
  * [Hataları ayıklamak](#debugging)

## Bellek yetersizliği

Node.js_(JavaScript)_ çöp toplayıcı bir dildir, yani saklayıcılar aracılığıyla bellek sızıntıları olması mümkündür. Node.js uygulamaları genellikle çok kiracılı, uzun süreli çalışan ve kritik işlerdir. Dolayısıyla bellek sızıntılarını bulmak için erişilebilir ve verimli bir yol sunmak önemlidir.

### Belirtiler

Kullanıcı, sürekli artan bellek kullanımını _(hızlı veya yavaş, günler hatta haftalar boyunca)_ gözlemliyor, ardından işlem yöneticisi tarafından işlemin çöküp yeniden başlatıldığını görüyorsa. Belki de işlem önceki haline göre daha yavaş çalışıyor ve yeniden başlatmalar bazı isteklerin başarısız olmasına sebep oluyorsa_(yük dengeleyici 502 koduyla cevap veriyorsa)_.

### Yan Etkiler

* Belleğin tükenmesi sebebiyle işlemin yeniden başlatılması ve isteklerin tamamlanamaması
* GC aktivitesinin artması sebebiyle oluşan daha fazla CPU kullanımı ve daha yavaş cevap süresi
  * GC'nin Event Loop'u bloklaması ve yavaşlığa sebep olması
* Bellek takasının artışı sebebiyle işlemin yavaşlaması (GC aktivitesi)
* Heap Snapshot alabilmek için yeterli bellek alanının kalmaması

## Belleğin verimsiz kullanılması

### Belirtiler

Uygulamanın beklenenin dışında belleği kullanması ve/veya garbage collector aktivitesinin artığını gözlemek.

### Yan Etkiler

* Artan sayıda sayfa hataları
* Yüksek GC aktivitesi ve CPU kullanımı

## Hata ayıklamak

Çoğu bellek sorunu, belirli nesne türlerimizin ne kadar yer kapladığını ve onların çöp toplamasını engelleyen değişkenlerin neler olduğunu belirleyerek çözülebilir. Programımızın zaman içindeki tahsis desenini bilmek de yardımcı olabilir.

* [Heap Profiler kullanmak](/en/docs/guides/diagnostics/memory/using-heap-profiler/)
* [Heap Snapshot kullanmak](/en/docs/guides/diagnostics/memory/using-heap-snapshot/)
* [GC İzleri](/en/docs/guides/diagnostics/memory/using-gc-traces)
