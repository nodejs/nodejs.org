# DO NOT REMOVE THIS DIRECTORY

Those assets are still being used by legacy versions of the Node.js docs.

Everything up to v0.10.28 is a copy of the entire website, e.g.:

* https://nodejs.org/docs/v0.10.26/
* https://nodejs.org/docs/v0.10.28/ (different design)

Those are the first versions with just the API docs and the changelog only:

* https://nodejs.org/docs/v0.10.27/
* https://nodejs.org/docs/v0.10.29/

The actual URL rewriting is done in the nodejs.org nginx config:

https://raw.githubusercontent.com/nodejs/build/master/ansible/www-standalone/resources/config/nodejs.org
