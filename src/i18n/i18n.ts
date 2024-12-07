import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

interface SupportedLanguage {
    locale: string
    name: string
}

export const supportedLanguages: SupportedLanguage[] = [
    {
        locale: 'en',
        name: 'English',
    },
    {
        locale: 'zh-CN',
        name: '简体中文',
    },
    {
        locale: 'zh-TW',
        name: '繁体中文',
    }
]

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        load: 'currentOnly',
        supportedLngs: supportedLanguages.map(supportedLanguage => supportedLanguage.locale),
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;