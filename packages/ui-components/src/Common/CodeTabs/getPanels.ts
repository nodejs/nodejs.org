import { Children, Fragment, isValidElement } from 'react';

import type { ReactNode } from 'react';

export function getPanels(children: ReactNode): Array<ReactNode> {
  const panels: Array<ReactNode> = [];

  // The public children API accepts arrays and fragments in tab order.
  // eslint-disable-next-line @eslint-react/no-children-for-each
  Children.forEach(children, child => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment
    ) {
      panels.push(...getPanels(child.props.children));
    } else if (child != null) {
      panels.push(child);
    }
  });

  return panels;
}
