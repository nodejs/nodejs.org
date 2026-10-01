import { testRule } from '../../__tests__/utils.mjs';

testRule('man-page-reference', [
  {
    name: 'plain references',
    input: '# T\n\nSee open(2) and `process.exit(1)`.\n',
    expected: [],
  },
  {
    name: 'manual link',
    input:
      '# T\n\n[open(2)](http://man7.org/linux/man-pages/man2/open.2.html) and [close(2)][].\n\n[close(2)]: https://man7.org/linux/man-pages/man2/close.2.html\n',
    expected: [
      /Manual page links are generated automatically/,
      /Manual page links are generated automatically/,
    ],
  },
  {
    name: 'links that would not auto-link',
    input:
      '# T\n\nSee [`inotify(7)`][] and [the manual](https://man7.org/linux/man-pages/man5/resolv.conf.5.html).\n\n[`inotify(7)`]: https://man7.org/linux/man-pages/man7/inotify.7.html\n',
    expected: [],
  },
  {
    name: 'code span reference when enabled',
    input: '# T\n\nSee `uname(3)`.\n',
    options: { code: true },
    expected: [
      'Write `uname(3)` as plain text (without backticks) so it auto-links to its manual page',
    ],
  },
  {
    name: 'code span reference by default',
    input: '# T\n\nSee `uname(3)`.\n',
    expected: [],
  },
]);
