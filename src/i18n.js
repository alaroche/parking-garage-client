import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  'en-US': {
    translation: {
      "Available Parking": "Available Parking",
      "Available": "Available",
      "Taken": "Taken",
    }
  },
  'fr-CA': {
    translation: {
      "Available Parking": "Stationnement",
      "Available": "Disponible",
      "Taken": "Pris",
    }
  },
  'es-MX': {
    translation: {
      "Available Parking": "Estacionamiento",
      "Available": "Disponsible",
      "Taken": "Tomado",
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