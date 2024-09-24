import type { JSXElementConstructor, ReactElement, ReactNode } from 'react';

export type FormattedMessage =
  | string
  | ReactElement<HTMLElement, string | JSXElementConstructor<HTMLElement>>
  | ReadonlyArray<ReactNode>;
