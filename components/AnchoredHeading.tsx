import type { PropsWithChildren } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type AnchorHeadingProps = PropsWithChildren<{
  level: HeadingLevel;
  id?: string;
}>;

const AnchoredHeading = ({ children, level, id }: AnchorHeadingProps) => {
  const HeadingLevelTag = `h${level}` as any;

  // This regex replacement is used for <!-- --> comments within the heading
  const sanitizedId = id?.replace(/---(.+)---(.*)/, (_, f) => f);

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
