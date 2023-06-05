import { search } from '@orama/orama';

import type { Document, Orama, RawData, Schema } from '@orama/orama';
import type { SearchResult } from '../../../types';

export type DocumentMapper = (doc: Document) => SearchResult;

export type OramaSearchBarProps = {
  schema: Schema;
  index: RawData;
  documentMapper?: DocumentMapper;
};

export const identityDocumentMapper = (doc: Document): SearchResult => {
  return doc as unknown as SearchResult;
};

export const performSearch = async (
  database: Orama,
  mapper: DocumentMapper,
  term: string
): Promise<SearchResult[]> => {
  const results = await search(database, { term });

  return results.hits.map(h => mapper(h.document));
};
