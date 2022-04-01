// REACT
import React from 'react'
// PACKAGES
import i18n from '../i18n'
import { useTheme } from '@mui/material/styles'
// HELPERS
import themeableClassName from '../helpers/themeableClassName'
// STYLESHEETS
import '../stylesheets/Footer.scss'

function goToCharts() {
  window.location.pathname = '/'
}

function goToEditProfile() {
  window.location.pathname = '/profile'
}

function logout() {
  localStorage.removeItem('jwt')

  goToCharts()
}

export default function Footer(props) {
    var { toggleShowLogin } = props
    const currentTheme = useTheme()

    return (
      <footer>
        <div className='nav-bar'>
          {localStorage.getItem('jwt') ?
            <div>
              <button onClick={() => goToCharts()}>{i18n.t('View Charts')}</button> |
              <button onClick={() => goToEditProfile()}>{i18n.t('Edit Profile')}</button> |
              <button onClick={() => logout()}>{i18n.t('Sign out')}</button>
            </div>
            :
            <button onClick={() => toggleShowLogin()}>{i18n.t('Sign in')}</button>
          }
        </div>
        <div className={themeableClassName('lang-select', currentTheme)}>
          <hr />
          <button onClick={() => i18n.changeLanguage('en-US')} data-testid='button-to-en'>English</button>|
          <button onClick={() => i18n.changeLanguage('fr-CA')} data-testid='button-to-fr'>Français</button>|
          <button onClick={() => i18n.changeLanguage('es-MX')} data-testid='button-to-es'>Español</button>
        </div>
      </footer>
    )
}
