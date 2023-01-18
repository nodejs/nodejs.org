import type { PropsWithChildren } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type AnchorHeadingProps = PropsWithChildren<{
  level: HeadingLevel;
  id?: string;
}>;

const AnchoredHeading = ({ children, level, id }: AnchorHeadingProps) => {
  const HeadingLevelTag = `h${level}` as any;

  return (
    <HeadingLevelTag id={id}>
      {children}
      <a
        id={`header-${id}`}
        className="anchor"
        href={`#${id}`}
        aria-labelledby={id}
      />
    </HeadingLevelTag>
  );
};

export default AnchoredHeading;
