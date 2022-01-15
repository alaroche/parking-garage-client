import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-US': {
    translation: {
      'Available': 'Available',
      'Available Parking': 'Available Parking',
      'Loading': 'Loading...',
      'Service unavailable': 'Service unavailable',
      'Taken': 'Taken',
    }
  },
  'fr-CA': {
    translation: {
      'Available': 'Disponible',
      'Available Parking': 'Stationnement',
      'Loading': 'Chargement...',
      'Service unavailable': 'Service indisponible',
      'Taken': 'Pris',
    }
  },
  'es-MX': {
    translation: {
      'Available': 'Disponsible',
      'Available Parking': 'Estacionamiento',
      'Loading': 'Cargando...',
      'Service unavailable': 'Servicio no disponible',
      'Taken': 'Tomado',
    }
  }
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;