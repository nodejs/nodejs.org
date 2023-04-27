import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import Link from 'next/link';
import styles from './index.module.scss';
import ActiveLocalizedLink from '../ActiveLocalizedLink';
import DarkModeToggle from '../Common/DarkModeToggle';

const Header = () => (
  <nav aria-label="Primary" className={styles.header}>
    <div className={styles.container}>
      <div className={styles.startWrapper}>
        <Link href="/" aria-label="Homepage">
          <div className={styles.logo}>
            <div>
              <Image
                src={'static/images/logo-light.svg'}
                alt="light-logo"
                className="light-mode-only"
                width="111"
                height="33"
              />
            </div>
            <div>
              <Image
                src={'static/images/logo.svg'}
                alt="dark-logo"
                className="dark-mode-only"
                width="111"
                height="33"
              />
            </div>
          </div>
        </Link>
      </div>

      <ul className={styles.tabs}>
        <li>
          <ActiveLocalizedLink href="/docs" activeClassName={styles.active}>
            <FormattedMessage id="components.header.links.docs" />
          </ActiveLocalizedLink>
        </li>
        <li>
          <ActiveLocalizedLink href="/learn" activeClassName={styles.active}>
            <FormattedMessage id="components.header.links.learn" />
          </ActiveLocalizedLink>
        </li>
        <li>
          <ActiveLocalizedLink href="/download" activeClassName={styles.active}>
            <FormattedMessage id="components.header.links.download" />
          </ActiveLocalizedLink>
        </li>
      </ul>

      <div className={styles.endWrapper}>
        <ul className={styles.rightContainer}>
          <li className={styles.searchBar}>
            <span className="sr-only">Search Bar</span>
            {/* <CommonComponents.SearchBar /> */}
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
