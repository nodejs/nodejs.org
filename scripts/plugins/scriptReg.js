const glob = require('glob');
const Handlebars = require('handlebars');
const path = require('path');

// Reg all the *.js under `helpers` by Handlebars for rendering
function scriptReg() {
  return (_, metalsmith, done) => {
    glob(
      `${metalsmith.path('scripts/helpers')}/**/*.js`,
      {},
      (err, matches) => {
        if (err) {
          throw err;
        }
        matches.forEach((file) => {
          const fn = require(file);
          const id = path.basename(file, path.extname(file));
          return Handlebars.registerHelper(id, fn);
        });
        done();
      }
    );
  };
}

module.exports = scriptReg;
