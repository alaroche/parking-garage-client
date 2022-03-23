// REACT
import React from 'react';
// PACKAGES
import i18n from '../i18n';
import { useTheme } from '@mui/material/styles';
// HELPERS
import themeableClassName from '../helpers/themeableClassName';
// STYLESHEETS
import '../stylesheets/Footer.scss';

function goToCharts() {
  window.location.pathname = '/'
}

function goToEditProfile() {
  window.location.pathname = '/user-profile'
}

function logout() {
  localStorage.removeItem('jwt')
  localStorage.removeItem('username')

  goToCharts()
}

export default function Footer(props) {
    const currentTheme = useTheme();
    var { toggleShowLogin } = props;

    var username = localStorage.getItem('username')
    var jwt = localStorage.getItem('jwt')

    return (
      <footer>
        <div className='nav-bar'>
          {username && jwt ?
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
