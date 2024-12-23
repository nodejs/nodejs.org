import type { ClientSharedServerContext } from '@/types';

export const assignClientContext = <T extends ClientSharedServerContext>(
  props: Partial<T>
) =>
  ({
    frontmatter: props.frontmatter ?? {},
    pathname: props.pathname ?? '',
    headings: props.headings ?? [],
    readingTime: props.readingTime ?? {
      text: '',
      minutes: 0,
      time: 0,
      words: 0,
    },
    filename: props.filename ?? '',
    os: props.os ?? 'OTHER',
    architecture: props.architecture ?? 'x64',
    bitness: props.bitness ?? 64,
  }) as T;
