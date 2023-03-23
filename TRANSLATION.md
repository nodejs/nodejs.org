# Node.js Website Translation Policy

We use crowdin to manage translations. You can join the Node.js project on [Crowdin](https://crowdin.com/project/nodejs-website).

## How to translate

1. Join the [Crowdin](https://crowdin.com/project/nodejs-website)
2. Select the language you want to translate
3. Start translating

## How to add a new language

Go on `/i18n/config.json` and add the new language to the `locales` array.

Example of a language:

```json
{
  "code": "fr",
  "localName": "Français",
  "name": "French",
  "langDir": "ltr",
  "dateFormat": "DD.MM.YYYY",
  "hrefLang": "fr",
  "enabled": true
}
```

- code: The language code. It must be the same as the folder name.
- localName: The language name in its own language (it's use in language selector).
- name: The language name in English.
- langDir: The direction of the language. `ltr` for left to right, `rtl` for right to left.
- dateFormat: The date format. It must be a valid [moment.js format](https://momentjs.com/docs/#/displaying/format/).
- hrefLang: The language code in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
- enabled: If the language is enabled or not.

## How to become Proofreader

- Have translated at least 1000 strings
- Have 200 strings approved

To become a proofreader, you need to contact the [Node.js Crowdin Manager](https://crowdin.com/profile/ovflowd) and ask to be promoted. The manager will check your request and promote you if you are eligible.

## For old translators

Our I18n sub team was disbanded.
Thanks to all the translators who helped us in the past.
