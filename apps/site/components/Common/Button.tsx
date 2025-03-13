import BaseButton, {
  type ButtonProps,
} from '@node-core/ui-components/Common/BaseButton';
import type { FC, ComponentProps } from 'react';

import Link from '@/components/Link';

const Button: FC<
  Omit<ButtonProps, 'as'> & Omit<ComponentProps<typeof Link>, 'as' | 'size'>
> = props => <BaseButton as={Link} {...props} />;

export default Button;
