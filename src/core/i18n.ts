import NextI18Next from 'next-i18next';
import { config } from '@app/config';

const otherLanguages = config.i18n.languages
  .filter((language) => language.code !== config.i18n.defaultLang)
  .map((language) => language.code);
const localeSubpaths: { [code: string]: string } = {};
otherLanguages.forEach((language) => {
  localeSubpaths[language] = language;
});
export const nextI18next = new NextI18Next({
  defaultLanguage: config.i18n.defaultLang,
  otherLanguages,
  localeSubpaths,
});

/* Optionally, export class methods as named exports */
export const { appWithTranslation, withTranslation, i18n } = nextI18next;
