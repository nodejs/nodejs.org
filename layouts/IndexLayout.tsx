import type { FC, PropsWithChildren } from 'react';

const IndexLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="container">
    <div id="home-intro">{children}</div>
  </div>
);

export default IndexLayout;
