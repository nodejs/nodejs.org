import Codebox from './index';

export default { component: Codebox };

const code = 'const a = 1;';

export const Default = {
  args: {
    children: <code className="language-js">{code}</code>,
  },
};
