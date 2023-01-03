---
title: ECMAScript 2015 (ES6) ve ötesi
layout: docs.hbs
---

# ECMAScript 2015 (ES6) ve ötesi

Node.js [V8](https://v8.dev/)'in modern sürümlerine göre oluşturulmuştur. Bu motorun en son sürümlerini güncel tutarak, [JavaScript ECMA-262 spesifikasyonundaki](http://www.ecma-international.org/publications/standards/Ecma-262.htm) yeni özelliklerin zamanında Node.js geliştiricilerine ulaştırılmasının yanı sıra sürekli performans ve kararlılık iyileştirmeleri sağlıyoruz.

Bütün ECMAScript 2015 (ES6) özellikleri **shipping**, **staged** ve **in progress** olarak üç gruba ayrılmıştır:

* Tüm **shipping** özellikleri, V8'in kararlı olduğunu düşündüğü, **Node.js'de varsayılan olarak açıktır** ve herhangi bir çalışma zamanı işareti **GEREKTİRMEZ**.
* **Staged** özellikleri, neredeyse tamamlanmış fakat V8 takımı tarafından kararlı olduğu düşünülmeyen özellikler, bir çalışma zamanı işareti gerektirir: `--harmony`.
* **In progress** özellikleri kendi uyum işaretiyle ayrı ayrı olarak etkinleştirilebilir, test amaçlı olmadıkça bu kesinlikle önerilmez. Not: bu işaretler V8 tarafından sunulmuştur ve herhangi bir kullanımdan kaldırma bildirimi olmaksızın potansiyel olarak değişecektir.

## Hangi özellikler hangi Node.js sürümüyle varsayılan olarak gelir?

[node.green](https://node.green/) web sitesi, kangax'ın uyum tablosuna dayalı, Node.js'nin çeşitli sürümlerinde desteklenen ECMAScript özelliklerine mükemmel bir genel bakış sağlar.

## Hangi özelikler yapım aşamasında?

V8 motoruna sürekli olarak yeni özellikler eklenmektedir. Genel olarak, zamanlama bilinmese de, gelecekteki bir Node.js sürümüne geçmelerini bekleyin.

Her Node.js sürümünde mevcut olan tüm *in progress* özelliklerini `--v8-options` argümanını kullanarak listeleyebilirsiniz. Lütfen bunların eksik ve muhtemelen bozuk V8 özellikleri olduğunu unutmayın, bu nedenle bunları kendi sorumluluğunuzda kullanın:

```bash
node --v8-options | grep "in progress"
```

## --harmony işaretini kullanarak altyapımı oluşturdum. Kaldırmalı mıyım?

Node.js üzerindeki `--harmony` işaretinin şu anki davranışı yalnızca **staged** özellikleri etkinleştirmektir. Sonuçta, artık `--es_staging` ile eş anlamlıdır. Yukarıda bahsedildiği gibi, bunlar henüz kararlı olduğu düşünülmeyen tamamlanmış özelliklerdir. Eğer risk almak istemiyorsanız, özellikle üretim ortamlarında, V8'de ve dolayısıyla Node.js'de varsayılan olarak gönderilinceye kadar bu çalışma zamanı işaretini kaldırmayı düşünün. Bunu etkin tutarsanız, gelecekteki Node.js yükseltmelerinde, V8 standartı yakından takip etmek için onların anlamlarını değiştirirse kodunuzun bozulmasına hazır olmalısınız.

## Hangi V8 sürümünün belirli bir Node.js sürümüyle birlikte geldiğini nasıl öğrenebilirim?

Node.js, `process` global nesnesi aracılığıyla tüm bağımlılıkları ve ilgili sürümleri listelemek için basit bir yol sağlar. V8 motoru hakkında, versiyonunu almak için terminalinize aşağıdakileri yazın:

```bash
node -p process.versions.v8
```
