import classNames from 'classnames';
import { MdGetApp } from 'react-icons/md';
import { Tab } from 'react-tabs';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from '@/hooks/useRouter';
import type { FC } from 'react';
import type { UserOS } from '@/types/userOS';

type DownloadCardProps = {
  os: UserOS;
  icon: string;
  label: string;
  download: string;
  filename: string;
  selected: boolean;
  onSelect: (os: string) => void;
};

const DownloadCard: FC<DownloadCardProps> = ({
  os,
  icon,
  label,
  download,
  filename,
  selected,
  onSelect,
}) => {
  const { basePath } = useRouter();

  const tabClassNames = classNames(styles.downloadCard, {
    [styles.downloadCardActive]: selected,
  });
  const selectCard = () => onSelect(os);
  const size = selected ? 56 : 48;

  return (
    <Tab
      className={tabClassNames}
      id={`download-card-${os}`}
      key={os}
      onClick={selectCard}
      selectedClassName={styles.downloadCardActive}
      tabIndex="0"
    >
      <div className={styles.top}>
        <Image
          height={size}
          width={size}
          src={`${basePath}/static/images/logos/${icon}`}
          alt={label}
        />
        {selected && (
          <a className={styles.link} href={download}>
            <MdGetApp />
          </a>
        )}
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.filename} data-testid="lts">
        {filename}
      </p>
    </Tab>
  );
};

export default DownloadCard;
