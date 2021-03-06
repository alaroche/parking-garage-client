import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  'en-US': {
    translation: {
      'Address 1': 'Address 1',
      'Address 2': 'Address 2',
      'Available': 'Available',
      'Available Parking': 'Available Parking',
      'City': 'City',
      'Edit Profile': 'Edit Profile',
      'Email Address': 'Email Address',
      'Loading': 'Loading...',
      'login_failed': 'Login failed',
      'Name of Garage': 'Name of Garage',
      'Password': 'Password',
      'ERR_NETWORK': 'Service unavailable',
      'Sign in': 'Sign in',
      'Sign out': 'Sign out',
      'State': 'State',
      'Taken': 'Taken',
      'Username': 'Username',
      'View Charts': 'View Charts',
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
      'Edit Profile': 'Editer le profil',
      'Email Address': 'Adresse e-mail',
      'Loading': 'Chargement...',
      'login_failed': 'Échec de la connexion',
      'Name of Garage': 'Nom du garage',
      'Password': 'Mot de passe',
      'ERR_NETWORK': 'Service indisponible',
      'Sign in': 'S\'identifier',
      'Sign out': 'Se déconnecter',
      'State': 'État',
      'Taken': 'Pris',
      'Username': 'Nom d\'utilisateur',
      'View Charts': 'Afficher les graphiques',
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
      'Edit Profile': 'Editar perfil',
      'Email Address': 'Dirección de correo electrónico',
      'Loading': 'Cargando...',
      'login_failed': 'error de inicio de sesion',
      'Name of Garage': 'Nombre del garaje',
      'Password': 'Clave',
      'ERR_NETWORK': 'Servicio no disponible',
      'Sign in': 'Registrarse',
      'Sign out': 'Desconectar',
      'State': 'Estado',
      'Taken': 'Tomado',
      'Username': 'Nombre de usuario',
      'View Charts': 'Ver gráficos',
      'Zip Code': 'Código postal',
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