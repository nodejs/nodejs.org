import { transformerTwoslash } from '@shikijs/twoslash';

const compose = ({ token, cursor, popup }) => [
  {
    type: 'element',
    tagName: 'MDXTooltipTrigger',
    children: [token || cursor],
    properties: { className: ['twoslash-hover'] },
  },
  popup,
];

export const twoslash = (options = {}) =>
  transformerTwoslash({
    langs: ['ts', 'js', 'cjs', 'mjs'],
    rendererRich: {
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
    },
    throws: false,
    ...options,
  });
