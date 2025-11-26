import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { welcome: 'Welcome', login: 'Login', enroll: 'Enroll Worker' } },
  hi: { translation: { welcome: 'स्वागत है', login: 'लॉग इन', enroll: 'कर्मचारी पंजीकृत करें' } }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
