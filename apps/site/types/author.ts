export interface AuthorProps {
  names?: Array<string>;
  usernames?: Array<string>;
  clickable?: boolean;
  container?: HTMLElement | null;
}

export interface Author {
  id: string;
  name: string;
  website?: string;
}
