import { cloneElement } from 'react';
import { IoLogoNodejs, IoMdGitPullRequest, IoMdRocket } from 'react-icons/io';
import { FormattedMessage } from 'react-intl';
import NodeFeature from './NodeFeature';
import styles from './index.module.scss';
import type { ReactElement, FC } from 'react';

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

const NodeFeatures: FC = () => (
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

export default NodeFeatures;
