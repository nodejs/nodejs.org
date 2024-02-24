import type { FC, PropsWithChildren } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';

const VerifyingBinariesLink: FC<PropsWithChildren> = ({ children }) => (
  <LinkWithArrow href="https://github.com/nodejs/node#verifying-binaries">
    {children}
  </LinkWithArrow>
);

export default VerifyingBinariesLink;
