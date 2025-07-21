import Skeleton from '@node-core/ui-components/Common/Skeleton';
import Tooltip from '@node-core/ui-components/Common/Tooltip';
import type { ComponentProps, FC } from 'react';
import { cloneElement } from 'react';

import type { Partners } from '#site/types';

import style from './index.module.css';
import Button from '../../Button';

type ParnetsIconProps = Partners & ComponentProps<typeof Skeleton>;

const PartnersIcon: FC<ParnetsIconProps> = ({ name, href, logo, loading }) => {
  return (
    <Skeleton loading={loading} className="h-9 w-9 p-2">
      <Tooltip content={name}>
        <Button kind="secondary" href={href} className={style.partnerIcon}>
          {cloneElement(logo, {
            className: 'h-4 w-auto',
            width: 'auto',
            height: '16px',
          })}
        </Button>
      </Tooltip>
    </Skeleton>
  );
};

export default PartnersIcon;
