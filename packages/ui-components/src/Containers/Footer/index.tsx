import NavItem from '#ui/Containers/NavBar/NavItem';
import {
  Bluesky,
  Discord,
  GitHub,
  LinkedIn,
  Mastodon,
  Slack,
  X,
} from '#ui/Icons/Social';

import type { LinkLike } from '#ui/types';
import type { FC, ReactNode, SVGProps } from 'react';

import styles from './index.module.css';

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: GitHub,
  mastodon: Mastodon,
  twitter: X,
  slack: Slack,
  linkedin: LinkedIn,
  bluesky: Bluesky,
  discord: Discord,
};

type Navigation = {
  socialLinks: Array<{
    icon: string;
    link: string;
  }>;
  footerLinks: Array<{
    text: string;
    link: string;
  }>;
};

type ExtraNavigationSlots = {
  primary?: ReactNode;
  secondary?: ReactNode;
};

type FooterProps = {
  pathname: string;
  as: LinkLike;
  navigation: Navigation;
  slots?: ExtraNavigationSlots;
};

const Footer: FC<FooterProps> = ({
  pathname = '/',
  as = 'a',
  navigation,
  slots,
}) => {
  const openJSlink = navigation.footerLinks.at(-1)!;

  return (
    <footer className={styles.footer}>
      <div className={styles.sectionPrimary}>
        {slots?.primary}

        {navigation.footerLinks.slice(0, -1).map(item => (
          <NavItem
            key={item.link}
            type="footer"
            href={item.link}
            as={as}
            pathname={pathname}
          >
            {item.text}
          </NavItem>
        ))}
      </div>

      <div className={styles.sectionSecondary}>
        {slots?.secondary}

        <NavItem
          type="footer"
          href={openJSlink.link}
          as={as}
          pathname={pathname}
        >
          &copy; {openJSlink.text}
        </NavItem>

        <div className={styles.social}>
          {navigation.socialLinks.map(link => {
            const SocialIcon = footerSocialIcons[link.icon];

            return (
              <NavItem
                key={link.icon}
                href={link.link}
                type="footer"
                as={as}
                pathname={pathname}
              >
                <SocialIcon width={20} height={20} aria-label={link.link} />
              </NavItem>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
