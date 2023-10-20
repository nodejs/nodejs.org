import classNames from 'classnames';
import Image from 'next/image';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import NavItem from '@/components/sections/NavItem';
import { useSiteConfig } from '@/hooks/useSiteConfig';

import styles from './index.module.css';

const Footer: FC = () => {
  const { footerLinks, socialLinks } = useSiteConfig();

  const openJSlink = footerLinks.at(-1)!;

  return (
    <footer className={styles.footer}>
      <div className={styles.sectionPrimary}>
        {footerLinks.slice(0, -1).map(item => (
          <NavItem type="footer" href={item.link} key={item.link}>
            <FormattedMessage id={item.text} />
          </NavItem>
        ))}
      </div>
      <div className={styles.sectionSecondary}>
        <NavItem type="footer" href={openJSlink.link}>
          &copy; <FormattedMessage id={openJSlink.text} />
        </NavItem>
        <div className={styles.social}>
          {socialLinks.map(link => {
            const navClass = classNames({
              [styles.darkImage]: link.kind === 'dark',
              [styles.lightImage]: link.kind === 'light',
            });

            return (
              <NavItem
                className={navClass}
                key={link.icon}
                href={link.link}
                type="footer"
              >
                <Image
                  src={link.icon}
                  alt={link.alt || 'social'}
                  width={20}
                  height={20}
                />
              </NavItem>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
