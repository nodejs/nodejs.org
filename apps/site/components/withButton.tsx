import type { ButtonProps } from '@node-core/ui-components/Common/Button';
import Button from '@node-core/ui-components/Common/Button';
import type { FC } from 'react';

import Link from '@/components/Link';

type WithButtonProps = Omit<ButtonProps, 'Wrapper'>;

const WithButton: FC<WithButtonProps> = ({ children, ...props }) => (
  <Button Wrapper={Link} {...props}>
    {children}
  </Button>
);

export default WithButton;
