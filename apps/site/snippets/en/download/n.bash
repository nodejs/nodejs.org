# Download and install n and Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# Node.js already installs during n-install, but you can also install it manually:
#   n install ${props.release.major}
