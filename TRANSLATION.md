# Node.js Website Translation Policy

Node.js is a global platform and so this site has many translations. The translation of the site into
languages other than English is handled by the localization working group of the language in question. If you
would like to contribute to the translation of nodejs.org, please refer to the following process:

## For Individuals wanting to contribute

* Contact your appropriate localization group, and discuss with them the best possible way to contribute. A list of the localization groups can be found here (please keep in mind that some groups have not yet taken action upon the project name changes, hence the outdated repository names):

  * [`nodejs-ar`](https://github.com/nodejs/nodejs-ar) Arabic Community
  * [`nodejs-bg`](https://github.com/nodejs/nodejs-bg) Bulgarian Community
  * [`nodejs-bn`](https://github.com/nodejs/nodejs-bn) Bengali Community
  * [`nodejs-zh-CN`](https://github.com/nodejs/nodejs-zh-CN) Chinese Community
  * [`nodejs-cs`](https://github.com/nodejs/nodejs-cs) Czech Community
  * [`nodejs-da`](https://github.com/nodejs/nodejs-da) Danish Community
  * [`nodejs-de`](https://github.com/nodejs/nodejs-de) German Community
  * [`nodejs-el`](https://github.com/nodejs/nodejs-el) Greek Community
  * [`nodejs-es`](https://github.com/nodejs/nodejs-es) Spanish Community
  * [`nodejs-fa`](https://github.com/nodejs/nodejs-fa) Persian Community
  * [`nodejs-fi`](https://github.com/nodejs/nodejs-fi) Finnish Community
  * [`nodejs-fr`](https://github.com/nodejs/nodejs-fr) French Community
  * [`nodejs-he`](https://github.com/nodejs/nodejs-he) Hebrew Community
  * [`nodejs-hi`](https://github.com/nodejs/nodejs-hi) Hindi Community
  * [`nodejs-hu`](https://github.com/nodejs/nodejs-hu) Hungarian Community
  * [`nodejs-id`](https://github.com/nodejs/nodejs-id) Indonesian Community
  * [`nodejs-it`](https://github.com/nodejs/nodejs-it) Italian Community
  * [`nodejs-ja`](https://github.com/nodejs/nodejs-ja) Japanese Community
  * [`nodejs-ka`](https://github.com/nodejs/nodejs-ka) Georgian Community
  * [`nodejs-ko`](https://github.com/nodejs/nodejs-ko) Korean Community
  * [`nodejs-mk`](https://github.com/nodejs/nodejs-mk) Macedonian Community
  * [`nodejs-ms`](https://github.com/nodejs/nodejs-ms) Malaysian Community
  * [`nodejs-nl`](https://github.com/nodejs/nodejs-nl) Dutch Community
  * [`nodejs-no`](https://github.com/nodejs/nodejs-no) Norwegian Community
  * [`nodejs-pl`](https://github.com/nodejs/nodejs-pl) Polish Community
  * [`nodejs-pt`](https://github.com/nodejs/nodejs-pt) Portuguese Community
  * [`nodejs-ro`](https://github.com/nodejs/nodejs-ro) Romanian Community
  * [`nodejs-ru`](https://github.com/nodejs/nodejs-ru) Russian Community
  * [`nodejs-sv`](https://github.com/nodejs/nodejs-sv) Swedish Community
  * [`nodejs-ta`](https://github.com/nodejs/nodejs-ta) Tamil Community
  * [`nodejs-tr`](https://github.com/nodejs/nodejs-tr) Turkish Community
  * [`nodejs-zh-TW`](https://github.com/nodejs/nodejs-zh-TW) Taiwanese Community
  * [`nodejs-uk`](https://github.com/nodejs/nodejs-uk) Ukrainian Community
  * [`nodejs-vi`](https://github.com/nodejs/nodejs-vi) Vietnamese Community

## For Localization Groups

* Ensure that any site translations are done as pull requests into the appropriate language folder in this repo. This will ensure the build process, layout, and styling, remain consistent across the different translations of the site.

* You can find the appropriate language folder within `locale/`. If not, create one matching the two-letter [ISO code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) of your language. To specify a dialect for your language, [separate it with a dash](https://en.wikipedia.org/wiki/IETF_language_tag) (e.g. `pt-br` for Brazilian Portuguese, `zh-tw` for Taiwanese Mandarin).

* The following files need to be in your language folder:

  * `site.json` (this contains the basic settings and navigation structure for the website)
  * `index.md` (this contains the Markdown translation for the home page.)
  * `styles.scss` (this imports the necessary Sass files)
  * All files and files in subfolders that end in `.md` are content pages and should be translated.

* Prefix your PR with the localization group's name (e.g. `nodejs-no`). If you are only translating one of the above files, please mention them in your PR's subject as well, e.g.:

```
    nodejs-de: Add files - index.md, faq.md
    nodejs-ro: Add files - 15 files

    nodejs-fr: Update files - es6.md
    nodejs-ja: Update files - all files
```

* Do not make language specific changes to layout or styling in a translation PR. If they are needed, make a separate styling/layout pr and talk with one of the website WG about the change. We want to make sure, for example, a Chinese layout change doesn't cascade failure to the German page.

* To be merged, translation PR's require a Website WG +1 and a +1 from another native speaker in your language. Make sure whoever you have review the PR adds a +1 in the comments of it so we know it is translated properly.
