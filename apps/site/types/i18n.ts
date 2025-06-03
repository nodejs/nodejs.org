import type { Locale } from '@node-core/website-i18n/types';
import type {
  NamespaceKeys,
  MessageKeys,
  NestedValueOf,
  NestedKeyOf,
} from 'next-intl';
import type { JSXElementConstructor, ReactElement, ReactNode } from 'react';

export type FormattedMessage =
  | string
  | ReactElement<HTMLElement, string | JSXElementConstructor<HTMLElement>>
  | ReadonlyArray<ReactNode>;

// Defines a generic type for all available i18n translation keys, by default not using any namespace
export type IntlMessageKeys<
  NestedKey extends NamespaceKeys<Locale, NestedKeyOf<Locale>> = never,
> = MessageKeys<
  NestedValueOf<
    { '!': Locale },
    [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
  >,
  NestedKeyOf<
    NestedValueOf<
      { '!': Locale },
      [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
    >
  >
>;
