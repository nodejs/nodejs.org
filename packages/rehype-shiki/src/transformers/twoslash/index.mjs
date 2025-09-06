import { transformerTwoslash } from '@shikijs/twoslash';

const compose = ({ token, popup }) => [
  {
    type: 'element',
    tagName: 'MDXTooltipTrigger',
    children: [token],
    properties: { className: ['twoslash-hover'] },
  },
  popup,
];

export const twoslash = options =>
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
      },
    },
    throws: false,
    ...(typeof options === 'object' ? twoslash : {}),
  });
