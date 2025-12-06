export type Supporter = {
  name: string;
  image: string;
  url: string;
  profile: string;
  source: string;
};

export type OpenCollectiveSupporter = Supporter & { source: 'opencollective' };
