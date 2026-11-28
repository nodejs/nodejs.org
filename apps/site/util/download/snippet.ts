/**
 * Removes shell `#` comments from a single line while preserving `#` characters
 * inside quoted strings or inside words (e.g. `${VAR#prefix}`).
 */
const stripInlineComment = (line: string): string => {
  let quote: "'" | '"' | '`' | null = null;
  let escaped = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === '\\' && quote !== "'") {
      escaped = true;
      continue;
    }

    if (quote) {
      if (ch === quote) {
        quote = null;
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      continue;
    }

    if (ch === '#' && (i === 0 || /\s/.test(line[i - 1]!))) {
      return line.slice(0, i).trimEnd();
    }
  }

  return line.trimEnd();
};

/**
 * Strips shell `#` comment lines and trailing inline `#` comments from a
 * download snippet so copying and pasting it into shells where interactive
 * comments are disabled by default (such as macOS's default `zsh`) runs cleanly
 * without `zsh: command not found: #` errors.
 */
export const stripShellComments = (snippet: string): string => {
  const result: Array<string> = [];

  for (const rawLine of snippet.split(/\r?\n/)) {
    if (rawLine.trim().length === 0) {
      if (result.length > 0 && result[result.length - 1] !== '') {
        result.push('');
      }
      continue;
    }

    const stripped = stripInlineComment(rawLine);
    if (stripped.trim().length > 0) {
      result.push(stripped);
    }
  }

  while (result.length > 0 && result[result.length - 1] === '') {
    result.pop();
  }

  return result.join('\n');
};
