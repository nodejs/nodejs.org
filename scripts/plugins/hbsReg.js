const glob = require('glob');
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

// Reg all the *.hbs by Handlebars for rendering
function hbsReg() {
  return (_, metalsmith, done) => {
    glob(
      `${metalsmith.path('layouts/partials')}/**/*.hbs`,
      {},
      async (err, matches) => {
        if (err) {
          throw err;
        }

        const valuePromises = matches.map((file) => {
          return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, value) => {
              if (err) return reject(err);
              const id = path.basename(file, path.extname(file));
              Handlebars.registerPartial(id, value);
              return resolve(true);
            });
          });
        });

        await Promise.all(valuePromises);
        done();
      }
    );
  };
}

module.exports = hbsReg;
