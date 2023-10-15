import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { type Heading } from '@vcarl/remark-headings';
import Image from 'next/image';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import AvatarGroup from '@/components/Common/AvatarGroup';
import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type MetaBarProps = {
  date: Date;
  readingTime: string;
  addedInVersion: string;
  author: string;
  authors: ComponentProps<typeof AvatarGroup>['avatars'];
  sourceURL: string;
  viewAsURL: string;
  headings: Heading[];
};

const MetaBar: FC<MetaBarProps> = ({
  date,
  readingTime,
  addedInVersion,
  author,
  authors = [],
  sourceURL,
  viewAsURL,
  headings = [],
}) => (
  <div className={styles.wrapper}>
    <dl>
      <MetaBarPair
        id="components.metabar.lastUpdated"
        value={date.toLocaleDateString()}
      />
      <MetaBarPair id="components.metabar.readingTime" value={readingTime} />
      <MetaBarPair id="components.metabar.addedIn" value={addedInVersion} />
      <MetaBarPair id="components.metabar.author" value={author} />
      <MetaBarPair id="components.metabar.authors">
        <AvatarGroup avatars={authors} />
      </MetaBarPair>
      <MetaBarPair id="components.metabar.contribute">
        <Image
          src="/static/images/logos/social-github-dark.svg"
          alt="GitHub Logo"
          width={16}
          height={16}
          className={styles.onLight}
        />
        <Image
          src="/static/images/logos/social-github.svg"
          alt="GitHub Logo"
          width={16}
          height={16}
          className={styles.onDark}
        />
        <LocalizedLink href={sourceURL}>
          <FormattedMessage id={'components.metabar.contributeText'} />
        </LocalizedLink>
      </MetaBarPair>
      <MetaBarPair id="components.metabar.viewAs">
        <CodeBracketIcon className={styles.icon} />
        <LocalizedLink href={viewAsURL}>JSON</LocalizedLink>
      </MetaBarPair>
      {headings && headings.length > 0 && (
        <MetaBarPair id="components.metabar.tableOfContents">
          <ul>
            {headings.map(heading => (
              <li key={heading.value}>
                <LocalizedLink href={`#${heading?.data?.id || heading.value}`}>
                  {heading.value}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </MetaBarPair>
      )}
    </dl>
  </div>
);

type MetaBarPairProps = PropsWithChildren<{ id: string; value?: string }>;

const MetaBarPair: FC<MetaBarPairProps> = ({ id, value, children }) => (
  <>
    <dt>
      <FormattedMessage id={id} />
    </dt>
    <dd>{value || children}</dd>
  </>
);

export default MetaBar;
