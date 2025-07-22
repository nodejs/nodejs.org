import type { Partners } from '#site/types';
import { partnersList } from '#site/util/partners';
import partners from '#site/util/partners/constants.json' with { type: 'json' };

const PARTNERS = (type?: 'Logo' | 'Favicon') =>
  partnersList(partners as Array<Omit<Partners, 'logo'>>, type);

const ICON_PARTNERS = PARTNERS('Favicon');
const LOGO_PARTNERS = PARTNERS('Logo');

export { ICON_PARTNERS, LOGO_PARTNERS };
