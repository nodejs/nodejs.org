import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { SlotProps } from '@radix-ui/react-slot';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import Link from '@/components/Link';

type LinkWithArrowProps =
  | ({ asChild?: false } & ComponentProps<typeof Link>)
  | ({ asChild: true } & SlotProps);

const LinkWithArrow: FC<PropsWithChildren<LinkWithArrowProps>> = ({
  children,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp {...props}>
      <span>
        {children}
        <ArrowUpRightIcon className="ml-1 inline w-3 fill-neutral-600 dark:fill-white" />
      </span>
    </Comp>
  );
};

export default LinkWithArrow;
