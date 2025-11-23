'use client';

import usePartnersList from '#site/hooks/react-client/usePartnersList';
import { LOGO_PARTNERS } from '#site/next.partners.constants';

import type { PartnerCategory } from '#site/types';
import type { FC } from 'react';

import PartnerLogo from '../PartnerLogo';

import style from './index.module.css';

type PartnersLogoListProps = {
  maxLength?: number;
  categories?: PartnerCategory;
  sort?: 'name' | 'weight';
};

const PartnersLogoList: FC<PartnersLogoListProps> = ({
  maxLength = 3,
  sort = 'weight',
  categories,
}) => {
  const { seedList, initialRenderer } = usePartnersList({
    logos: LOGO_PARTNERS,
    maxLength,
    sort,
    categories,
  });

  return (
    <div className={style.partnersLogoList}>
      {seedList.map((partner, index) => (
        <PartnerLogo
          {...partner}
          key={index}
          loading={initialRenderer.current}
        />
      ))}
    </div>
  );
};

export default PartnersLogoList;
