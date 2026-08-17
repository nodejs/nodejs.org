# تحميل وتثبيت n و Node.js:
curl -fsSL https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash -s ${props.release.major}

# يتم تثبيت Node.js تلقائيًا أثناء عملية n-install، لكن يمكنك أيضًا تثبيته يدويًا:
#   n install ${props.release.major}
