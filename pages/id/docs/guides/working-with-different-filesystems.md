---
title: Bekerja dengan Sistem File Berbeda
layout: docs.hbs
---

# Bekerja dengan Sistem File Berbeda

Node.js memperlihatkan banyak fitur dari sistem file. Tetapi tidak semua sistem file sama. Berikut ini adalah praktik terbaik yang disarankan untuk menjaga kode Anda tetap sederhana dan aman ketika bekerja dengan sistem file yang berbeda.

## Perilaku Sistem File

Sebelum Anda dapat bekerja dengan sistem file, Anda perlu tahu bagaimana perilakunya. Sistem file yang berbeda berperilaku berbeda dan memiliki lebih banyak atau lebih sedikit fitur daripada lainnya: sensitivitas kasus, ketidakpekaan kasus, pelestarian kasus, formulir Unicode pelestarian, resolusi cap waktu, atribut yang diperluas, inode, Unix izin, aliran data alternatif, dll.

Berhati-hatilah dalam menyimpulkan perilaku sistem file dari `process.platform`. Sebagai contoh, jangan berasumsi bahwa karena program Anda berjalan di Darwin maka Anda oleh karena itu bekerja pada sistem file case-insensitive (HFS+), karena pengguna mungkin menggunakan sistem file case-sensitive (HFSX). Demikian pula, jangan berasumsi bahwa karena program Anda berjalan di Linux sehingga Anda bekerja pada sistem file yang mendukung izin dan inode Unix, seperti yang mungkin Anda alami drive eksternal, USB atau drive jaringan yang tidak.

Sistem operasi mungkin tidak memudahkan untuk menyimpulkan perilaku sistem file, tetapi semuanya tidak hilang. Alih-alih menyimpan daftar setiap sistem file dan perilaku yang diketahui (yang selalu tidak lengkap), Anda dapat menyelidiki sistem file untuk melihat bagaimana sebenarnya ia berperilaku. Ada atau tidak adanya fitur tertentu yang mudah diselidiki, seringkali cukup untuk menyimpulkan perilaku fitur lain yang lebih sulit untuk diselidiki.

Ingat bahwa beberapa pengguna mungkin memiliki sistem file berbeda yang dipasang di berbagai jalur di pohon kerja.

## Hindari Pendekatan Common Denominator Terendah

Anda mungkin tergoda untuk membuat program Anda bertindak seperti penyebut umum terendah sistem file, dengan menormalkan semua nama file menjadi huruf besar, menormalkan semua nama file ke bentuk NFC Unicode, dan menormalkan semua cap waktu file untuk mengatakan 1 detik resolusi. Ini akan menjadi pendekatan penyebut umum terendah.

Jangan lakukan ini. Anda hanya akan dapat berinteraksi dengan aman dengan sistem file yang memiliki karakteristik penyebut umum terendah yang sama persis di setiap menghormati. Anda tidak akan dapat bekerja dengan sistem file yang lebih maju yang diharapkan pengguna, dan Anda akan mengalami tabrakan nama file atau stempel waktu. Anda pasti akan kehilangan dan merusak data pengguna melalui serangkaian rumit peristiwa dependen, dan Anda akan membuat bug yang akan sulit jika tidak mustahil untuk dipecahkan.

Apa yang terjadi ketika Anda nanti perlu mendukung sistem file yang hanya memiliki 2 detik? atau resolusi stempel waktu 24 jam? Apa yang terjadi ketika standar Unicode maju untuk memasukkan algoritma normalisasi yang sedikit berbeda (seperti yang terjadi di masa lalu)?

Pendekatan common denominator terendah akan cenderung mencoba membuat portabel program dengan hanya menggunakan panggilan sistem "portabel". Hal ini menyebabkan program-program yang bocor dan sebenarnya tidak portabel.

## Mengadopsi Pendekatan Superset

Manfaatkan sebaik-baiknya setiap platform yang Anda dukung dengan mengadopsi pendekatan superset. Misalnya, program pencadangan portabel harus menyinkronkan btimes (waktu yang dibuat untuk a file atau folder) dengan benar di antara sistem Windows, dan tidak boleh merusak atau mengubah btimes, meskipun btimes tidak didukung pada sistem Linux. Sama program cadangan portabel harus menyinkronkan izin Unix dengan benar di antara Linux sistem, dan tidak boleh merusak atau mengubah izin Unix, meskipun Unix izin tidak didukung pada sistem Windows.

Tangani sistem file yang berbeda dengan membuat program Anda bertindak seperti yang lebih maju berkas sistem. Mendukung superset dari semua fitur yang mungkin: case-sensitivity, pelestarian kasus, sensitivitas bentuk Unicode, pelestarian bentuk Unicode, Unix izin, stempel waktu nanodetik resolusi tinggi, atribut yang diperluas, dll.

Setelah Anda memiliki case-preservation dalam program Anda, Anda selalu dapat mengimplementasikan case-insensitivity jika Anda perlu berinteraksi dengan sistem file case-insensitive. Tetapi jika Anda mengabaikan pelestarian kasus dalam program Anda, Anda tidak dapat berinteraksi dengan aman dengan sistem file case-preserving. Hal yang sama berlaku untuk bentuk Unicode pelestarian dan pelestarian resolusi cap waktu.

Jika sistem file memberi Anda nama file dalam campuran huruf kecil dan huruf besar, lalu simpan nama file dalam huruf besar yang diberikan. Jika sistem file memberi Anda nama file dalam bentuk Unicode campuran atau NFC atau NFD (atau NFKC atau NFKD), lalu simpan nama file dalam urutan byte yang tepat yang diberikan. Jika sistem file memberi Anda stempel waktu milidetik, lalu simpan stempel waktu di resolusi milidetik.

Saat Anda bekerja dengan sistem file yang lebih rendah, Anda selalu dapat melakukan downsample dengan tepat, dengan fungsi perbandingan seperti yang dipersyaratkan oleh perilaku sistem file tempat program Anda sedang berjalan. Jika Anda tahu bahwa sistem file tidak mendukung Unix izin, maka Anda seharusnya tidak membaca izin Unix yang sama dengan Anda menulis. Jika Anda tahu bahwa sistem file tidak menyimpan huruf besar, maka Anda harus menjadisiap untuk melihat `ABC` dalam daftar direktori ketika program Anda membuat `abc`. Tetapi jika Anda tahu bahwa sistem file mempertahankan case, maka Anda harus mempertimbangkan `ABC` menjadi nama file yang berbeda dengan `abc`, saat mendeteksi penggantian nama file atau jika sistem file peka huruf besar-kecil.

## Pelestarian Kasus

Anda dapat membuat direktori bernama `test/abc` dan terkadang terkejut melihat bahwa `fs.readdir('test')` mengembalikan `['ABC']`. Ini bukan bug di Node.js. simpul mengembalikan nama file saat sistem file menyimpannya, dan tidak semua sistem file mendukung pelestarian kasus. Beberapa sistem file mengonversi semua nama file menjadi huruf besar (atau huruf kecil).

## Pelestarian Formulir Unicode

*Pelestarian kasus dan pelestarian bentuk Unicode adalah konsep yang serupa. Ke mengerti mengapa bentuk Unicode harus dipertahankan, pastikan Anda terlebih dahulu memahami mengapa kasus harus dipertahankan. Pelestarian bentuk Unicode juga sama sederhana bila dipahami dengan benar.*

Unicode dapat menyandikan karakter yang sama menggunakan beberapa urutan byte yang berbeda. Beberapa string mungkin terlihat sama, tetapi memiliki urutan byte yang berbeda. Kapan bekerja dengan string UTF-8, berhati-hatilah agar harapan Anda sejalan bagaimana Unicode bekerja. Sama seperti Anda tidak mengharapkan semua karakter UTF-8 untuk dikodekan ke satu byte, Anda seharusnya tidak mengharapkan beberapa string UTF-8 yang terlihat sama ke mata manusia untuk memiliki representasi byte yang sama. Ini mungkin sebuah harapan yang dapat Anda miliki dari ASCII, tetapi bukan dari UTF-8.

Anda dapat membuat direktori bernama `test/café` (NFC Unicode form dengan byte urutan `<63 61 66 c3 a9>` dan `string.length === 5`) dan terkejut melihat terkadang `fs.readdir('test')` mengembalikan `['café']` (bentuk Unicode NFD dengan urutan byte `<63 61 66 65 cc 81>` dan `string.length === 6`). Ini bukan kesalahan di Node. Node.js mengembalikan nama file saat sistem file menyimpannya, dan tidak semua sistem file mendukung pelestarian bentuk Unicode.

HFS+, misalnya, akan menormalkan semua nama file ke bentuk yang hampir selalu sama sebagai bentuk NFD. Jangan berharap HFS+ berperilaku sama seperti NTFS atau EXT4 dan dan sebaliknya. Jangan mencoba mengubah data secara permanen melalui normalisasi sebagai a abstraksi bocor ke kertas di atas perbedaan Unicode antara sistem file. Ini akan menciptakan masalah tanpa memecahkan apapun. Alih-alih, pertahankan bentuk dan penggunaan Unicode normalisasi sebagai fungsi pembanding saja.

## Ketidakpekaan Bentuk Unicode

Ketidakpekaan bentuk Unicode dan pelestarian bentuk Unicode adalah dua perbedaan perilaku sistem file sering disalahartikan satu sama lain. Sama seperti ketidakpekaan huruf besar-kecil terkadang diimplementasikan secara tidak benar dengan menormalkan nama file secara permanen menjadi huruf besar saat menyimpan dan mengirimkan nama file, jadi bentuk Unicode ketidakpekaan kadang-kadang telah diterapkan secara tidak benar secara permanen menormalkan nama file ke bentuk Unicode tertentu (NFD dalam kasus HFS+) kapan menyimpan dan mengirimkan nama file. Itu mungkin dan jauh lebih baik untuk diterapkan Ketidakpekaan bentuk Unicode tanpa mengorbankan pelestarian bentuk Unicode, oleh menggunakan normalisasi Unicode untuk perbandingan saja.

## Membandingkan Berbagai Bentuk Unicode

Node.js menyediakan `string.normalize('NFC' / 'NFD')` yang dapat Anda gunakan untuk menormalkan string UTF-8 ke NFC atau NFD. Anda tidak boleh menyimpan output dari ini fungsi tetapi hanya menggunakannya sebagai bagian dari fungsi perbandingan untuk menguji apakah dua String UTF-8 akan terlihat sama bagi pengguna.

Anda dapat menggunakan `string1.normalize('NFC') === string2.normalize('NFC')` atau `string1.normalize('NFD') === string2.normalize('NFD')` sebagai perbandingan Anda fungsi. Bentuk mana yang Anda gunakan tidak masalah.

Normalisasi cepat tetapi Anda mungkin ingin menggunakan cache sebagai masukan untuk Anda fungsi perbandingan untuk menghindari normalisasi string yang sama berkali-kali. Jika string tidak ada di cache lalu normalkan dan cache. Hati-hati bukan untuk menyimpan atau mempertahankan cache, gunakan hanya sebagai cache.

Perhatikan bahwa menggunakan `normalize()` mengharuskan versi Node.js Anda menyertakan ICU (jika tidak, `normalize()` hanya akan mengembalikan string asli). Jika Anda mengunduh versi terbaru Node.js dari situs web maka itu akan mencakup ICU.

## Resolusi Stempel Waktu

Anda dapat menyetel `mtime` (waktu yang diubah) dari file ke `1444291759414` (resolusi milidetik) dan terkadang terkejut melihat `fs.stat` itu mengembalikan mtime baru sebagai `1444291759000` (resolusi 1 detik) atau `1444291758000` (resolusi 2 detik). Ini bukan bug di Node. Node.js kembali cap waktu saat sistem file menyimpannya, dan tidak semua sistem file mendukung resolusi cap waktu nanodetik, milidetik, atau 1 detik. Bahkan beberapa sistem file memiliki resolusi yang sangat kasar untuk stempel waktu atime khususnya, mis. 24 jam untuk beberapa sistem file FAT.

## Jangan Rusak Nama File dan Stempel Waktu Melalui Normalisasi

Nama file dan cap waktu adalah data pengguna. Sama seperti Anda tidak akan pernah secara otomatis menulis ulang data file pengguna menjadi huruf besar pada data atau menormalkan `CRLF` menjadi `LF` akhir baris, jadi Anda tidak boleh mengubah, mengganggu, atau merusak nama file atau stempel waktu melalui case/bentuk Unicode/normalisasi stempel waktu. Normalisasi seharusnya hanya digunakan untuk perbandingan, tidak pernah untuk mengubah data.

Normalisasi secara efektif adalah kode hash yang hilang. Anda dapat menggunakannya untuk menguji jenis kesetaraan tertentu (mis. Apakah beberapa string terlihat sama meskipun memiliki urutan byte yang berbeda) tetapi Anda tidak akan pernah dapat menggunakannya sebagai pengganti data aktual. Program Anda harus meneruskan data nama file dan stempel waktu apa adanya.

Program Anda dapat membuat data baru di NFC (atau dalam kombinasi bentuk Unicode apa pun yang disukainya) atau dengan nama file huruf kecil atau besar, atau dengan stempel waktu resolusi 2 detik, tetapi program Anda tidak boleh merusak data pengguna yang ada dengan memaksakan huruf / Unicode bentuk / normalisasi cap waktu. Alih-alih, gunakan pendekatan superset dan pertahankan kasus, bentuk Unicode, dan resolusi stempel waktu dalam program Anda. Dengan begitu, Anda akan dapat berinteraksi dengan aman dengan sistem file yang melakukan hal yang sama.

## Gunakan Fungsi Perbandingan Normalisasi dengan Tepat

Make sure that you use case / Unicode form / timestamp comparison functions appropriately. Do not use a case-insensitive filename comparison function if you are working on a case-sensitive filesystem. Do not use a Unicode form insensitive comparison function if you are working on a Unicode form sensitive filesystem (e.g. NTFS and most Linux filesystems which preserve both NFC and NFD or mixed Unicode forms). Do not compare timestamps at 2-second resolution if you are working on a nanosecond timestamp resolution filesystem.

## Bersiaplah untuk Sedikit Perbedaan dalam Fungsi Perbandingan

Berhati-hatilah agar fungsi perbandingan Anda cocok dengan sistem file (atau selidiki sistem file jika memungkinkan untuk melihat bagaimana sebenarnya perbandingannya). Case-insensitivity misalnya lebih kompleks daripada `toLowerCase()` sederhana perbandingan. Faktanya, `toUpperCase()` biasanya lebih baik daripada `toLowerCase()` (karena menangani karakter bahasa asing tertentu secara berbeda). Tapi lebih baik masih akan menyelidiki sistem file karena setiap sistem file memiliki kasingnya sendiri tabel perbandingan dipanggang.

Sebagai contoh, HFS+ dari Apple melakukan normalisasi pada nama file menjadi bentuk NFD, tetapi bentuk NFD tersebut sebenarnya adalah versi lama dari bentuk NFD yang saat ini digunakan, dan kadang-kadang mungkin sedikit berbeda dengan bentuk NFD terbaru yang ditetapkan oleh Unicode. Oleh karena itu, jangan berharap bahwa HFS+ NFD selalu sama persis dengan Unicode NFD.
