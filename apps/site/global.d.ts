import type baseMessages from '@node-core/website-i18n/locales/en.json';
import type { MessageKeys, NestedValueOf, NestedKeyOf } from 'next-intl';

declare global {
  // Defines a type for all the IntlMessage shape (which is used internall by next-intl)
  // @see https://next-intl.dev/docs/workflows/typescript
  type IntlMessages = typeof baseMessages;

  // Defines a generic type for all available i18n translation keys, by default not using any namespace
  type IntlMessageKeys<
    NestedKey extends NamespaceKeys<
      IntlMessages,
      NestedKeyOf<IntlMessages>
    > = never,
  > = MessageKeys<
    NestedValueOf<
      { '!': IntlMessages },
      [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
    >,
    NestedKeyOf<
      NestedValueOf<
        { '!': IntlMessages },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >
    >
  >;
}

export {};
