import { Language } from '../types/Settings';
import { localeString } from './localeString';

const fallbackLocale: Language = 'en';

function getI18nString(
  userLanguage: Language = 'cn',
  key: string,
  params: { [key: string]: string } = {}
) {
  let translatedString =
    Reflect.get(Reflect.get(localeString, userLanguage), key) ||
    Reflect.get(Reflect.get(localeString, fallbackLocale), key) ||
    key;

  if (0 !== Object.keys(params).length) {
    for (const [key, value] of Object.entries(params)) {
      translatedString = translatedString?.replaceAll(`{${key}}`, value);
    }
  }

  return translatedString;
}

export { getI18nString };
