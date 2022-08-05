// This plugin reads the files present in the english locale that are missing
// in the current locale being built (requires preserveLocale flag)

function withPreserveLocale(preserveLocale) {
  return (files, m, next) => {
    if (preserveLocale) {
      const path = m.path('locale/en');
      m.read(path, (err, newfiles) => {
        if (err) {
          console.error(err);
          return next(err);
        }

        Object.keys(newfiles).forEach((key) => {
          if (!files[key]) {
            files[key] = newfiles[key];
          }
        });
        next();
      });
    } else {
      next();
    }
  };
}

module.exports = withPreserveLocale;
