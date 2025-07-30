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
    <Tooltip content={<span className="px-2">{name}</span>}>
      <Button
        kind="secondary"
        href={`${href}/?utm_source=nodejs-website&utm_medium=Link`}
        className={style.partnerIcon}
      >
        {cloneElement(logo, {
          width: 'auto',
          height: '16px',
        })}
      </Button>
    </Tooltip>
  </Skeleton>
);

export default PartnersIcon;
