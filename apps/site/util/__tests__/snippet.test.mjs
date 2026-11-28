import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { stripShellComments } from '../download/snippet';

describe('stripShellComments', () => {
  it('removes full-line and trailing inline comments while preserving commands', () => {
    const input = [
      '# Download and install nvm:',
      'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash',
      '',
      '# in lieu of restarting the shell',
      '\\. "$HOME/.nvm/nvm.sh"',
      '',
      '# Verify the Node.js version:',
      'node -v # Should print "v26.13.1".',
      '',
      '# Verify npm version:',
      'npm -v # Should print "11.20.0".',
    ].join('\n');

    assert.equal(
      stripShellComments(input),
      [
        'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash',
        '',
        '\\. "$HOME/.nvm/nvm.sh"',
        '',
        'node -v',
        '',
        'npm -v',
      ].join('\n')
    );
  });

  it('preserves # inside quoted strings and parameter expansions', () => {
    const input = [
      'echo "hello # world" # trailing comment',
      "echo 'single # quote'",
      'echo ${VAR#prefix}',
      'curl https://example.com/page#anchor',
      'echo escaped \\# hash',
    ].join('\n');

    assert.equal(
      stripShellComments(input),
      [
        'echo "hello # world"',
        "echo 'single # quote'",
        'echo ${VAR#prefix}',
        'curl https://example.com/page#anchor',
        'echo escaped \\# hash',
      ].join('\n')
    );
  });

  it('collapses blank lines left behind by consecutive comment-only sections', () => {
    const input = [
      '# Section A',
      'cmd-a',
      '',
      '# Comment-only section',
      '#   commented-out command',
      '',
      '# Section B',
      'cmd-b',
      '',
      '# Trailing comment only',
    ].join('\n');

    assert.equal(stripShellComments(input), ['cmd-a', '', 'cmd-b'].join('\n'));
  });

  it('returns an empty string when input contains only comments or whitespace', () => {
    assert.equal(stripShellComments('# only a comment\n\n  # another'), '');
    assert.equal(stripShellComments(''), '');
  });
});
