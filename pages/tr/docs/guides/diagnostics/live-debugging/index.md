---
title: Canlı Hata Ayıklama
layout: docs.hbs
---

# Canlı Hata Ayıklama

* [Canlı Hata Ayıklama](#live-debugging)
  * [Uygulamam beklenen şekilde davranmıyor](#my-application-doesnt-behave-as-expected)
    * [Belirtiler](#symptoms)
    * [Hata ayıklama](#debugging)

Bu dokümanda bir Node.js işleminde canlı hata ayıklamanın nasıl yapılacağını öğrenebilirsiniz.

## Uygulamam beklenen şekilde davranmıyor

### Belirtiler

Kullanıcı, uygulamanın belirli girdiler için beklenen çıktıyı vermediğini gözlemleyebilir; örneğin, bir HTTP sunucusu belirli alanların boş olduğu bir JSON yanıtı döndürür. Süreç sırasında çeşitli şeyler yanlış gidebilir, ancak bu kullanım için temel olarak uygulamanın çalışma mantığına ve doğruluğuna odaklanıyoruz.

### Hata ayıklama

Bu kullanımda kullanıcı, HTTP isteği gibi bir tetikleyici için uygulamamızın çalıştırdığı kodu görmek ister. Ayrıca kullanıcı, kodda adım adım ilerlemek ve kodun çalışma aşamasını kontrol etmenin yanı sıra değişkenlerin bellekte hangi değerleri tuttuğunu incelemek isteyebilir.

* [Inspector Kullanımı](/en/docs/guides/diagnostics/live-debugging/using-inspector)
