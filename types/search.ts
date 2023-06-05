export type SearchResult = {
  id: React.Key | null | undefined;
  slug: string;
  title: string;
  category: string;
  displayTitle?: string | JSX.Element;
  wrapInCode?: boolean;
};

export type SearchFunction = (
  query: string
) => SearchResult[] | Promise<SearchResult[]>;
