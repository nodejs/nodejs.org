import type { FC, PropsWithChildren } from 'react';

import LinkWithArrow from './LinkWithArrow';

const VerifyingBinariesLink: FC<PropsWithChildren> = ({ children }) => (
  <LinkWithArrow url="https://github.com/nodejs/node#verifying-binaries">
    {children}
  </LinkWithArrow>
);

export default VerifyingBinariesLink;
