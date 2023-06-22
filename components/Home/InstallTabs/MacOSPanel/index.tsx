import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../../../LocalizedLink';
import { ShellBox } from '../../../Common';
import styles from '../index.module.scss';
import { getNvmLatestVersion } from '../../../../util/getNvmData';
import type { FC } from 'react';

type Props = {
  nvmVersion: string;
};

export const PureMacOSPanel: FC<Props> = ({ nvmVersion }) => {
  const nvmInstallScriptUrl = `https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh`;

  return (
    <>
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
      {/* @TODO: Verify this link when we implement content */}
      <LocalizedLink
        className={styles.installDocsButton}
        href="/download/package-manager/#nvm"
      >
        <FormattedMessage id="components.home.installTabs.readDocs" />
      </LocalizedLink>
    </>
  );
};

const MacOSPanel: FC = () => {
  const [nvmVersion, setNvmVersion] = useState('');

  useEffect(() => {
    getNvmLatestVersion().then(version => setNvmVersion(version));
  }, []);

  return <PureMacOSPanel nvmVersion={nvmVersion} />;
};

export default MacOSPanel;
