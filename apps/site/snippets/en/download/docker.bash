# pulls the Node.js Docker image
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# verifies the right Node.js version is in the environment
docker run node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'} node -v # should print "${props.release.versionWithPrefix}"

# verifies the right npm version is in the environment
docker run node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'} npm -v # should print "${props.release.npm}"
