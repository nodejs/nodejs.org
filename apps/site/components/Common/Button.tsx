import BaseButton from '@node-core/ui-components/Common/BaseButton';
import type { ButtonProps } from '@node-core/ui-components/Common/BaseButton';
import type { FC, ComponentProps } from 'react';

import Link from '#site/components/Link';

const Button: FC<
  Omit<ButtonProps, 'as'> & Omit<ComponentProps<typeof Link>, 'as' | 'size'>
> = props => <BaseButton as={Link} {...props} />;

export default Button;
