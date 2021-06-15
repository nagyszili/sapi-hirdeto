import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { whiteColor, greyColor } from '../../utils/theme/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const DropDown: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    position: 'absolute',
    top: 57,
    left: 0,
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 5,
    zIndex: 99999,
    borderColor: greyColor,
    borderWidth: 1,
    width: '100%',
  },
});
