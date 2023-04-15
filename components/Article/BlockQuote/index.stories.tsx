import BlockQuote from './index';

export default { component: BlockQuote };

export const Default = {
  args: {
    children: 'This is a block quote',
  },
};

export const MultipleParagraph = {
  args: {
    children: [
      <p key={1}>This is a block quote 1</p>,
      <p key={2}>This is a block quote 2</p>,
    ],
  },
};
