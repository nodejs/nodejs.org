# Docker has specific installation instructions for each operating system.
# Please refer to the official documentation at https://docker.com/get-started/

# Pull the Node.js Docker image:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Create a Node.js container and start a Shell session:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# Verify the Node.js version:
node -v # Should print "${props.release.versionWithPrefix}".
