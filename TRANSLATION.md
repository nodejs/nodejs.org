# Node.js Website Translation Policy

Node.js is a global platform and so this site has many translations. The translation of the site into languages other than English is handled by [Crowdin translators](https://support.crowdin.com/translation-process-overview/).

## How to translate

1. Request to join the [Nodejs-Website in Crowdin](https://crowdin.com/project/nodejs-website)
2. [Select the language you want to translate](https://support.crowdin.com/joining-translation-project/#starting-translation)
3. [Start translating](https://support.crowdin.com/online-editor/)

## Any questions or feedbacks on Translations

If you have any questions or feedbacks on current translations, you can [start a discussion](https://crowdin.com/project/nodejs-website/discussions) by choosing the "New Topic" and your language from the right dropdown, or a [conversation](https://support.crowdin.com/enterprise/messages/#creating-a-new-conversation) by adding your translators.

## How to add a new language

Go on `/i18n/config.json` and add the new language to the `locales` array.

Fill the language object with the following fields:

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

| Field Name   | Description                                                                                            | Examples     |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------ |
| `code`       | The language code. It must be the same as the folder name                                              | `fr`         |
| `localName`  | The language name in its own language (it's use in language selector)                                  | `Français`   |
| `name`       | The language name in English                                                                           | `French`     |
| `langDir`    | The direction of the language. `ltr` for left to right, `rtl` for right to left                        | `ltr`        |
| `dateFormat` | The date format. It must be a valid [moment.js format](https://momentjs.com/docs/#/displaying/format/) | `DD.MM.YYYY` |
| `hrefLang`   | The language code in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format         | `fr`         |
| `enabled`    | If the language is enabled or not                                                                      | `true`       |
