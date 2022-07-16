---
title: Bekerja dengan Sistem File Berbeda
layout: docs.hbs
---

# Bekerja dengan Sistem File Berbeda

Node.js memperlihatkan banyak fitur dari sistem file. Tetapi tidak semua sistem file sama.
Berikut ini adalah praktik terbaik yang disarankan untuk menjaga kode Anda tetap sederhana dan aman
ketika bekerja dengan sistem file yang berbeda.

## Perilaku Sistem File

Sebelum Anda dapat bekerja dengan sistem file, Anda perlu tahu bagaimana perilakunya.
Sistem file yang berbeda berperilaku berbeda dan memiliki lebih banyak atau lebih sedikit fitur daripada
lainnya: sensitivitas kasus, ketidakpekaan kasus, pelestarian kasus, formulir Unicode
pelestarian, resolusi cap waktu, atribut yang diperluas, inode, Unix
izin, aliran data alternatif, dll.

Berhati-hatilah dalam menyimpulkan perilaku sistem file dari `process.platform`. Sebagai contoh,
jangan berasumsi bahwa karena program Anda berjalan di Darwin maka Anda
oleh karena itu bekerja pada sistem file case-insensitive (HFS+), karena pengguna mungkin
menggunakan sistem file case-sensitive (HFSX). Demikian pula, jangan berasumsi bahwa karena
program Anda berjalan di Linux sehingga Anda bekerja pada sistem file
yang mendukung izin dan inode Unix, seperti yang mungkin Anda alami
drive eksternal, USB atau drive jaringan yang tidak.

Sistem operasi mungkin tidak memudahkan untuk menyimpulkan perilaku sistem file, tetapi semuanya
tidak hilang. Alih-alih menyimpan daftar setiap sistem file dan perilaku yang diketahui
(yang selalu tidak lengkap), Anda dapat menyelidiki sistem file untuk melihat
bagaimana sebenarnya ia berperilaku. Ada atau tidak adanya fitur tertentu yang
mudah diselidiki, seringkali cukup untuk menyimpulkan perilaku fitur lain yang
lebih sulit untuk diselidiki.

Ingat bahwa beberapa pengguna mungkin memiliki sistem file berbeda yang dipasang di berbagai jalur
di pohon kerja.

## Hindari Pendekatan Common Denominator Terendah

Anda mungkin tergoda untuk membuat program Anda bertindak seperti penyebut umum terendah
sistem file, dengan menormalkan semua nama file menjadi huruf besar, menormalkan semua nama file
ke bentuk NFC Unicode, dan menormalkan semua cap waktu file untuk mengatakan 1 detik
resolusi. Ini akan menjadi pendekatan penyebut umum terendah.

Jangan lakukan ini. Anda hanya akan dapat berinteraksi dengan aman dengan sistem file
yang memiliki karakteristik penyebut umum terendah yang sama persis di setiap
menghormati. Anda tidak akan dapat bekerja dengan sistem file yang lebih maju
yang diharapkan pengguna, dan Anda akan mengalami tabrakan nama file atau stempel waktu. Anda
pasti akan kehilangan dan merusak data pengguna melalui serangkaian rumit
peristiwa dependen, dan Anda akan membuat bug yang akan sulit jika tidak
mustahil untuk dipecahkan.

Apa yang terjadi ketika Anda nanti perlu mendukung sistem file yang hanya memiliki 2 detik?
atau resolusi stempel waktu 24 jam? Apa yang terjadi ketika standar Unicode maju
untuk memasukkan algoritma normalisasi yang sedikit berbeda (seperti yang terjadi di
masa lalu)?

Pendekatan common denominator terendah akan cenderung mencoba membuat portabel
program dengan hanya menggunakan panggilan sistem "portabel". Hal ini menyebabkan program-program yang
bocor dan sebenarnya tidak portabel.

## Mengadopsi Pendekatan Superset

Manfaatkan sebaik-baiknya setiap platform yang Anda dukung dengan mengadopsi pendekatan superset.
Misalnya, program pencadangan portabel harus menyinkronkan btimes (waktu yang dibuat untuk a
file atau folder) dengan benar di antara sistem Windows, dan tidak boleh merusak atau
mengubah btimes, meskipun btimes tidak didukung pada sistem Linux. Sama
program cadangan portabel harus menyinkronkan izin Unix dengan benar di antara Linux
sistem, dan tidak boleh merusak atau mengubah izin Unix, meskipun Unix
izin tidak didukung pada sistem Windows.

Tangani sistem file yang berbeda dengan membuat program Anda bertindak seperti yang lebih maju
berkas sistem. Mendukung superset dari semua fitur yang mungkin: case-sensitivity,
pelestarian kasus, sensitivitas bentuk Unicode, pelestarian bentuk Unicode, Unix
izin, stempel waktu nanodetik resolusi tinggi, atribut yang diperluas, dll.

Setelah Anda memiliki case-preservation dalam program Anda, Anda selalu dapat mengimplementasikan
case-insensitivity jika Anda perlu berinteraksi dengan sistem file case-insensitive.
Tetapi jika Anda mengabaikan pelestarian kasus dalam program Anda, Anda tidak dapat berinteraksi dengan aman
dengan sistem file case-preserving. Hal yang sama berlaku untuk bentuk Unicode
pelestarian dan pelestarian resolusi cap waktu.

Jika sistem file memberi Anda nama file dalam campuran huruf kecil dan
huruf besar, lalu simpan nama file dalam huruf besar yang diberikan. Jika sistem file
memberi Anda nama file dalam bentuk Unicode campuran atau NFC atau NFD (atau NFKC atau
NFKD), lalu simpan nama file dalam urutan byte yang tepat yang diberikan. Jika sistem file
memberi Anda stempel waktu milidetik, lalu simpan stempel waktu di
resolusi milidetik.

Saat Anda bekerja dengan sistem file yang lebih rendah, Anda selalu dapat melakukan downsample dengan tepat,
dengan fungsi perbandingan seperti yang dipersyaratkan oleh perilaku sistem file tempat
program Anda sedang berjalan. Jika Anda tahu bahwa sistem file tidak mendukung Unix
izin, maka Anda seharusnya tidak membaca izin Unix yang sama dengan Anda
menulis. Jika Anda tahu bahwa sistem file tidak menyimpan huruf besar, maka Anda harus
menjadisiap untuk melihat `ABC` dalam daftar direktori ketika program Anda membuat `abc`.
Tetapi jika Anda tahu bahwa sistem file mempertahankan case, maka Anda harus mempertimbangkan
`ABC` menjadi nama file yang berbeda dengan `abc`, saat mendeteksi penggantian nama file atau jika
sistem file peka huruf besar-kecil.

## Pelestarian Kasus

Anda dapat membuat direktori bernama `test/abc` dan terkadang terkejut melihat
bahwa `fs.readdir('test')` mengembalikan `['ABC']`. Ini bukan bug di Node.js. simpul
mengembalikan nama file saat sistem file menyimpannya, dan tidak semua sistem file
mendukung pelestarian kasus. Beberapa sistem file mengonversi semua nama file menjadi huruf besar
(atau huruf kecil).

## Pelestarian Formulir Unicode

* Pelestarian kasus dan pelestarian bentuk Unicode adalah konsep yang serupa. Ke
mengerti mengapa formulir Unicode harus dipertahankan, pastikan Anda terlebih dahulu
memahami mengapa kasus harus dipertahankan. Pelestarian bentuk Unicode sama seperti
sederhana bila dipahami dengan benar.*

Unicode dapat mengkodekan karakter yang sama menggunakan beberapa urutan byte yang berbeda.
Beberapa string mungkin terlihat sama, tetapi memiliki urutan byte yang berbeda. Kapan
bekerja dengan string UTF-8, berhati-hatilah agar harapan Anda sesuai dengan
cara kerja Unicode. Sama seperti Anda tidak mengharapkan semua karakter UTF-8 untuk dikodekan
ke satu byte, Anda seharusnya tidak mengharapkan beberapa string UTF-8 yang terlihat sama
ke mata manusia untuk memiliki representasi byte yang sama. Ini mungkin sebuah
harapan yang dapat Anda miliki dari ASCII, tetapi bukan dari UTF-8.

Anda dapat membuat direktori bernama `test/café` (bentuk NFC Unicode dengan byte
urutan `<63 61 66 c3 a9>` dan `string.length === 5`) dan terkejut melihat
terkadang `fs.readdir('test')` mengembalikan `['café']` (formulir NFD Unicode dengan
urutan byte `<63 61 66 65 cc 81>` dan `string.length === 6`). Ini bukan
bug di Node.js Node.js mengembalikan nama file saat sistem file menyimpannya, dan bukan
semua sistem file mendukung pelestarian bentuk Unicode.

HFS+, misalnya, akan menormalkan semua nama file ke bentuk yang hampir selalu sama
sebagai bentuk NFD. Jangan berharap HFS+ berperilaku sama seperti NTFS atau EXT4 dan
dan sebaliknya. Jangan mencoba mengubah data secara permanen melalui normalisasi sebagai
abstraksi bocor ke kertas di atas perbedaan Unicode antara sistem file. Ini
akan membuat masalah tanpa menyelesaikannya. Sebaliknya, pertahankan bentuk dan penggunaan Unicode
normalisasi sebagai fungsi perbandingan saja.

## Ketidakpekaan Bentuk Unicode

Ketidakpekaan bentuk Unicode dan pelestarian bentuk Unicode adalah dua hal yang berbeda
perilaku sistem file sering keliru satu sama lain. Sama seperti case-insensitivity
terkadang salah diterapkan dengan menormalkan nama file secara permanen
menjadi huruf besar saat menyimpan dan mentransmisikan nama file, jadi bentuk Unicode
ketidakpekaan terkadang salah diterapkan oleh secara permanen
menormalkan nama file ke bentuk Unicode tertentu (NFD dalam kasus HFS+) ketika
menyimpan dan mentransmisikan nama file. Itu mungkin dan jauh lebih baik untuk diterapkan
Ketidakpekaan bentuk Unicode tanpa mengorbankan pelestarian bentuk Unicode, dengan
menggunakan normalisasi Unicode untuk perbandingan saja.

## Membandingkan Berbagai Bentuk Unicode

Node.js menyediakan `string.normalize('NFC' / 'NFD')` yang dapat Anda gunakan untuk menormalkan
String UTF-8 ke NFC atau NFD. Anda tidak boleh menyimpan output dari ini
fungsi tetapi hanya menggunakannya sebagai bagian dari fungsi perbandingan untuk menguji apakah dua
String UTF-8 akan terlihat sama bagi pengguna.

Anda dapat menggunakan `string1.normalize('NFC') === string2.normalize('NFC')` atau
`string1.normalize('NFD') === string2.normalize('NFD')` sebagai perbandingan Anda
fungsi. Bentuk mana yang Anda gunakan tidak masalah.

Normalisasi cepat tetapi Anda mungkin ingin menggunakan cache sebagai input ke
fungsi perbandingan untuk menghindari normalisasi string yang sama berkali-kali. jika
string tidak ada dalam cache lalu normalkan dan cache. Hati-hati
untuk tidak menyimpan atau menyimpan cache, gunakan hanya sebagai cache.

Perhatikan bahwa menggunakan `normalize()` mengharuskan versi Node.js Anda menyertakan ICU
(jika tidak `normalize()` hanya akan mengembalikan string asli). Jika Anda mengunduh
versi terbaru Node.js dari situs web maka itu akan mencakup ICU.

## Resolusi Stempel Waktu

Anda dapat mengatur `mtime` (waktu yang dimodifikasi) dari file ke `1444291759414`
(resolusi milidetik) dan terkadang terkejut melihat `fs.stat` . itu
mengembalikan mtime baru sebagai `1444291759000` (resolusi 1 detik) atau
`1444291758000` (resolusi 2 detik). Ini bukan bug di Node.js. Node.js kembali
stempel waktu saat sistem file menyimpannya, dan tidak semua sistem file mendukung
resolusi stempel waktu nanodetik, milidetik, atau 1 detik. Beberapa sistem file bahkan
memiliki resolusi yang sangat kasar untuk cap waktu atime khususnya, mis. 24 jam
untuk beberapa sistem file FAT.

## Jangan Rusak Nama File dan Stempel Waktu Melalui Normalisasi

Nama file dan stempel waktu adalah data pengguna. Sama seperti Anda tidak akan pernah secara otomatis
menulis ulang data file pengguna menjadi huruf besar data atau menormalkan `CRLF` menjadi `LF`
akhir baris, jadi Anda tidak boleh mengubah, mengganggu, atau merusak nama file atau
cap waktu melalui kasus / bentuk Unicode / normalisasi cap waktu. Normalisasi
seharusnya hanya digunakan untuk perbandingan, tidak pernah untuk mengubah data.

Normalisasi secara efektif merupakan kode hash lossy. Anda dapat menggunakannya untuk menguji
jenis kesetaraan tertentu (misalnya apakah beberapa string terlihat sama meskipun
mereka memiliki urutan byte yang berbeda) tetapi Anda tidak pernah dapat menggunakannya sebagai pengganti
data yang sebenarnya. Program Anda harus meneruskan data nama file dan stempel waktu apa adanya.

Program Anda dapat membuat data baru di NFC (atau dalam kombinasi bentuk Unicode apa pun
lebih disukai) atau dengan nama file huruf kecil atau besar, atau dengan 2 detik
stempel waktu resolusi, tetapi program Anda tidak boleh merusak data pengguna yang ada dengan
memaksakan kasus / bentuk Unicode / normalisasi cap waktu. Sebaliknya, adopsi superset
dekati dan pertahankan kasus, formulir Unicode, dan resolusi stempel waktu di . Anda
program. Dengan begitu, Anda akan dapat berinteraksi dengan aman dengan sistem file yang melakukan
sama.

## Gunakan Fungsi Perbandingan Normalisasi dengan Tepat

Pastikan Anda menggunakan fungsi perbandingan kasus / formulir Unicode / cap waktu
dengan tepat. Jangan gunakan fungsi perbandingan nama file case-insensitive jika Anda
sedang bekerja pada sistem file case-sensitive. Jangan gunakan formulir Unicode
fungsi perbandingan tidak sensitif jika Anda mengerjakan formulir Unicode yang sensitif
sistem file (mis. NTFS dan sebagian besar sistem file Linux yang mempertahankan NFC dan NFD
atau campuran bentuk Unicode). Jangan membandingkan cap waktu pada resolusi 2 detik jika Anda
sedang mengerjakan sistem file resolusi stempel waktu nanodetik.

## Bersiaplah untuk Sedikit Perbedaan dalam Fungsi Perbandingan

Berhati-hatilah agar fungsi perbandingan Anda cocok dengan sistem file (atau
selidiki sistem file jika memungkinkan untuk melihat bagaimana sebenarnya membandingkannya).
Ketidakpekaan huruf besar-kecil misalnya lebih kompleks daripada `toLowerCase()` . sederhana
perbandingan. Faktanya, `toUpperCase()` biasanya lebih baik daripada `toLowerCase()`
(karena menangani karakter bahasa asing tertentu secara berbeda). Tapi lebih baik
masih akan menyelidiki sistem file karena setiap sistem file memiliki kasusnya sendiri
tabel perbandingan dipanggang.

Sebagai contoh, HFS+ Apple menormalkan nama file ke bentuk NFD tetapi bentuk NFD ini
sebenarnya adalah versi lama dari bentuk NFD saat ini dan terkadang mungkin
sedikit berbeda dari bentuk NFD standar Unicode terbaru. Jangan berharap
HFS+ NFD persis sama dengan Unicode NFD sepanjang waktu.
