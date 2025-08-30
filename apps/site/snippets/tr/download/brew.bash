# Homebrew'ü İndirip Kurun
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash

# Node.js'i İndirip Kurun:
brew install node@${props.release.major}

# Node.js sürümünü doğrulayın:
node -v # "${props.release.versionWithPrefix}" yazdırmalıdır.
