import Tooltip from '@node-core/ui-components/Common/Tooltip';
import * as PartnerLogos from '@node-core/ui-components/Icons/PartnerLogos';

import providePartners from '#site/next-data/providers/partners';
import { partners } from '#site/next.json.mjs';

import type { Partner, PartnerCategory } from '#site/types';
import type { FC } from 'react';

import PartnerButton from './PartnerButton';

import style from './index.module.css';

type PartnersListProps = {
  size?: 'large' | 'small';
  category?: PartnerCategory;
  sort?: 'name' | 'weight';
  length?: number;
};

const getPartners = async (
  length?: number,
  category?: PartnerCategory,
  sort?: 'name' | 'weight'
) => {
  let result = sort === 'name' ? partners : await providePartners();

  result = category
    ? result.filter(p => p.categories.includes(category))
    : result;

  return length ? result.slice(0, length) : result;
};

const renderSmallPartner = (partner: Partner) => {
  const Logo = PartnerLogos[partner.id];

  return (
    <Tooltip
      key={partner.id}
      asChild
      content={<div className={style.tooltip}>{partner.name}</div>}
    >
      <PartnerButton aria-label={partner.name} size="small" href={partner.href}>
        <Logo.Favicon />
      </PartnerButton>
    </Tooltip>
  );
};

const renderLargePartner = (partner: Partner) => {
  const Logo = PartnerLogos[partner.id];

  return (
    <PartnerButton
      aria-label={partner.name}
      key={partner.id}
      size="large"
      href={partner.href}
    >
      <Logo.Logo />
    </PartnerButton>
  );
};

const PartnersList: FC<PartnersListProps> = async ({
  size = 'small',
  category,
  sort = 'name',
  length,
}) => {
  const isSmall = size === 'small';

  const SMALL_PARTNER_LIMIT = 6;

  const partners = await getPartners(
    length ?? (isSmall ? SMALL_PARTNER_LIMIT : undefined),
    category,
    sort
  );

  return (
    <div className={style[size]}>
      {partners.map(isSmall ? renderSmallPartner : renderLargePartner)}
    </div>
  );
};

export default PartnersList;
