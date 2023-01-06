import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const resources = {
  'en-US': {
    displayName: 'English',
    isoCode: 'en-US',
    translation: {
      'Available': 'Available',
      'Available Parking': 'Available Parking',
      'Edit Profile': 'Edit Profile',
      'Email Address': 'Email Address',
      'First Name': 'First Name',
      'Garages': 'Garages',
      'Last Name': 'Last Name',
      'Loading': 'Loading...',
      'login_failed': 'Login failed',
      'Name of Garage': 'Name of Garage',
      'Open Garages': 'Open Garages',
      'Password': 'Password',
      'ERR_NETWORK': 'Service unavailable',
      'Sign in': 'Sign in',
      'Sign out': 'Sign out',
      'Taken': 'Taken',
      'Username': 'Username',
      'View Charts': 'View Charts',
    }
  },
  'fr-CA': {
    displayName: 'Français',
    isoCode: 'fr-CA',
    translation: {
      'Available': 'Disponible',
      'Available Parking': 'Stationnement',
      'Edit Profile': 'Editer le profil',
      'Email Address': 'Adresse e-mail',
      'First Name': 'Prénom',
      'Garages': 'Garages',
      'Last Name': 'Nom de famille',
      'Loading': 'Chargement...',
      'login_failed': 'Échec de la connexion',
      'Name of Garage': 'Nom du garage',
      'Open Garages': 'Garages Ouverts',
      'Password': 'Mot de passe',
      'ERR_NETWORK': 'Service indisponible',
      'Sign in': 'S\'identifier',
      'Sign out': 'Se déconnecter',
      'Taken': 'Pris',
      'Username': 'Nom d\'utilisateur',
      'View Charts': 'Afficher les graphiques',
    }
  },
  'es-MX': {
    displayName: 'Español',
    isoCode: 'es-MX',
    translation: {
      'Available': 'Disponsible',
      'Available Parking': 'Estacionamiento',
      'Edit Profile': 'Editar perfil',
      'Email Address': 'Dirección de correo electrónico',
      'First Name': 'Primer nombre',
      'Garages': 'Garajes',
      'Last Name': 'Apellido',
      'Loading': 'Cargando...',
      'login_failed': 'error de inicio de sesion',
      'Name of Garage': 'Nombre del garaje',
      'Open Garages': 'Garajes abiertos',
      'Password': 'Clave',
      'ERR_NETWORK': 'Servicio no disponible',
      'Sign in': 'Registrarse',
      'Sign out': 'Desconectar',
      'Taken': 'Tomado',
      'Username': 'Nombre de usuario',
      'View Charts': 'Ver gráficos',
    }
  }
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n