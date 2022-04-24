FROM build-image:latest

WORKDIR /nodejs.org/
RUN npm run test:lint:js
RUN npm run test:lint:md
RUN npm run test:lint:stylelint
RUN npm run test:lint:lockfile
RUN npm run test:html
RUN npm run test:unit