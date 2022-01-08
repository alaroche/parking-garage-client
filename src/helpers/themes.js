import { createTheme } from '@mui/material';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import * as colors from '../stylesheets/colors.module.scss';

export const defaultTheme = createTheme({
  className: 'default',
  themeToggleIcon: <Brightness3Icon htmlColor={colors.fontDefault} />,
});

export const darkTheme = createTheme({
  className: 'dark-mode',
  themeToggleIcon: <Brightness7Icon htmlColor={colors.fontDarkMode} />,
});