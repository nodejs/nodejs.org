import type { UrlObject } from 'url';

import { type Heading } from '@vcarl/remark-headings';
import Image from 'next/image';
import type { FC, ReactNode, ReactElement } from 'react';
import { cloneElement, isValidElement } from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type Url = string | UrlObject;

type MetaBarProps = {
  entries: MetaBarEntriesProps[];
  headings?: Heading[];
};

type MetaBarEntriesProps = {
  id: string;
  value?: string | ReactNode;
};

type MetaBarLinkEntries = {
  url: Url;
  icon: ReactElement | Url | unknown;
  titleid: string;
};
export const MetaBarLinkEntries = ({
  url,
  icon,
  titleid,
}: MetaBarLinkEntries) => {
  const linkIconProps = {
    className: styles.icon,
    width: 24,
    height: 24,
    titleid,
  };
  if (isValidElement(icon)) {
    const Icon = cloneElement(icon, linkIconProps);
    return (
      <LocalizedLink href={url} className={styles.viewAsUrl}>
        {Icon}
        <FormattedMessage id={titleid} />
      </LocalizedLink>
    );
  }

  return (
    <LocalizedLink href={url} className={styles.viewAsUrl}>
      <Image
        src={icon as string}
        alt={linkIconProps.titleid}
        {...linkIconProps}
      />
      <FormattedMessage id={titleid} />
    </LocalizedLink>
  );
};

const MetaBarEntries: FC<MetaBarEntriesProps> = ({ id, value }) => {
  return (
    <div className={styles.metaBarEntry}>
      <h4>
        <FormattedMessage id={id} />
      </h4>
      <div>{value}</div>
    </div>
  );
};

const MetaBar: FC<MetaBarProps> = ({ entries, headings }) => {
  return (
    <aside className={styles.metaBar}>
      <div className={styles.metaBarContentWrap}>
        {entries.map(entry => (
          <MetaBarEntries key={entry.id} id={entry.id} value={entry.value} />
        ))}
        <nav>
          <FormattedMessage id="components.metabar.tableOfContents" />
          <ol>
            {headings?.map(heading => (
              <li
                key={heading?.data.id}
                style={{ marginLeft: `${heading?.depth - 2}rem` }}
              >
                <LocalizedLink href={`#${heading?.data?.id || heading.value}`}>
                  {heading.value}
                </LocalizedLink>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
};

export default MetaBar;
