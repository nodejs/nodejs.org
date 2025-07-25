import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';
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
    // We use the faster WASM engine on the server instead of the web-optimized version.
    //
    // Currently we fall back to the JavaScript RegEx engine
    // on Cloudflare workers because `shiki/wasm` requires loading via
    // `WebAssembly.instantiate` with custom imports, which Cloudflare doesn't support
    // for security reasons.
    //
    // TODO(@avivkeller): When available, use `OPEN_NEXT_CLOUDFLARE` environment
    // variable for detection instead of current method, which will enable better
    // tree-shaking.
    // Reference: https://github.com/nodejs/nodejs.org/pull/7896#issuecomment-3009480615
    engine:
      'Cloudflare' in globalThis
        ? createJavaScriptRegexEngine()
        : await createOnigurumaEngine(import('shiki/wasm')),
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
