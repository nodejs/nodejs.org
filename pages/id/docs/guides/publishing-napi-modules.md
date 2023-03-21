---
title: Cara mempublikasikan paket N-API
layout: docs.hbs
---

# Untuk mempublikasikan versi N-API dari sebuah paket bersama dengan versi non-N-API

Langkah-langkah berikut diilustrasikan menggunakan paket `iotivity-node`:

* Pertama, publikasikan versi non-N-API:
  * Perbarui versi di `package.json`. Untuk `iotivity-node`, versi menjadi `1.2.0-2`.
  * Periksa daftar periksa rilis (pastikan tes/demo/dokumen baik-baik saja)
  * `npm publish`
* Kemudian, publikasikan versi N-API:
  * Perbarui versi di `package.json`. Dalam kasus `iotivity-node`, versi menjadi `1.2.0-3`. Untuk versi, kami sarankan mengikuti skema versi pra-rilis seperti yang dijelaskan oleh [semver.org](https://semver.org/#spec-item-9) mis. `1.2.0-napi`.
  * Periksa daftar periksa rilis (pastikan tes/demo/dokumen baik-baik saja)
  * `npm publish --tag n-api`

Dalam contoh ini, menandai rilis dengan `n-api` telah memastikan bahwa, meskipun versi 1.2.0-3 lebih lambat dari versi yang diterbitkan non-N-API (1.2.0-2), itu tidak akan diinstal jika seseorang memilih untuk menginstal `iotivity-node` hanya dengan menjalankan `npm install iotivity-node`. Ini akan menginstal versi non-N-API secara default. Pengguna harus menjalankan `npm install iotivity-node@n-api` untuk menerima versi N-API. Untuk informasi lebih lanjut tentang penggunaan tag dengan npm, periksa out ["Menggunakan dist-tags"][].

## Untuk memperkenalkan ketergantungan pada versi N-API dari sebuah paket

Untuk menambahkan versi N-API dari `iotivity-node` sebagai dependensi, Maka `package.json` akan terlihat seperti ini:

```json
"dependencies": {
  "iotivity-node": "n-api"
}
```

> Seperti yang dijelaskan dalam ["Menggunakan dist-tags"][], tidak seperti versi biasa, versi yang diberi tag tidak boleh ditangani oleh rentang versi seperti `"^2.0.0"` di dalam `package.json`. Itu alasannya adalah karena tag merujuk ke satu versi. Jadi, jika pengelola paket memilih untuk menandai versi paket yang lebih baru menggunakan tag yang sama, `npm update` akan menerima versi yang lebih baru. Ini harus diterima mengingat sifat eksperimental N-API saat ini. Untuk bergantung pada N-API-enabled versi selain yang terbaru diterbitkan, ketergantungan `package.json` akan harus merujuk ke versi persis seperti berikut:

```json
"dependencies": {
  "iotivity-node": "1.2.0-3"
}
```

["Menggunakan dist-tags"]: https://docs.npmjs.com/getting-started/using-tags
