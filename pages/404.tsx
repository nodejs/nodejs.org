import { FormattedMessage } from 'react-intl';
import DefaultLayout from '../layouts/DefaultLayout';

const NotFoundPage = () => (
  <DefaultLayout>
    <FormattedMessage id="pages.404.title" tagName="h2" />
    <FormattedMessage id="pages.404.subtitle" tagName="h3" />
  </DefaultLayout>
);

export default NotFoundPage;
