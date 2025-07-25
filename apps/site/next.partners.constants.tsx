import type { Partners } from '#site/types';
import { createPartnersList } from '#site/util/partners';
import partners from '#site/util/partners/constants.json' with { type: 'json' };

const getPartnersByType = (type?: 'Logo' | 'Favicon') =>
  createPartnersList(partners as Array<Omit<Partners, 'logo'>>, type);

const ICON_PARTNERS = getPartnersByType('Favicon');
const LOGO_PARTNERS = getPartnersByType('Logo');

export { ICON_PARTNERS, LOGO_PARTNERS };
