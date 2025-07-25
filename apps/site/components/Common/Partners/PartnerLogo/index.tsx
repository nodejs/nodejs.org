import Skeleton from '@node-core/ui-components/Common/Skeleton';
import type { ComponentProps, FC } from 'react';
import { cloneElement } from 'react';

import type { Partners } from '#site/types';

import style from './index.module.css';
import Button from '../../Button';

type ParnetsIconProps = Partners & ComponentProps<typeof Skeleton>;

const PartnersIcon: FC<ParnetsIconProps> = ({ href, logo, loading }) => {
  return (
    <Skeleton loading={loading} className="h-[114px] w-full p-2">
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
    </Skeleton>
  );
};

export default PartnersIcon;
