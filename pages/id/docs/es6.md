---
title: ECMAScript 2015 (ES6) dan seterusnya
layout: docs.hbs
---

# ECMAScript 2015 (ES6) dan seterusnya

Node.js dibuat dengan versi modern [V8](https://v8.dev/). Dengan terus mengikuti rilis terbaru mesin ini, kami memastikan fitur baru dari [Spesifikasi JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) dibawa ke pengembang Node.js secara tepat waktu, serta peningkatan kinerja dan stabilitas yang berkelanjutan.

Semua fitur ECMAScript 2015 (ES6) dibagi menjadi tiga grup untuk fitur **pengiriman**, **bertahap**, dan **sedang berlangsung**:

* Semua fitur **pengiriman**, yang dianggap stabil oleh V8, diaktifkan **secara default di Node.js** dan **TIDAK** memerlukan tanda waktu proses apa pun.
* Fitur **Staged**, yang merupakan fitur yang hampir selesai dan tidak dianggap stabil oleh tim V8, memerlukan flag runtime: `--harmony`.
* **Dalam proses** fitur dapat diaktifkan satu per satu dengan bendera harmoni masing-masing, meskipun hal ini sangat tidak disarankan kecuali untuk tujuan pengujian. Catatan: tanda ini diekspos oleh V8 dan berpotensi berubah tanpa pemberitahuan penghentian.

## Fitur mana yang dikirimkan dengan versi Node.js mana secara default?

Situs web [node.green](https://node.green/) memberikan gambaran yang sangat baik tentang fitur ECMAScript yang didukung di berbagai versi Node.js, berdasarkan tabel kompatibilitas kangax.

## Fitur mana yang sedang berlangsung?

Fitur-fitur baru terus ditambahkan ke mesin V8. Secara umum, perkirakan mereka akan mendarat di rilis Node.js di masa mendatang, meskipun waktunya tidak diketahui.

Anda dapat membuat daftar semua fitur *sedang berlangsung* yang tersedia pada setiap rilis Node.js dengan memahami argumen `--v8-options`. Harap dicatat bahwa ini adalah fitur V8 yang tidak lengkap dan mungkin rusak, jadi gunakan dengan risiko Anda sendiri:

```bash
node --v8-options | grep "in progress"
```

## Saya telah menyiapkan infrastruktur saya untuk memanfaatkan flag --harmony. Haruskah saya menghapusnya?

Perilaku flag `--harmony` saat ini di Node.js adalah untuk mengaktifkan fitur **staged** saja. Lagi pula, sekarang menjadi sinonim dari `--es_staging`. Seperti disebutkan di atas, ini adalah fitur lengkap yang belum dianggap stabil. Jika Anda ingin bermain aman, terutama di lingkungan produksi, pertimbangkan untuk menghapus flag runtime ini hingga dikirimkan secara default pada V8 dan, akibatnya, pada Node.js. Jika Anda tetap mengaktifkan ini, Anda harus siap untuk peningkatan Node.js lebih lanjut untuk memecahkan kode Anda jika V8 mengubah semantiknya untuk lebih mengikuti standar.

## Bagaimana cara menemukan versi V8 mana yang dikirimkan dengan versi Node.js tertentu?

Node.js menyediakan cara sederhana untuk membuat daftar semua dependensi dan versi masing-masing yang dikirimkan dengan biner tertentu melalui objek global `process`. Dalam hal mesin V8, ketik berikut ini di terminal Anda untuk mengambil versinya:

```bash
node -p process.versions.v8
```
