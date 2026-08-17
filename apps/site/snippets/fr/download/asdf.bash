# asdf dispose d’instructions d’installation spécifiques pour chaque système d’exploitation.
# Veuillez consulter la documentation officielle à l’adresse https://asdf-vm.com/guide/getting-started.html.
# Cet extrait utilise la syntaxe de commande asdf v0.16+.

# Installez le plugin Node.js :
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Télécharger et installer Node.js :
asdf install nodejs ${props.release.version}

# Définissez Node.js comme valeur par défaut globale :
asdf set --home nodejs ${props.release.version}
