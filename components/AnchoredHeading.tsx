import type { PropsWithChildren } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type AnchorHeadingProps = PropsWithChildren<{
  level: HeadingLevel;
  id?: string;
}>;

/**
 * This module will automatically replace the header style words
 * (such as `#`,`##`...ect) to an anchor name.
 *
 * This processor will make all the English characters (26 letters)
 * into their lower case, for others in the middle of words,
 * they will become `-` in default. For more than one `-` together,
 * there's only one left.
 *
 * If your title has some non-English characters, please use
 * `<!---->` to quote your English anchor name inside, with your
 * own title beside it. Otherwises it will return you what it is.
 */

// React will ignore "<!" and ">" in the string,
// so we can just use '-- --' to quote the anchor name inside it.
const COMMENT_FOR_HEADANCHOR = /--\x20?([\w\x20-]+)\x20?--/;

const AnchoredHeading = ({ children, level, id }: AnchorHeadingProps) => {
  const HeadingLevelTag = `h${level}` as any;

  let sanitizedId =
    id ?? children?.toLocaleString().toLocaleLowerCase().replace(/\x20/g, '-');

  if (sanitizedId) {
    const foundAnchorAndTitle = COMMENT_FOR_HEADANCHOR.exec(sanitizedId);

    if (foundAnchorAndTitle) {
      sanitizedId = foundAnchorAndTitle[1]
        .replace(/(\[([^\]]+)]\([^)]+\))/g, '$2')
        .replace(/[^\w]+/g, '-')
        .replace(/[\x20]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  }

  return (
    <HeadingLevelTag id={sanitizedId}>
      {children}
      <a
        id={`header-${sanitizedId}`}
        className="anchor"
        href={`#${sanitizedId}`}
        aria-labelledby={sanitizedId}
      />
    </HeadingLevelTag>
  );
};

export default AnchoredHeading;
