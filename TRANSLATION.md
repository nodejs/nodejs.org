# Node.js Website Translation Policy

Node.js is a global platform and so this site has many translations. The translation of the site into
languages other than English is handled by the localization working group of the language in question. If you
would like to contribute to the translation of nodejs.org, please refer to the following process:

> Since Apr, 1 2020 translation process moved to [Crowdin](https://crowdin.com/project/nodejs-website)

## Get started

1. Open [nodejs-website](https://crowdin.com/project/nodejs-website) Crowdin project
2. Find your locale and start translation. Find more details in [guide for volunteer translators](https://support.crowdin.com/for-volunteer-translators/)

All translated and approved content will be pushed to this repo automatically. You don't need to create any PRs with translation. Just keep localization process on Crowdin.

Original source can be found in [/locale/en](https://github.com/nodejs/nodejs.org/tree/main/locale/en). If you find any problem with original source, please create a PR with changes directly to `/locale/en`. Crowdin automatically pull all updates within 24 hours.

### Can't find my locale on Crowdin

Please create a [new issue](https://github.com/nodejs/nodejs.org/issues/new?template=03-i18n.md) in this repo. Crowdin managers team would be happy to add new languages. 

## Localization groups

An existing localization group is not required to start translation. You can contribute on Crowdin without it. Think about groups like a basement to communicate with other translators of your locale.

Contact your appropriate localization group, and discuss with them the best possible way to contribute. A list of the localization groups can be found below.

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

### Group for my locale does not exist

If you can't find group for your locale:

1. Translate 1000 strings or more on Crowdin for your locale
2. Find at least one more translator for your locale
3. Create a [new issue](https://github.com/nodejs/nodejs.org/issues/new?template=03-i18n.md) in this repo requesting the creation of a group for your locale

### Group for my locale is archived

If you find the group for your locale is archived:

1. Try to contact members of the group by creating a [new issue](https://github.com/nodejs/nodejs.org/issues/new?template=03-i18n.md) in this repo. Include a mention of the group so members get notified of the issue.
2. If there is no response from members in 7 days and if you have already done 1000 strings or more on Crowdin for your locale, open an issue in https://github.com/nodejs/admin requesting the repository be unarchived.
