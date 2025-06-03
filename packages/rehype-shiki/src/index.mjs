import cLanguage from 'shiki/langs/c.mjs';
import coffeeScriptLanguage from 'shiki/langs/coffeescript.mjs';
import cPlusPlusLanguage from 'shiki/langs/cpp.mjs';
import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import httpLanguage from 'shiki/langs/http.mjs';
import iniLanguage from 'shiki/langs/ini.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import yamlLanguage from 'shiki/langs/yaml.mjs';

import { createHighlighter } from './highlighter.mjs';

const { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml } =
  createHighlighter({
    langs: [
      ...cLanguage,
      ...coffeeScriptLanguage,
      ...cPlusPlusLanguage,
      ...diffLanguage,
      ...dockerLanguage,
      ...httpLanguage,
      ...iniLanguage,
      {
        ...javaScriptLanguage[0],
        // We patch the JavaScript language to include the CommonJS and ES Module aliases
        // that are commonly used (non-standard aliases) within our API docs and Blog posts
        aliases: javaScriptLanguage[0].aliases.concat('cjs', 'mjs'),
      },
      ...jsonLanguage,
      ...powershellLanguage,
      ...shellScriptLanguage,
      ...shellSessionLanguage,
      ...typeScriptLanguage,
      ...yamlLanguage,
    ],
  });

export { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml };
