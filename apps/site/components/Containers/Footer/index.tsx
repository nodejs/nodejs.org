'use client';

import NavItem from '@node-core/ui-components/Containers/NavBar/NavItem';
import BlueskyIcon from '@node-core/ui-components/Icons/Social/Bluesky';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import LinkedInIcon from '@node-core/ui-components/Icons/Social/LinkedIn';
import MastodonIcon from '@node-core/ui-components/Icons/Social/Mastodon';
import SlackIcon from '@node-core/ui-components/Icons/Social/Slack';
import XIcon from '@node-core/ui-components/Icons/Social/X';
import { useTranslations } from 'next-intl';
import type { FC, SVGProps } from 'react';

import Link from '@/components/Link';
import { usePathname } from '@/navigation.mjs';
import { siteNavigation } from '@/next.json.mjs';

import styles from './index.module.css';

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  mastodon: MastodonIcon,
  twitter: XIcon,
  slack: SlackIcon,
  linkedin: LinkedInIcon,
  bluesky: BlueskyIcon,
};

const Footer: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const openJSlink = siteNavigation.footerLinks.at(-1)!;

  return (
    <footer className={styles.footer}>
      <div className={styles.sectionPrimary}>
        {siteNavigation.footerLinks.slice(0, -1).map(item => (
          <NavItem
            type="footer"
            pathname={pathname}
            href={item.link}
            key={item.link}
            Wrapper={Link}
          >
            {t(item.text)}
          </NavItem>
        ))}
      </div>

      <div className={styles.sectionSecondary}>
        <NavItem
          type="footer"
          href={openJSlink.link}
          Wrapper={Link}
          pathname={pathname}
        >
          &copy; {openJSlink.text}
        </NavItem>

        <div className={styles.social}>
          {siteNavigation.socialLinks.map(link => {
            const SocialIcon = footerSocialIcons[link.icon];

            return (
              <NavItem
                key={link.icon}
                href={link.link}
                type="footer"
                Wrapper={Link}
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
