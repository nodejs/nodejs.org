import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import type { PropsWithChildren, FC } from 'react';

type StabilityProps = PropsWithChildren<{ stability: number }>;

const getStabilityClass = (stability: number) => {
  const style = styles[`stabilityLevel${stability}`];
  if (!style) throw new Error(`Unknown stability level: ${stability}`);
  return style;
};

const Stability: FC<StabilityProps> = ({ stability, children }) => (
  <div className={`${styles.stability} ${getStabilityClass(stability)}`}>
    <FormattedMessage
      id="components.api.stability"
      values={{ level: stability }}
    />
    {children}
  </div>
);

export default Stability;
