import type { FC, PropsWithChildren } from 'react';

const DocsLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="has-side-nav container">
    <article dir="auto">{children}</article>
  </div>
);

export default DocsLayout;
