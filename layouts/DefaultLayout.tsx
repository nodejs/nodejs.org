import type { FC, PropsWithChildren } from 'react';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="container">{children}</div>
);

export default DefaultLayout;
