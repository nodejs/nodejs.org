import { Highlight } from '@orama/highlight';
import { OramaClient } from '@oramacloud/client';

export const orama = new OramaClient({
  endpoint: process.env.NEXT_PUBLIC_ORAMA_ENDPOINT!,
  api_key: process.env.NEXT_PUBLIC_ORAMA_API_KEY!,
});

orama.startHeartBeat({ frequency: 3500 });

export const highlighter = new Highlight({
  CSSClass: 'font-bold dark:text-neutral-800',
  HTMLTag: 'span',
});
