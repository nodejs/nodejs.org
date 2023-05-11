import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../../../LocalizedLink';
import { ShellBox } from '../../../Common';
import styles from '../index.module.scss';
import type { FC } from 'react';

type Props = {
  nvmVersion: string;
};

export const PureMacOSPanel: FC<Props> = ({ nvmVersion }) => {
  const nvmInstallScriptUrl = `https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh`;

  return (
    <div>
      <ShellBox textToCopy={`curl -o- ${nvmInstallScriptUrl} | bash`}>
        <span className={styles.installTextNoSelect}>$</span>
        <span className={styles.installTextCommand}>curl -o- </span>
        {nvmInstallScriptUrl}
        <span className={styles.installTextCommand}> | bash </span>
      </ShellBox>
      <ShellBox textToCopy="nvm install --lts">
        <span className={styles.installTextNoSelect}>$</span>
        <span className={styles.installTextCommand}>nvm </span>install --lts
      </ShellBox>
      <br />
      <br />
      <LocalizedLink
        className={styles.installDocsButton}
        href="/download/package-manager/#nvm"
      >
        <FormattedMessage id="components.home.installTabs.readDocs" />
      </LocalizedLink>
    </div>
  );
};

const MacOSPanel: FC = () => {
  // @TODO: use hook to get latest version
  const nvmVersion = 'v0.38.0';

  return <PureMacOSPanel nvmVersion={nvmVersion} />;
};

export default MacOSPanel;
