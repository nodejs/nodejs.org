import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../../../LocalizedLink';
import { ShellBox } from '../../../Common';
import styles from '../index.module.scss';
import type { FC } from 'react';

const WindowsPanel: FC = () => (
  <div>
    <ShellBox textToCopy="choco install nvs">
      <span className={styles.installTextNoSelect}>$</span>
      <span className={styles.installTextCommand}>choco </span>install nvs
    </ShellBox>
    <ShellBox textToCopy="nvs add lts">
      <span className={styles.installTextNoSelect}>$</span>
      <span className={styles.installTextCommand}>nvs </span>add lts
    </ShellBox>
    <ShellBox textToCopy="nvs use lts">
      <span className={styles.installTextNoSelect}>$</span>
      <span className={styles.installTextCommand}>nvs </span>use lts
    </ShellBox>
    <br />
    <br />
    <LocalizedLink
      className={styles.installDocsButton}
      href="/download/package-manager/#nvs"
    >
      <FormattedMessage id="components.home.installTabs.readDocs" />
    </LocalizedLink>
  </div>
);

export default WindowsPanel;
