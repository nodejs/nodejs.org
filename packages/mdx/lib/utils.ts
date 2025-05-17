import GithubSlugger from 'github-slugger';

import { LANGUAGES } from '../shiki.config';

export const createGitHubSlugger = () => {
  const githubSlugger = new GithubSlugger();

  return (text: string) => githubSlugger.slug(text);
};

export const getLanguageDisplayName = (language: string): string => {
  const languageByIdOrAlias = LANGUAGES.find(
    ({ name, aliases }) =>
      name.toLowerCase() === language.toLowerCase() ||
      (aliases !== undefined && aliases.includes(language.toLowerCase()))
  );

  return languageByIdOrAlias?.displayName ?? language;
};
