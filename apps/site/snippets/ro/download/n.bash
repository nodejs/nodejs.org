# Descarcă și instalează n și Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Node.js deja se instalează în timpul n-instalării, dar poți să instalezi si manual.
#   instalare n ${props.release.major}

# Verifică versiunea Node.js:
node -v # Ar trebui să afișeze „${props.release.versionWithPrefix}”.
