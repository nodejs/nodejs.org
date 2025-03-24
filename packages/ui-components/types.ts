import type { LocaleConfig } from '@node-core/website-i18n/types';
import type {
  SVGProps,
  AnchorHTMLAttributes,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
} from 'react';

export type LogoVariant = 'default' | 'pride';
export type TailwindSVG = SVGProps<SVGSVGElement> & { tw?: string };
export type BlogPreviewType = 'announcements' | 'release' | 'vulnerability';
export type LinkLike =
  | JSXElementConstructor<AnchorHTMLAttributes<HTMLAnchorElement>>
  | 'a';

export type FormattedMessage =
  | string
  | ReactElement<HTMLElement, string | JSXElementConstructor<HTMLElement>>
  | ReadonlyArray<ReactNode>;

export type SimpleLocaleConfig = Pick<
  LocaleConfig,
  'name' | 'code' | 'localName'
>;
