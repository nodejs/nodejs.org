import Skeleton from '@node-core/ui-components/Common/Skeleton';
import type { ComponentProps, FC } from 'react';
import { cloneElement } from 'react';

import Button from '#site/components/Common/Button';
import type { Partners } from '#site/types';

import style from './index.module.css';

type PartnersLogoProps = Partners & ComponentProps<typeof Skeleton>;

const PartnersLogo: FC<PartnersLogoProps> = ({ href, logo, loading }) => (
  <Skeleton loading={loading} className="h-28 w-full p-2">
    <Button
      kind="secondary"
      href={`${href}/?utm_source=nodejs-website&utm_medium=Link`}
      className={style.partnerIcon}
    >
      {cloneElement(logo, {
        width: '100%',
        height: '16px',
      })}
    </Button>
  </Skeleton>
);

export default PartnersLogo;
