# [new.nodejs.org](https://new.nodejs.org/)

##### [MIT Licensed](LICENSE)

## Contributing

Please Contribute! There's [plenty to do](https://github.com/nodejs/new.nodejs.org/issues/20).

```
git clone git@github.com:nodejs/new.nodejs.org.git
cd new.nodejs.org
npm install
node build.js serve
```

This will start the development server on http://localhost:8080/en and should reload automatically when you make changes but it's all just code and no code is perfect so sometimes you may need to restart it :)

Note: You'll need io.js 2.x or newer as the build system uses some native ES2015 features.

### Layout

* Page templates are in `/layouts`
* Global style are in `/layouts/css`
* Global static files are in `/static`
* All content and localization specific styles are in `/locale`
 * Initial development usually happens in english: `/locale/en`
 * `/locale/{{locale}}/site.json` is where global localization information lives.
 * All content is in markdown and is per locale.
  * The top of each markdown file is a block of YAML for page specific localization information that is passed to various templates.
  * The bulk of the markdown content for each page is references at {{content}} in the corresponding template.
