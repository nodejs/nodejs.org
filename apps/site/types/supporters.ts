export type Supporter<T extends string> = {
  name: string;
  image: string;
  url: string;
  profile: string;
  source: T;
};

export type OpenCollectiveSupporter = Supporter<'opencollective'>;
