import { Theme } from '@react-navigation/native';

import { primaryColor, whiteColor, greyDarkColor } from './colors';

export const LightTheme: Theme = {
  dark: true,
  colors: {
    primary: primaryColor,
    background: whiteColor,
    text: greyDarkColor,
    border: 'rgb(216, 216, 216)',
    card: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 59, 48)',
  },
};

export const DarkTheme: Theme = {
  dark: false,
  colors: {
    primary: '#FB8C00',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
