import Link from 'next/link';
import styles from './index.module.scss';
import ImageEvents from './images';
import type { FC } from 'react';

const Events: FC = () => (
  <div className={styles.container}>
    <div className={styles.image}>
      <ImageEvents />
    </div>
    <p className={styles.title}>
      OpenJS World 2023 ! <br />
      What happened? What&apos;s next?
    </p>
    {/* @todo: i18n link and add page */}
    <Link href="/events" className={styles.link}>
      Learn more
    </Link>
  </div>
);

export default Events;
