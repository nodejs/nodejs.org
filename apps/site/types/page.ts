type RouteParams = Record<string, string | Array<string>>;

export type DynamicStaticPaths<T extends RouteParams = RouteParams> = T & {
  locale: string;
};

export type DynamicParams<T extends RouteParams = RouteParams> = {
  params: Promise<DynamicStaticPaths<T>>;
};
