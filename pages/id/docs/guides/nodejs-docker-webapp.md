---
title: Meng-docker aplikasi web Node.js
layout: docs.hbs
---

# Meng-docker aplikasi web Node.js

Tujuan dari contoh ini adalah untuk menunjukkan kepada Anda cara memasukkan aplikasi Node.js ke dalam Docker Container. Panduan ini ditujukan untuk pengembangan, dan *bukan* untuk penerapan produksi. Panduan ini juga mengasumsikan Anda memiliki Panduan ini juga mengasumsikan Anda memiliki [Instalasi Docker](https://docs.docker.com/engine/installation/) yang berfungsi dan dasar pemahaman tentang bagaimana aplikasi Node.js terstruktur.

Di bagian pertama panduan ini kita akan membuat aplikasi web sederhana di Node.js, lalu kita akan membangun image Docker untuk aplikasi itu, dan terakhir kita akan membuat instance container dari image itu.

Docker memungkinkan Anda untuk mengemas aplikasi dengan lingkungannya dan semua dependensinya ke dalam "kotak", yang disebut container. Biasanya, container terdiri dari aplikasi yang berjalan dalam versi sistem operasi Linux yang dilucuti ke dasar. Image adalah cetak biru untuk container, container adalah instance image yang sedang berjalan.

## Buat aplikasi Node.js

Pertama, buat direktori baru tempat semua file akan hidup. Di direktori ini buat file `package.json` yang menjelaskan aplikasi Anda dan dependensinya:

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

Dengan file `package.json` baru Anda, jalankan `npm install`. Jika Anda menggunakan `npm` versi 5 atau lebih baru, ini akan menghasilkan file `package-lock.json` yang akan disalin ke image Docker Anda.

Kemudian, buat file `server.js` yang mendefinisikan aplikasi web menggunakan Kerangka kerja [Express.js](https://expressjs.com/):

```javascript
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

Pada langkah selanjutnya, kita akan melihat bagaimana Anda dapat menjalankan aplikasi ini di dalam Docker container menggunakan image Docker resmi. Pertama, Anda harus membangun Docker image pada aplikasi Anda.

## Membuat Dockerfile

Buat file kosong bernama `Dockerfile`:

```markup
touch Dockerfile
```

Buka `Dockerfile` di editor teks favorit Anda

Hal pertama yang perlu kita lakukan adalah menentukan dari gambar apa kita ingin membangun. Di sini kita akan menggunakan versi terbaru LTS (dukungan jangka panjang) `18` dari `node` tersedia dari [Docker Hub](https://hub.docker.com/_/node):

```docker
FROM node:18
```

Selanjutnya kita membuat direktori untuk menyimpan kode aplikasi di dalam image, ini akan menjadi direktori kerja untuk aplikasi Anda:

```docker
# Create app directory
WORKDIR /usr/src/app
```

Image ini dilengkapi dengan Node.js dan NPM yang sudah terpasang, jadi hal berikutnya yang kami lakukan yang perlu dilakukan adalah menginstal dependensi aplikasi Anda menggunakan biner `npm`. Silahkan perhatikan bahwa jika Anda menggunakan `npm` versi 4 atau sebelumnya, `package-lock.json` file *tidak* akan dihasilkan.

```docker
# Menginstal dependensi aplikasi
# Wildcard digunakan untuk memastikan package.json DAN package-lock.json disalin
# jika tersedia (npm@5+)
COPY package*.json ./

RUN npm install
# Jika Anda membangun kode untuk produksi
# Jalankan npm ci --omit=dev
```

Perhatikan bahwa, daripada menyalin seluruh direktori kerja, kami hanya menyalin berkas `package.json`. Ini memungkinkan kami untuk memanfaatkan Docker yang di-cache lapisan. bitJudo memiliki penjelasan yang bagus tentang ini [di sini](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/). Selanjutnya, perintah `npm ci`, yang ditentukan dalam komentar, membantu menyediakan build yang lebih cepat, andal, dan dapat direproduksi untuk lingkungan produksi. Anda dapat membaca lebih lanjut tentang ini [di sini](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable).

Untuk menggabungkan kode sumber aplikasi Anda di dalam Docker image, gunakan `COPY` petunjuk:

```docker
# Bundle app source
COPY . .
```

Aplikasi Anda mengikat ke port `8080` sehingga Anda akan menggunakan instruksi `EXPOSE` untuk memetakannya oleh daemon `docker`:

```docker
EXPOSE 8080
```

Terakhir, tetapi tidak kalah penting, tentukan perintah untuk menjalankan aplikasi Anda menggunakan `CMD` yang mendefinisikan runtime Anda. Di sini kita akan menggunakan `node server.js` untuk memulai server Anda:

```docker
CMD [ "node", "server.js" ]
```

`Dockerfile` Anda sekarang akan terlihat seperti ini:

```docker
FROM node:18

# Buat direktori aplikasi
WORKDIR /usr/src/app

# Instal dependensi aplikasi
# Wildcard digunakan untuk memastikan package.json DAN package-lock.json disalin
# jika tersedia (npm@5+)
COPY package*.json ./

RUN npm install
# Jika Anda membangun kode untuk produksi
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

## .dockerignore file

Buat file `.dockerignore` di direktori yang sama dengan `Dockerfile` Anda dengan konten berikut:

```
node_modules
npm-debug.log
```

Ini akan mencegah modul lokal dan log debug Anda disalin ke Image Docker dan mungkin menimpa modul yang dipasang di dalam image Anda.

## Membangun citra Anda

Buka direktori yang memiliki `Dockerfile` Anda dan jalankan perintah berikut untuk membangun Docker image. Penanda `-t` memungkinkan Anda menandai image Anda sehingga lebih mudah untuk temukan nanti menggunakan perintah `docker images` berikut:

```bash
docker build . -t <your username>/node-web-app
```

Image Anda sekarang akan terdaftar oleh Docker:

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            18         78b037dbb659    2 weeks ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```

## Jalankan image

Menjalankan image Anda dengan `-d` akan menjalankan container dalam mode terpisah, meninggalkan container berjalan di latar belakang. Penanda`-p` mengalihkan port publik ke port pribadi di dalam container. Jalankan image yang Anda buat sebelumnya:

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

Hasil output aplikasi Anda:

```bash
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080
```

Jika Anda perlu masuk ke dalam container, Anda dapat menggunakan perintah `exec`:

```bash
# Enter the container
$ docker exec -it <container id> /bin/bash
```

## Uji

Untuk menguji aplikasi Anda, dapatkan port aplikasi Anda yang dipetakan oleh Docker:

```bash
$ docker ps

# Example
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```

Pada contoh di atas, Docker memetakan port `8080` di dalam container untuk port `49160` pada mesin Anda.

Sekarang Anda dapat memanggil aplikasi Anda menggunakan `curl` (install diperlukan melalui: `sudo apt-get
install curl`):

```bash
$ curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Mon, 13 Nov 2017 20:53:59 GMT
Connection: keep-alive

Hello world
```

## Matikan image

Untuk mematikan aplikasi yang kami mulai, kami menjalankan perintah `kill`. Ini memerlukan ID container, sebagai contoh kami mendapatkan ID container:`ecce33b30ebf`.

```bash
# Kill our running container
$ docker kill <container id>
<container id>

# Confirm that the app has stopped
$ curl -i localhost:49160
curl: (7) Failed to connect to localhost port 49160: Connection refused
```

Kami harap tutorial ini membantu Anda membuat dan menjalankan aplikasi Node.js sederhana di Docker.

Anda dapat menemukan informasi lebih lanjut tentang Docker dan Node.js di Docker di tempat-tempat berikut:

* [Docker image Node.js Resmi](https://hub.docker.com/_/node/)
* [Panduan Praktik Terbaik Docker Node.js](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
* [Dokumentasi Docker Resmi](https://docs.docker.com/get-started/nodejs/build-images/)
* [Tag Docker di Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
* [Subreddit Docker](https://reddit.com/r/docker)
