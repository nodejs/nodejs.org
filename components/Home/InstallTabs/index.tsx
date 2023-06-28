import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';
import styles from './index.module.scss';
import { detectOS } from '../../../util/detectOS';
import type { UserOS } from '../../../types';
import type { FC, ReactNode, ReactElement } from 'react';

const tabPanelStyles = {
  className: styles.reactTabsTabPanel,
  selectedClassName: styles.reactTabsTabPanelSelected,
};

const getOSPanel: FC<UserOS> = userOS => {
  const createPanel = (...components: ReactNode[]) => {
  return components.map((comp) => (
    <TabPanel {...tabPanelStyles}>{comp}</TabPanel>
  ));
};

switch (userOS) {
  case "MAC":
    return createPanel(<MacOSPanel />, <WindowsPanel />, <LinuxPanel />);
  case "LINUX":
    return createPanel(<LinuxPanel />, <MacOSPanel />, <WindowsPanel />);
  default:
    return createPanel(<WindowsPanel />, <MacOSPanel />, <LinuxPanel />);
}

};

const os = {
  win: 'Windows (Chocolatey)',
  mac: 'macOS (nvm)',
  linux: 'Linux (nvm)',
};

const installTabSystems: Record<UserOS, string[]> = {
  WIN: [os.win, os.mac, os.linux],
  MAC: [os.mac, os.win, os.linux],
  LINUX: [os.linux, os.mac, os.win],
  OTHER: [os.win, os.mac, os.linux],
};

const InstallTabs: FC = () => {
  const [reactTabs, setReactTabs] = useState<ReactNode>();

  useEffect(() => {
    const userOS = detectOS();
    const panelSwitch = getOSPanel(userOS);
    const tabLayout = installTabSystems[userOS];

    setReactTabs(
      <Tabs className={styles.reactTabs}>
        <div className={styles.installHeader}>
          <div className={styles.installHeaderCircles}>
            <div className={styles.installHeaderCirclesRed} />
            <div className={styles.installHeaderCirclesYellow} />
            <div className={styles.installHeaderCirclesGreen} />
          </div>
          <div className={styles.installHeaderText}>
            {userOS === 'MAC' ? 'zsh' : 'bash'}
          </div>
        </div>
        <TabList className={styles.reactTabsTabList}>
          {tabLayout.map(system => (
            <Tab
              className={styles.reactTabsTab}
              selectedClassName={styles.reactTabsTabSelected}
              key={system}
            >
              {system}
            </Tab>
          ))}
        </TabList>
        {tabLayout && panelSwitch}
      </Tabs>
    );
  }, []);

  return <div className={styles.install}>{reactTabs}</div>;
};

export default InstallTabs;
