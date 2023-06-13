import { FormattedMessage, useIntl } from 'react-intl';
import classnames from 'classnames';
import styles from './index.module.scss';
import type { FC } from 'react';

export type DownloadToggleProps = {
  handleClick: (type: string) => void;
  selected: string;
  showDescription?: boolean;
};

const DownloadToggle: FC<DownloadToggleProps> = ({
  handleClick,
  selected,
  showDescription = true,
}) => {
  const intl = useIntl();

  const activeClassNames = classnames({ [styles.active]: selected === 'LTS' });
  const currentClassNames = classnames(styles.current, {
    [styles.active]: selected === 'CURRENT',
  });

  const handleOnClick = () =>
    handleClick(selected === 'CURRENT' ? 'LTS' : 'CURRENT');

  return (
    <div className={styles.downloadToggle}>
      <div className={styles.selector}>
        <div className={styles.switch}>
          <button
            className={activeClassNames}
            type="button"
            role="switch"
            aria-label={intl.formatMessage({
              id: 'components.downloads.downloadToggle.ltsVersions',
            })}
            aria-checked={selected === 'LTS'}
            onClick={handleOnClick}
          >
            <FormattedMessage id="components.downloads.downloadToggle.lts" />
          </button>
          <button
            className={currentClassNames}
            type="button"
            role="switch"
            aria-label={intl.formatMessage({
              id: 'components.downloads.downloadToggle.currentVersions',
            })}
            aria-checked={selected === 'CURRENT'}
            onClick={handleOnClick}
          >
            <FormattedMessage id="components.downloads.downloadToggle.current" />
          </button>
        </div>
      </div>
      {showDescription && (
        <p className={styles.description}>
          <FormattedMessage
            id="components.downloads.downloadToggle.recommendation"
            values={{ selected }}
          />
        </p>
      )}
    </div>
  );
};

export default DownloadToggle;
