import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import type { PropsWithChildren, FC } from 'react';

type StabilityProps = PropsWithChildren<{ stability: number }>;

const getStabilityClass = (stability: number) => {
  switch (stability) {
    case 0:
      return styles.stabilityLevel0;
    case 1:
      return styles.stabilityLevel1;
    case 2:
      return styles.stabilityLevel2;
    case 3:
      return styles.stabilityLevel3;
    default:
      throw new Error(`Unknown stability level: ${stability}`);
  }
};

const Stability: FC<StabilityProps> = ({ stability, children }) => (
  <div className={`${styles.stability} ${getStabilityClass(stability)}`}>
    <FormattedMessage id="docs.api.stability" values={{ level: stability }} />
    {children}
  </div>
);

export default Stability;
