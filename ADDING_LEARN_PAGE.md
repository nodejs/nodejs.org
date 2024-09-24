# Adding a Learn Page

Since the redesign of the website, we have a new section called ‘Learn’. This is intended to provide a more explanatory set of resources than the API docs, which are designed purely to explain the available APIs.

The learn section is separate from the API docs, and is intended to provide a more narrative, tutorial-style set of resources. This is a place where we can provide more context and guidance on how to use the APIs, and how to build applications with them.

The ‘Learn’ section is also divided into several sub-categories. Keep in mind that the sub-categories must have the same theme.

## Structure of the Learn section

The file structure of the Learn section is as follows:

```
site/
├─ pages/
│  ├─ en/
│  │  ├─ learn/
│  │  │  ├─ sub-categories/
│  │  │  │  ├─ article.md
```

The frontmatter of the `article.md` file should look like this:

```yaml
title: A super cool title
layout: learn
authors: github_username, another_github_username
```

Litle bit of explanation about the frontmatter:
- `title`: The title of the article. This will be displayed as the title of the page. We recommend to use the same title as the navigation entry. How to enter entries for navigation is explained later in this document.
- `layout`: This must be set to `learn`. To keep the same style as the other Learn pages.
- `authors`: A list of the GitHub usernames of the authors of the article. This is used to display the profile pictures of the authors on the page.

### Modify the navigation

The data of the navigation is store in `app/site/navigation.json`. To add a new entry to the navigation, you need to add a new object to the `sideNavigation.learn`.

```json
{
  "sideNavigation": {
    "learn": [
      {
        "label": "Sub-category",
        "items": {
          "article": {
            "link": "/learn/sub-category/article",
            "label": "components.navigation.learn.sub-category.article"
          }
        }
      }
    ]
  }
}
```

The label key is used to display the title of the article in the navigation. To add a new i18n key we recommend you to read [the translation guide](./TRANSLATION.md#adding-new-translation-keys).

### Add the article

To add a new article, you need to create a new markdown file in the `site/pages/en/learn/your-sub-category` directory.

1. Create your new markdown file in the `site/pages/en/learn/your-sub-category` directory.
2. Add the frontmatter to the file.
3. Write your article.
4. Add the navigation entry to `app/site/navigation.json`.
5. Add the translation key to the translation files.

DONE!

### Edit the article

To edit an existing article, you need to find the markdown file in the `site/pages/en/learn/your-sub-category` directory.

> [!NOTE]
> If you rewrite a big part of the article you can add yourself as an author in the frontmatter. **But** if you only fix a typo or a small part of the article, you don't need to add yourself as an author.

## Accesible MDX components

### Codebox

The codebox component is used to display code snippets. If two code snippets is following without any text between them, they will be displayed in the same codebox, but with two tabs.

```md
'''cjs
const http = require('node:http');
'''

'''mjs
import http from 'node:http';
'''
```

`cjs` and `mjs` are variant of `js`, it's just to display the correct language in the codebox (cjs = CommonJS, mjs = ES Module).
