import { FormattedMessage } from 'react-intl';
import Theme from '@/theme';
import type { GetStaticProps } from 'next';

const NotFound = () => (
  <Theme>
    <h2>
      <FormattedMessage id="pages.404.title" />
    </h2>
    <h3>
      <FormattedMessage id="pages.404.description" />
    </h3>
  </Theme>
);

export default NotFound;

// We require `getStaticProps` to ensure that this component is not rendered on server-side
// as the router will always treat the path as /404 despite the actual URL path not being /404
export const getStaticProps: GetStaticProps = () => ({ props: {} });
