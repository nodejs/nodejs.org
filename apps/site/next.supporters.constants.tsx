import JsIconGreen from '@/components/Icons/Logos/JsIconGreen';
import Nodejs from '@/components/Icons/Logos/Nodejs';
import type { Supporter } from '@/types';

export const DEFAULT_SUPPORTER: Supporter = {
  name: 'Supporter',
  logo: <Nodejs />,
  icon: <JsIconGreen />,
  href: 'https://example.com',
  threshold: 1,
};

export const DEFAULT_SUPPORTERS_LIST = Array.from(
  { length: 10 },
  () => DEFAULT_SUPPORTER
);

// @TODO: Set actual Supporters here
export default [...DEFAULT_SUPPORTERS_LIST] as Array<Supporter>;
