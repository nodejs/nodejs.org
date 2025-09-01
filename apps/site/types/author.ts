export type AuthorProps = {
  names?: Array<string>;
  usernames?: Array<string>;
  clickable?: boolean;
  container?: HTMLElement | null;
};

export type Author = {
  id: string;
  name: string;
  website?: string;
};
