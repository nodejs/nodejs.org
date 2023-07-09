import { FormattedMessage } from 'react-intl';
import { FaGithub, FaSlack, FaTwitter, FaMastodon } from 'react-icons/fa';
import styles from './index.module.scss';
import LocalizedLink from '@/components/LocalizedLink';

const Footer = () => (
  <footer className={styles.footer}>
    <ul className={styles.left}>
      <li>
        <a
          className={styles.link}
          target="_blank"
          href="https://trademark-policy.openjsf.org/"
          rel="noopener noreferrer"
          aria-label="Node.js Trademark Policy - PDF (Opens in new tab)"
        >
          <FormattedMessage id="components.sections.newFooter.trademark" />
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          target="_blank"
          href="https://privacy-policy.openjsf.org/"
          rel="noopener noreferrer"
          aria-label="Node.js Privacy Policy - PDF (Opens in new tab)"
        >
          <FormattedMessage id="components.sections.newFooter.privacy" />
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          target="_blank"
          href="https://github.com/openjs-foundation/cross-project-council/blob/main/CODE_OF_CONDUCT.md#contributor-covenant-code-of-conduct"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="components.sections.newFooter.codeOfConduct" />
        </a>
      </li>
      <li>
        <LocalizedLink className={styles.link} href="/about/security">
          <FormattedMessage id="components.sections.newFooter.security" />
        </LocalizedLink>
      </li>
      <li>
        <LocalizedLink className={styles.link} href="/about">
          <FormattedMessage id="components.sections.newFooter.about" />
        </LocalizedLink>
      </li>
      <li>
        <LocalizedLink className={styles.link} href="/blog">
          <FormattedMessage id="components.sections.newFooter.blog" />
        </LocalizedLink>
      </li>
    </ul>
    <ul className={styles.right}>
      <li>© OpenJS Foundation</li>
      <li>
        <a
          target="_blank"
          href="https://github.com/nodejs/node"
          rel="noopener noreferrer"
          aria-label="Node.js Github Page (opens in new tab)"
        >
          <FaGithub />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://mastodon.social/@nodejs@social.lfx.dev"
          rel="noopener noreferrer"
          aria-label="Node.js Mastodon (opens in new tab)"
        >
          <FaMastodon />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://twitter.com/nodejs"
          rel="noopener noreferrer"
          aria-label="Node.js Twitter (opens in new tab)"
        >
          <FaTwitter />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://slack.openjsf.org"
          rel="noopener noreferrer"
          aria-label="Node.js Slack (opens in new tab)"
        >
          <FaSlack />
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
