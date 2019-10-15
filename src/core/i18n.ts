import NextI18Next from 'next-i18next';
import { config } from '@app/config';

const otherLanguages = config.languages
  .filter((language) => language.code !== config.defaultLanguage)
  .map((language) => language.code);
const localeSubpaths: { [code: string]: string } = {};
otherLanguages.forEach((language) => {
  localeSubpaths[language] = language;
});
const { defaultLanguage } = config;
export const nextI18next = new NextI18Next({
  defaultLanguage,
  otherLanguages,
  localeSubpaths,
});

/* Optionally, export class methods as named exports */
export const { appWithTranslation, withTranslation, i18n } = nextI18next;
