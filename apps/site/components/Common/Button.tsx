import BaseButton from '@node-core/ui-components/Common/BaseButton';

import Link from '#site/components/Link';

import type { ButtonProps } from '@node-core/ui-components/Common/BaseButton';
import type { FC } from 'react';

const Button: FC<ButtonProps> = props => <BaseButton as={Link} {...props} />;

export default Button;
