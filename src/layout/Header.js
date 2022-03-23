// REACT
import React from 'react';
// PACKAGES
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import i18n from '../i18n';
// HELPERS
import themeableClassName from '../helpers/themeableClassName';
// ASSETS
import logo from '../logo.svg';
// STYLES
import '../stylesheets/Header.scss';

export default function Header(props) {
    var { handleThemeToggle } = props;
    const currentTheme = useTheme();

    return (
        <header className={themeableClassName('header', currentTheme)}>
            <div className='header__contents'>
                <a href='/' className={themeableClassName('header__logo', currentTheme)}>
                    <img src={logo} alt='logo' />
                </a>
                <div className='header__title'>{i18n.t('Available Parking')}</div>
            </div>
            <IconButton
                onClick={() => handleThemeToggle(currentTheme)}
                data-testid='theming-button'
            >
                {currentTheme.themeToggleIcon}
            </IconButton>
        </header>
    )
}