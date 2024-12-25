# Node.js Website Translation Policy

Node.js is a global platform, so this site has many translations. We use [Crowdin](https://crowdin.com) to translate the Node.js Website

The site's translation into languages other than English is handled by [Crowdin translators](https://support.crowdin.com/translation-process-overview/).

We use [`next-intl`](https://next-intl-docs.vercel.app/) as our Internationalization Library. We recommend reading its documentation for API usage.

## How to translate

1. Request to join the Node.js Website project on [Crowdin](https://crowdin.com/project/nodejs-web)
2. [Select the language you want to translate](https://support.crowdin.com/joining-translation-project/#starting-translation)
3. [Start translating](https://support.crowdin.com/online-editor/)

### Any questions or feedbacks on Translations

If you have any questions or feedbacks on current translations, you can [start a discussion](https://crowdin.com/project/nodejs-web/discussions) by choosing the "New Topic" and your language from the right dropdown, or a [conversation](https://support.crowdin.com/conversations/) by adding your translators.

## How to add a new language

Open discussion on the [Crowdin project](https://crowdin.com/project/nodejs-web) to request a new language. After wait for the language to be added to the project by the Crowdin manager

After that, one of the member of the Node.js Website team should add the new language to the project.

### Adding a new language to the project

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

## Adding new Translation Keys

If you're making a new Component and adding Translation Keys for your Component, they should follow these guidelines:

- Only add the new translation keys on the `i18n/locales/en.json` file. Crowdin will handle on syncing the files and letting translators know there are new keys to be translated
- The translation keys should have the prefix as the canonical path of your Component. If your Component is `components/Common/MyComponent` the prefix key should be `components.common.myComponent`
  - The Translation Key suffix should be easy to understand and semantic. For example, if the key is about "the text of a button that when interacted it copies content to the clipboard", the suffix should probably be `copyButton.title`. The final translation key would be `components.common.myComponent.copyButton.title`
  - Translation Keys should be in Camel Case only.
  - The values of each Translation Key should follow the [ICU Message Syntax](https://next-intl-docs.vercel.app/docs/usage/messages#rendering-icu-messages)
- All new Translation keys should be added at the bottom of the `i18n/locales/en.json` file. Since this makes it easier for Translators to notice that there are new Translation keys to be translated.

#### Notes about Translation Keys

It's important to mention that we use nested translation keys within the Locale files. This means that if your translation key is `components.common.myComponent.something`, you should actually define the key and value within:

```json
{
  "components": {
    ...,
    "common": {
      ...,
      "myComponent": {
        "something": "value of translation key"
      }
    }
  }
}
```

### Translations and Unit Testing

Translation Keys should not be translated during Unit Testing. If your Component uses, for example `useTranslations`, you should provide the `<NextIntlProvider>` surrounding your `testing-library` render logic, or you can create a wrapper for your test. Note that you should not import the English messages to your Unit Test as:

- Unit Testing should test a Component functionality.
- Unit Tests should not rely on text, titles, or string bags, as these texts will change arbitrarily and make the test suite fail.
  - In this case, you should test your component by aria-text, or other `aria-*` attributes or even by class names or other artifacts.
- Visual Regression Testing is recommended to test how different languages and text appear within a Component.

## Deploying Translations

Translations are synced between Crowdin and the repository via GitHub Actions.

- On every push to `main`, we upload any new source content.
- Via a cron schedule, and as needed manually by a collaborator, we download completed translations.

Incoming translations are linted to ensure they come from crowdin, and are also formatted to adhere to our project settings.

## Why We Translate This section and Not That Section

> First, what we mean by "section" is a part of the website. It's a collection of pages that are related to each other. They often correspond to the top-navigation of the site. For example, the "Learn" section is a collection of pages that are related to learning/discovering Node.js.

Here we only talk about md/mdx files. The translation of React components is covered by a JSON dictionary and not covered here.

We have these sections on the website:

- Home page
- Learn
- About
- Download
- Blog
- Docs (not this codebase at all)

### Sections that are translated

- **Home page**: The landing page is translated because it's the first page that people see when they visit the website. It's important that everyone can understand what Node.js is and what it can do.
- **About**: This section is translated because it contains information about the Node.js project, its governance. There are no technical terms that are hard to translate.
- **Download**: This section is translated because it contains information about how to download Node.js. And it's really important that everyone can understand how to download Node.js.

### Sections that are not translated

- **Learn**: Per TSC consensus, the learn section is not translated. It contains technical terms that are hard to translate. Maintainers do not have the ability or bandwidth to ensure quality. It's better to have the content in English than to have bad translations. If you want to have more information read [this message](https://github.com/nodejs/nodejs.org/issues/6429#issuecomment-2558265376) that further explains.
- **Blog**: The blog is not translated because it's not useful to translate blog posts. Most of the blog posts are release notes, and it's not useful to translate them.
- **Docs**: The API docs are too expansive, and versioned, to be translated.
