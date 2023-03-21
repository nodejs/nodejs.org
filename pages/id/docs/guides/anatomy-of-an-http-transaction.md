---
title: Anatomi Transaksi HTTP
layout: docs.hbs
---

# Anatomi Transaksi HTTP

Tujuan dari panduan ini adalah untuk memberikan pemahaman yang kuat tentang proses Penanganan HTTP Node.js. Kami akan berasumsi bahwa Anda tahu, secara umum, bagaimana HTTP permintaan bekerja, terlepas dari bahasa atau lingkungan pemrograman. Kami juga akan mengasumsikan sedikit keakraban dengan Node.js [`EventEmitters`][] dan [`Streams`][]. Jika Anda tidak cukup akrab dengan mereka, ada baiknya membaca cepat dokumen API untuk masing-masingnya.

## Buat Server

Setiap aplikasi server web node pada titik tertentu harus membuat server web obyek. Ini dilakukan dengan menggunakan [`createServer`][].

```javascript
const http = require('http');

const server = http.createServer((request, response) => {
  // magic happens here!
});
```

Fungsi yang diteruskan ke [`createServer`][] dipanggil sekali untuk setiap Permintaan HTTP yang dibuat terhadap server itu, jadi itu disebut permintaan pawang Sebenarnya, objek [`Server`][] yang dikembalikan oleh [`createServer`][] adalah sebuah [`EventEmitter`][], dan apa yang kita miliki di sini hanyalah singkatan untuk membuat objek `server` dan kemudian menambahkan pendengar nanti.

```javascript
const server = http.createServer();
server.on('request', (request, response) => {
  // the same kind of magic happens here!
});
```

Ketika permintaan HTTP mengenai server, node memanggil fungsi handler permintaan dengan beberapa objek praktis untuk menangani transaksi, `permintaan` dan `tanggapan`. Kami akan segera membahasnya.

Untuk benar-benar melayani permintaan, metode [`listen`][] perlu dipanggil pada objek `server`. Dalam kebanyakan kasus, yang perlu Anda lakukan untuk `mendengarkan` adalah nomor port yang Anda inginkan untuk didengarkan oleh server. Ada beberapa pilihan lain juga, jadi lihat [referensi API][].

## Metode, URL, dan Header

Saat menangani permintaan, hal pertama yang mungkin ingin Anda lakukan adalah melihat metode dan URL, sehingga tindakan yang tepat dapat diambil. Node.js membuat ini relatif tidak menyakitkan dengan meletakkan properti praktis ke objek `permintaan`.

```javascript
const { method, url } = request;
```

> Objek `request` adalah turunan dari [`IncomingMessage`][].

`Metode` di sini akan selalu menjadi metode/kata kerja HTTP normal. `url` adalah URL lengkap tanpa server, protokol, atau port. Untuk URL biasa, ini berarti semuanya setelah dan termasuk garis miring ketiga.

Header juga tidak jauh. Mereka berada di objek mereka sendiri pada `permintaan` yang disebut `headers`.

```javascript
const { headers } = request;
const userAgent = headers['user-agent'];
```

Penting untuk dicatat di sini bahwa semua header hanya diwakili dalam huruf kecil, terlepas dari bagaimana klien sebenarnya mengirimnya. Ini menyederhanakan tugas parsing header untuk tujuan apa pun.

Jika beberapa header diulang, maka nilainya akan ditimpa atau digabungkan bersama-sama sebagai string yang dipisahkan koma, tergantung pada header. Dalam beberapa kasus, ini bisa menjadi masalah, jadi [`rawHeaders`][] juga tersedia.

## Badan Permintaan

Saat menerima permintaan `POST` atau `PUT`, badan permintaan mungkin penting untuk aplikasi Anda. Mendapatkan data tubuh sedikit lebih terlibat daripada mengakses header permintaan. Objek `request` yang diteruskan ke handler mengimplementasikan antarmuka [`ReadableStream`][]. Aliran ini dapat didengarkan atau disalurkan ke tempat lain seperti aliran lainnya. Kami dapat mengambil data langsung dari stream dengan mendengarkan event `'data'` dan `'end'` stream.

Potongan yang dipancarkan di setiap kejadian `'data'` adalah [`Buffer`][]. Jika Anda tahu itu akan menjadi data string, hal terbaik yang harus dilakukan adalah mengumpulkan data dalam array, lalu di `'end'`, gabungkan dan rangkum.

```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

> Ini mungkin tampak sedikit membosankan, dan dalam banyak kasus memang demikian. Untunglah, ada modul seperti [`concat-stream`][] dan [`body`][] pada [`npm`][] yang dapat membantu menyembunyikan sebagian dari logika ini. Penting untuk memiliki pemahaman yang baik tentang apa yang terjadi sebelum menempuh jalan itu, dan itulah mengapa Anda ada di sini!

## Hal Singkat Tentang Kesalahan

Karena objek `request` adalah [`ReadableStream`][], itu juga merupakan [`EventEmitter`][] dan berperilaku seperti saat terjadi kesalahan.

Kesalahan dalam aliran `request` muncul dengan memancarkan peristiwa `'error'` di aliran. **Jika Anda tidak memiliki pendengar untuk acara itu, kesalahannya adalah *dilempar*, yang dapat merusak program Node.js Anda.** Oleh karena itu, Anda harus menambahkan pendengar `'error'` pada aliran permintaan Anda, meskipun Anda baru saja mencatatnya dan lanjutkan perjalananmu. (Meskipun mungkin yang terbaik untuk mengirim semacam kesalahan HTTP tanggapan. Lebih lanjut tentang itu nanti.)

```javascript
request.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});
```

Ada cara lain untuk [menangani kesalahan ini][] seperti abstraksi dan alat lain, tetapi selalu waspadai bahwa kesalahan dapat dan memang terjadi, dan Anda harus berurusan dengan mereka.

## Apa yang Kita Miliki Sejauh Ini

Pada titik ini, kita telah membahas pembuatan server, dan mengambil metode, URL, header dan isi dari permintaan. Ketika kita menggabungkan semuanya, itu mungkin terlihat sesuatu seperti ini:

```javascript
const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });
}).listen(8080); // Activates this server, listening on port 8080.
```

Jika kita menjalankan contoh ini, kita akan dapat *menerima* permintaan, tetapi tidak *merespon* ke mereka. Sebenarnya, jika Anda menekan contoh ini di browser web, permintaan Anda akan waktu habis, karena tidak ada yang dikirim kembali ke klien.

Sejauh ini kita belum menyentuh objek `response` sama sekali, yang merupakan sebuah instance dari [`ServerResponse`][], yang merupakan [`WritableStream`][]. Ini berisi banyak metode yang berguna untuk mengirim data kembali ke klien. Kami akan membahasnya selanjutnya.

## Kode Status HTTP

Jika Anda tidak repot mengaturnya, kode status HTTP pada respons akan selalu menjadi 200. Tentu saja, tidak setiap respons HTTP menjamin hal ini, dan pada titik tertentu Anda pasti ingin mengirim kode status yang berbeda. Untuk melakukan itu, Anda dapat mengatur properti `statusCode`.

```javascript
response.statusCode = 404; // Tell the client that the resource wasn't found.
```

Ada beberapa jalan pintas lain untuk ini, seperti yang akan kita lihat segera.

## Mengatur Header Respons

Header diatur melalui metode praktis yang disebut [`setHeader`][].

```javascript
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

Saat menyetel header pada respons, nama mereka tidak peka huruf besar-kecil. Jika Anda mengatur header berulang kali, nilai terakhir yang Anda tetapkan adalah nilai yang didapat terkirim.

## Mengirim Data Header Secara Eksplisit

Metode pengaturan header dan kode status yang telah kita bahas asumsikan bahwa Anda menggunakan "header implisit". Ini berarti Anda mengandalkan simpul untuk mengirim header untuk Anda pada waktu yang tepat sebelum Anda mulai mengirim badan data.

Jika mau, Anda dapat *secara eksplisit* menulis header ke aliran respons. Untuk melakukan ini, ada metode yang disebut [`writeHead`][], yang menulis status kode dan header ke aliran.

```javascript
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
});
```

Setelah Anda mengatur header (baik secara implisit atau eksplisit), Anda siap untuk mulai mengirim data respons.

## Mengirim Badan Respon

Karena objek `response` adalah [`WritableStream`][], menulis badan respons keluar ke klien hanya masalah menggunakan metode aliran biasa.

```javascript
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

Fungsi `akhir` pada aliran juga dapat mengambil beberapa data opsional untuk dikirim sebagai bit terakhir dari data pada aliran, sehingga kita dapat menyederhanakan contoh di atas sebagai berikut.

```javascript
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> Penting untuk mengatur status dan header *sebelum* Anda mulai menulis potongan data ke badan. Ini masuk akal, karena header datang sebelumnya isi dalam tanggapan HTTP.

## Hal Cepat Lain Tentang Kesalahan

Aliran `response` juga dapat memancarkan peristiwa `'error'`, dan pada titik tertentu Anda akan harus berurusan dengan itu juga. Semua saran untuk aliran `permintaan` kesalahan masih berlaku di sini.

## Satukan Semuanya

Sekarang kita telah belajar tentang membuat tanggapan HTTP, mari kita gabungkan semuanya. Berdasarkan contoh sebelumnya, kita akan membuat server yang mengirim kembali semua data yang dikirimkan kepada kami oleh pengguna. Kami akan memformat data itu sebagai JSON menggunakan `JSON.stringify`.

```javascript
const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}).listen(8080);
```

## Contoh Server Echo

Mari kita sederhanakan contoh sebelumnya untuk membuat server echo sederhana, yang hanya mengirimkan data apa pun yang diterima dalam permintaan segera sebagai tanggapan. Semua yang perlu kita lakukan adalah mengambil data dari aliran permintaan dan menulis data itu ke aliran respons, mirip dengan apa yang kami lakukan sebelumnya.

```javascript
const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    response.end(body);
  });
}).listen(8080);
```

Sekarang mari kita tweak ini. Kami hanya ingin mengirim echo di bawah ini kondisi:

* Metode permintaan adalah POST.
* URL-nya adalah `/echo`.

Dalam kasus lain, kami hanya ingin merespons dengan 404.

```javascript
const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

> Dengan memeriksa URL dengan cara ini, kita sedang melakukan bentuk "perutean". Bentuk perutean lainnya bisa sesederhana pernyataan `switch` atau serumit seluruh kerangka kerja seperti [`express`][]. Jika Anda mencari sesuatu yang bisa perutean dan tidak ada yang lain, coba [`router`][].

Besar! Sekarang mari kita coba menyederhanakan ini. Ingat, objek `permintaan` adalah [`ReadableStream`][] dan objek `response` adalah [`WritableStream`][]. Itu berarti kita bisa menggunakan [`pipe`][] untuk mengarahkan data dari satu ke yang lain. itu persis seperti yang kita inginkan untuk server echo!

```javascript
const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

Yay Berjalan!

Kami belum cukup selesai. Seperti disebutkan beberapa kali dalam panduan ini, kesalahan dapat dan memang terjadi, dan kita harus menghadapinya.

Untuk menangani kesalahan pada aliran permintaan, kami akan mencatat kesalahan ke `stderr` dan mengirim kode status 400 untuk menunjukkan `Permintaan Buruk`. Dalam aplikasi dunia nyata, meskipun, kami ingin memeriksa kesalahan untuk mencari tahu apa kode status yang benar dan pesan akan. Seperti biasa dengan kesalahan, Anda harus berkonsultasi dengan [`Dokumentasi kesalahan`][].

Pada respons, kami hanya akan mencatat kesalahan ke `stderr`.

```javascript
const http = require('http');

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

Kami sekarang telah membahas sebagian besar dasar-dasar penanganan permintaan HTTP. Pada saat ini, kamu harus bisa:

* Instansiasi server HTTP dengan fungsi pengendali permintaan, dan dengarkan di sebuah pelabuhan.
* Dapatkan data header, URL, metode, dan isi dari objek `permintaan`.
* Membuat keputusan perutean berdasarkan URL dan/atau data lain di objek `permintaan`.
* Kirim header, kode status HTTP, dan data isi melalui objek `respons`.
* Pipa data dari objek `request` dan ke objek `response`.
* Menangani kesalahan aliran di aliran `permintaan` dan `tanggapan`.

Dari dasar-dasar ini, server HTTP Node.js untuk banyak kasus penggunaan tipikal dapat: dibangun. Ada banyak hal lain yang disediakan oleh API ini, jadi pastikan untuk baca dokumen API untuk [`EventEmitters`][], [`Streams`][], dan [`HTTP`][].

[`EventEmitters`]: https://nodejs.org/api/events.html
[`Streams`]: https://nodejs.org/api/stream.html
[`createServer`]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[`Server`]: https://nodejs.org/api/http.html#http_class_http_server
[`listen`]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[referensi API]: https://nodejs.org/api/http.html
[`IncomingMessage`]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[`ReadableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[`rawHeaders`]: https://nodejs.org/api/http.html#http_message_rawheaders
[`Buffer`]: https://nodejs.org/api/buffer.html
[`concat-stream`]: https://www.npmjs.com/package/concat-stream
[`body`]: https://www.npmjs.com/package/body
[`npm`]: https://www.npmjs.com
[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
[menangani kesalahan ini]: https://nodejs.org/api/errors.html
[`ServerResponse`]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[`setHeader`]: https://nodejs.org/api/http.html#http_response_setheader_name_value
[`WritableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[`writeHead`]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[`express`]: https://www.npmjs.com/package/express
[`router`]: https://www.npmjs.com/package/router
[`pipe`]: https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[`Dokumentasi kesalahan`]: https://nodejs.org/api/errors.html
[`HTTP`]: https://nodejs.org/api/http.html
