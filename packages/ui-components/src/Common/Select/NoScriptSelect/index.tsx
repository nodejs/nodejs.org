import { useId } from 'react';

import Select from '#ui/Common/Select';
import StatelessSelect from '#ui/Common/Select/StatelessSelect';

import type { StatelessSelectProps } from '#ui/Common/Select/StatelessSelect';

const WithNoScriptSelect = <T extends string>({
  as,
  defaultValue,
  ...props
}: StatelessSelectProps<T>) => {
  const id = useId();
  const selectId = `select-${id.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <>
      <Select {...props} value={defaultValue} fallbackClass={selectId} />
      <noscript>
        <style>{`.${selectId} { display: none!important; }`}</style>
        <StatelessSelect {...props} defaultValue={defaultValue} as={as} />
      </noscript>
    </>
  );
};

export default WithNoScriptSelect;
