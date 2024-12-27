# NOTE:
# Docker is not a Node.js package manager.
# Please ensure it is already installed on your system.
# Follow official instructions at https://docs.docker.com/desktop/
# Docker images are provided officially at https://github.com/nodejs/docker-node/

# pulls the Node.js Docker image
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# verifies the right Node.js version is in the environment
docker run node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'} node -v # should print "${props.release.versionWithPrefix}"

# verifies the right npm version is in the environment
docker run node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'} npm -v # should print "${props.release.npm}"
