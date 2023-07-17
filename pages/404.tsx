import { FormattedMessage } from 'react-intl';
import Theme from '@/theme';

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
