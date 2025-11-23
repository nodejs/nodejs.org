'use client';

import usePartnersList from '#site/hooks/react-client/usePartnersList';
import { ICON_PARTNERS } from '#site/next.partners.constants';

import type { PartnerCategory } from '#site/types';
import type { FC } from 'react';

import PartnerIcon from '../PartnerIcon';

import style from './index.module.css';

type PartnersIconListProps = {
  maxLength?: number;
  categories?: PartnerCategory;
};

const PartnersIconList: FC<PartnersIconListProps> = ({
  maxLength = 6,
  categories,
}) => {
  const { seedList, initialRenderer } = usePartnersList({
    logos: ICON_PARTNERS,
    maxLength,
    categories,
  });

  return (
    <div className={style.partnersIconList}>
      {seedList.map((partner, index) => (
        <PartnerIcon
          {...partner}
          key={index}
          loading={initialRenderer.current}
        />
      ))}
    </div>
  );
};

export default PartnersIconList;
