import Skeleton from '@node-core/ui-components/Common/Skeleton';
import type { ComponentProps, FC, ReactElement } from 'react';
import { cloneElement } from 'react';

import type { Partners } from '#site/types';

import Button from '../../Button';

type ParnetsIconProps = Partners & ComponentProps<typeof Skeleton>;

const PartnersIcon: FC<ParnetsIconProps> = ({ href, logo, loading }) => {
  return (
    <Skeleton loading={loading}>
      <Button href={href} kind="secondary">
        {cloneElement(logo as ReactElement)}
      </Button>
    </Skeleton>
  );
};

export default PartnersIcon;
