import Skeleton from '@node-core/ui-components/Common/Skeleton';
import Tooltip from '@node-core/ui-components/Common/Tooltip';
import type { ComponentProps, FC } from 'react';
import { cloneElement } from 'react';

import Button from '#site/components/Common/Button';
import type { Partners } from '#site/types';

import style from './index.module.css';

type PartnersIconProps = Partners & ComponentProps<typeof Skeleton>;

const PartnersIcon: FC<PartnersIconProps> = ({ name, href, logo, loading }) => (
  <Skeleton loading={loading} className="size-9 p-2">
    <Tooltip
      content={
        <div className="p-2 text-neutral-900 dark:text-neutral-200">{name}</div>
      }
    >
      <Button
        kind="secondary"
        href={`${href}/?utm_source=nodejs-website&utm_medium=Link`}
        rel="sponsored noopener"
        target="_blank"
        className={style.partnerIcon}
      >
        {cloneElement(logo, {
          width: '100%',
          height: '16px',
        })}
      </Button>
    </Tooltip>
  </Skeleton>
);

export default PartnersIcon;
