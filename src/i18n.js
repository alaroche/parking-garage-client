import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const resources = {
  'en-US': {
    translation: {
      'Address 1': 'Address 1',
      'Address 2': 'Address 2',
      'Available': 'Available',
      'Available Parking': 'Available Parking',
      'City': 'City',
      'Email Address': 'Email Address',
      'Loading': 'Loading...',
      'login_failed': 'Login failed',
      'Name of Garage': 'Name of Garage',
      'Password': 'Password',
      'Service unavailable': 'Service unavailable',
      'Sign in': 'Sign in',
      'State': 'State',
      'Taken': 'Taken',
      'Username': 'Username',
      'Zip Code': 'Zip Code',
    }
  },
  'fr-CA': {
    translation: {
      'Address 1': 'Adresse 1',
      'Address 2': 'Adresse 2',
      'Available': 'Disponible',
      'Available Parking': 'Stationnement',
      'City': 'Ville',
      'Email Address': 'Adresse e-mail',
      'Loading': 'Chargement...',
      'login_failed': 'Échec de la connexion',
      'Name of Garage': 'Nom du garage',
      'Password': 'Mot de passe',
      'Service unavailable': 'Service indisponible',
      'Sign in': 'S\'identifier',
      'State': 'État',
      'Taken': 'Pris',
      'Username': 'Nom d\'utilisateur',
      'Zip Code': 'Code postal',
    }
  },
  'es-MX': {
    translation: {
      'Address 1': 'Dirección 1',
      'Address 2': 'Dirección 2',
      'Available': 'Disponsible',
      'Available Parking': 'Estacionamiento',
      'City': 'Ciudad',
      'Email Address': 'Dirección de correo electrónico',
      'Loading': 'Cargando...',
      'login_failed': 'error de inicio de sesion',
      'Name of Garage': 'Nombre del garaje',
      'Password': 'Clave',
      'Service unavailable': 'Servicio no disponible',
      'Sign in': 'Registrarse',
      'State': 'Estado',
      'Taken': 'Tomado',
      'Username': 'Nombre de usuario',
      'Zip Code': 'Código postal',
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