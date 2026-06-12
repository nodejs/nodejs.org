# تحميل و تثبيت Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"

# تحميل و تثبيت Node.js:
choco install nodejs --version="${props.release.version}"
