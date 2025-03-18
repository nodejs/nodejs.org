'use client';

import Select from '@node-core/ui-components/Common/Select';
import type { ComponentProps, FC } from 'react';

import { useRouter } from '@/navigation.mjs';

type WithSidebarSelectProps = Pick<
  ComponentProps<typeof Select>,
  'values' | 'defaultValue' | 'label'
>;

const WithRouterSelect: FC<WithSidebarSelectProps> = ({
  values,
  label,
  defaultValue,
}) => {
  const { push } = useRouter();

  return (
    <Select
      inline={true}
      label={label}
      values={values}
      defaultValue={defaultValue}
      onChange={value => push(value)}
    />
  );
};

export default WithRouterSelect;
