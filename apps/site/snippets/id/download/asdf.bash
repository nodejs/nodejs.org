# asdf memiliki petunjuk instalasi spesifik untuk setiap sistem operasi.
# Silakan merujuk ke dokumentasi resmi di https://asdf-vm.com/guide/getting-started.html.
# Cuplikan ini menggunakan sintaks perintah asdf v0.16+.

# Pasang pengaya Node.js:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Unduh dan pasang Node.js:
asdf install nodejs ${props.release.version}

# Jadikan Node.js sebagai bawaan global:
asdf set --home nodejs ${props.release.version}
