import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

<<<<<<<< HEAD:components/Sections/Footer/index.tsx
import NavItem from '@/components/Sections/NavItem';
import { useSiteConfig } from '@/hooks/useSiteConfig';
========
import NavItem from '@/components/Containers/NavItem';
import { siteConfig } from '@/next.json.mjs';
>>>>>>>> a6671e99 (meta: adopt next-intl and app router):components/Containers/Footer/index.tsx

import styles from './index.module.css';

const Footer: FC = () => {
  const t = useTranslations();

  const openJSlink = siteConfig.footerLinks.at(-1)!;

  return (
    <footer className={styles.footer}>
      <div className={styles.sectionPrimary}>
        {siteConfig.footerLinks.slice(0, -1).map(item => (
          <NavItem type="footer" href={item.link} key={item.link}>
            {t(item.text)}
          </NavItem>
        ))}
      </div>
      <div className={styles.sectionSecondary}>
        <NavItem type="footer" href={openJSlink.link}>
          &copy; {t(openJSlink.text)}
        </NavItem>
        <div className={styles.social}>
          {siteConfig.socialLinks.map(link => {
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
