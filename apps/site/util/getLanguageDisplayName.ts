import { LANGUAGES } from '@/shiki.config.mjs';

export const getLanguageDisplayName = (language: string): string => {
  const languageByIdOrAlias = LANGUAGES.find(
    ({ name, aliases }) =>
      name.toLowerCase() === language.toLowerCase() ||
      (aliases !== undefined && aliases.includes(language.toLowerCase()))
  );

  return languageByIdOrAlias?.displayName ?? language;
};
