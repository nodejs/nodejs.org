import Codebox from './index';

export default { component: Codebox };

const code = 'const a = 1;';

export const Default = {
  args: {
    children: <code className="language-js">{code}</code>,
  },
};

const bash = '$ export MY_VAR=123';

export const Shell = {
  args: {
    children: <code className="language-bash">{bash}</code>,
  },
};
