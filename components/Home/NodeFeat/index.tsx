import { cloneElement } from 'react';
import { IoLogoNodejs, IoMdGitPullRequest, IoMdRocket } from 'react-icons/io';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import type { ReactElement } from 'react';

type NodeFeatureProps = {
  icon: ReactElement;
  heading: ReactElement;
  description: ReactElement;
};

const styled = (icon: ReactElement): ReactElement =>
  cloneElement(icon, {
    alt: 'Node Feature',
    className: styles.featureIcon,
  });

const features = [
  {
    icon: styled(<IoLogoNodejs />),
    heading: 'pages.index.features.javascript.title',
    description: 'pages.index.features.javascript.description',
  },
  {
    icon: styled(<IoMdGitPullRequest />),
    heading: 'pages.index.features.openSource.title',
    description: 'pages.index.features.openSource.description',
  },
  {
    icon: styled(<IoMdRocket />),
    heading: 'pages.index.features.everywhere.title',
    description: 'pages.index.features.everywhere.description',
  },
];

const NodeFeature: React.FC<NodeFeatureProps> = ({ icon, heading, description }) => (
  <div className={styles.text}>
    {icon}
    <h2 className="t-subheading2">{heading}</h2>
    <p>{description}</p>
  </div>
);

const NodeFeatures: React.FC = () => {
  return (
    <section className={styles.nodeFeatures}>
      {features.map(feature => (
        <NodeFeature
          key={feature.heading}
          icon={feature.icon}
          heading={<FormattedMessage id={feature.heading} />}
          description={<FormattedMessage id={feature.description} />}
        />
      ))}
    </section>
  );
};

export default NodeFeatures;
