import BaseButton from '@node-core/ui-components/Common/BaseButton';
import type { ButtonProps } from '@node-core/ui-components/Common/BaseButton';
import type { FC } from 'react';

import Link from '#site/components/Link';

const Button: FC<ButtonProps> = props => <BaseButton as={Link} {...props} />;

export default Button;
