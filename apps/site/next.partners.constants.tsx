import type { Partners } from '#site/types';
import { partnersList } from '#site/util/partners';
import partners from '#site/util/partners/constants.json' with { type: 'json' };

const PARTNERS = partnersList(partners as Array<Omit<Partners, 'logo'>>);

export default PARTNERS as Array<Partners>;
