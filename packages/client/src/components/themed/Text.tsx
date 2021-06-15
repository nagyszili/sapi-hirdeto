import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet,
  Text as DefaultText,
  TextProps as DefaultTextProps,
} from 'react-native';

import * as Color from '../../utils/theme/colors';

interface FontWeight {
  regular?: boolean;
  semiBold?: boolean;
  bold?: boolean;
}

interface FontSize {
  extraSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
}

interface FontStyle {
  italic?: boolean;
  underline?: boolean;
}

interface FontColor {
  white?: boolean;
  black?: boolean;
  greyMedium?: boolean;
  greyDark?: boolean;
  errorColor?: boolean;
}

interface TextTransform {
  upperCase?: boolean;
  lowerCase?: boolean;
  capitalize?: boolean;
}

export interface TextProps
  extends FontWeight,
    FontSize,
    FontStyle,
    FontColor,
    TextTransform,
    DefaultTextProps {}

export const Text: React.FC<TextProps> = (props: TextProps) => {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();

  const customStyles = (Object.keys(otherProps) as (keyof typeof styles)[])
    .filter((key) => key in styles)
    .map((key) => styles[key]);

  return (
    <DefaultText
      style={[{ color: colors.text }, ...customStyles, style]}
      {...otherProps}
    />
  );
};

export const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Inter-Regular',
  },
  semiBold: {
    fontFamily: 'Inter-SemiBold',
  },
  bold: {
    fontFamily: 'Inter-Bold',
  },
  extraSmall: {
    fontSize: 12,
  },
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
  extraLarge: {
    fontSize: 20,
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  lowerCase: {
    textTransform: 'lowercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  white: {
    color: Color.whiteColor,
  },
  black: {
    color: Color.blackColor,
  },
  greyMedium: {
    color: Color.greyMediumColor,
  },
  greyDark: {
    color: Color.greyDarkColor,
  },
  errorColor: {
    color: Color.errorColor,
  },
});
