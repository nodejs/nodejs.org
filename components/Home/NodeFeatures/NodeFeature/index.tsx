import styles from './index.module.scss';
import type { ReactElement, FC } from 'react';

type NodeFeatureProps = {
  icon: ReactElement;
  heading: ReactElement;
  description: ReactElement;
};

const NodeFeature: FC<NodeFeatureProps> = ({ icon, heading, description }) => (
  <div className={styles.container}>
    {icon}
    <h2 className="t-subheading2">{heading}</h2>
    <p>{description}</p>
  </div>
);

export default NodeFeature;
