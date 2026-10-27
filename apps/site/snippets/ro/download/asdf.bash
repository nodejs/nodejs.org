# asdf are instrucțiuni specifice de instalare pentru fiecare sistem de operare.
# Te rog să consulți documentația oficială la https://asdf-vm.com/guide/getting-started.html.
# Acest fragment utilizează sintaxa de comandă asdf v0.16+.

# Instalează modulul Node.js:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Descarcă și instalează Node.js:
asdf install nodejs ${props.release.version}

# Setează Node.js ca implicit la nivel global:
asdf set --home nodejs ${props.release.version}
