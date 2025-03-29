import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ru from './ru';
import tk from './tk';
import tr from './tr';

i18n.use(initReactI18next).init({
    resources: {
        en,
        ru,
        tk,
        tr
    },
    lng: "tr", // Default language
    fallbackLng: "tr", // Fallback language
    interpolation: { escapeValue: false }
});

export default i18n;