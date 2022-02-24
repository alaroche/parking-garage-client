// REACT
import React from 'react';
import { Link } from "react-router-dom";
// PACKAGES
import i18n from '../i18n';
import { useTheme } from '@mui/material/styles';
// HELPERS
import themeableClassName from '../helpers/themeableClassName';
// STYLESHEETS
import '../stylesheets/Footer.scss';

export default function Footer(props) {
    const currentTheme = useTheme();
    var { toggleShowLogin } = props;

    var username = localStorage.getItem('username')

    return (
      <footer className={themeableClassName('footer-nav', currentTheme)}>
        <div className={themeableClassName('lang-select', currentTheme)}>
          <hr />
          <button onClick={() => i18n.changeLanguage('en-US')} data-testid='button-to-en'>English</button>|
          <button onClick={() => i18n.changeLanguage('fr-CA')} data-testid='button-to-fr'>Français</button>|
          <button onClick={() => i18n.changeLanguage('es-MX')} data-testid='button-to-es'>Español</button>
        </div>
        {username ? 
          <Link className='profile-link' to='/user-profile'>{i18n.t('Edit Profile')}</Link>
        :
          <div className='profile-link'><button onClick={() => toggleShowLogin()}>{i18n.t('Sign in')}</button></div>
        }
      </footer>
    )
}
