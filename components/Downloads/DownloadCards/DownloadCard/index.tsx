import { Tab } from 'react-tabs';
import classNames from 'classnames';
import { MdGetApp } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import type { FC } from 'react';

type DownloadCardProps = {
  name: string;
  icon: string;
  label: string;
  download: string;
  filename: string;
  selected: boolean;
  onSelect: (_name: string) => void;
};

const DownloadCard: FC<DownloadCardProps> = ({
  name,
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
  const selectCard = () => onSelect(name);
  const size = selected ? 56 : 48;

  return (
    <Tab
      className={tabClassNames}
      id={`download-card-${name}`}
      key={name}
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
