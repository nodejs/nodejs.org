import {
  createTransformerFactory,
  rendererRich,
  transformerTwoslash,
} from '@shikijs/twoslash';

const compose = ({ token, cursor, popup }) => [
  {
    type: 'element',
    tagName: 'MDXTooltipTrigger',
    children: [token || cursor],
    properties: { className: ['twoslash-hover'] },
  },
  popup,
];

const rendererOptions = {
  jsdoc: false,
  hast: {
    hoverToken: { tagName: 'MDXTooltip' },
    hoverPopup: { tagName: 'MDXTooltipContent' },
    hoverCompose: compose,

    queryToken: { tagName: 'MDXTooltip' },
    queryPopup: { tagName: 'MDXTooltipContent' },
    queryCompose: compose,

    errorToken: { tagName: 'MDXTooltip' },
    errorPopup: { tagName: 'MDXTooltipContent' },
    errorCompose: compose,

    completionToken: {
      tagName: 'MDXTooltip',
      properties: {
        open: true,
      },
    },
    completionPopup: {
      tagName: 'MDXTooltipContent',
      properties: {
        align: 'start',
      },
    },
    completionCompose: compose,
  },
};

const transformerOptions = {
  langs: ['ts', 'js', 'cjs', 'mjs'],
  rendererRich: rendererOptions,
  throws: false,
};

/**
 * Creates the Twoslash Shiki transformer.
 *
 * When `options.twoslasher` is provided, uses `createTransformerFactory`
 * directly to avoid importing the default Node.js-dependent twoslasher from
 * `twoslash`. This is needed for environments like Cloudflare Workers where
 * the filesystem-backed default twoslasher cannot be used.
 *
 * @param {import('@shikijs/twoslash').TransformerTwoslashIndexOptions} [options]
 */
export const twoslash = (options = {}) => {
  if (options.twoslasher) {
    return createTransformerFactory(
      options.twoslasher,
      rendererRich(rendererOptions)
    )({ ...transformerOptions, ...options });
  }

  return transformerTwoslash({ ...transformerOptions, ...options });
};
