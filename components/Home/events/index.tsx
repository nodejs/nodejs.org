import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import ImageEvents from './images';
import type { FC } from 'react';

const Events: FC = () => (
  <div className={styles.container}>
    <div className={styles.image}>
      <ImageEvents />
    </div>
    <p className={styles.title}>
      <FormattedMessage id="components.home.events.title" />
    </p>
    {/* @todo: i18n link and add page */}
    <Link href="/events" className={styles.link}>
      <FormattedMessage id="components.home.events.cta" />
    </Link>
  </div>
);

export default Events;
