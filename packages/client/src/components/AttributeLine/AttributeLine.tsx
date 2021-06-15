import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface Props {
  leftText?: string;
  rightText?: string;
  isGrey?: boolean;
  isWhite?: boolean;
  isTop?: boolean;
  isBottom?: boolean;
}

export const AttributeLine: React.FC<Props> = ({
  leftText,
  rightText,
  isGrey,
  isWhite,
  isTop,
  isBottom,
}) => {
  return (
    <View
      style={[
        styles.row,
        isTop && styles.top,
        isGrey && styles.grey,
        isWhite && styles.white,
        isBottom && styles.bottom,
      ]}
    >
      <Text style={styles.greyText} numberOfLines={1}>
        {leftText}
      </Text>
      <Text style={styles.blackText} semiBold numberOfLines={1}>
        {rightText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 38,
  },
  greyText: {
    fontSize: 15,
    color: Color.greyTextColor,
  },
  blackText: {
    fontSize: 15,
    color: Color.blackColor,
  },

  grey: {
    backgroundColor: Color.greyLightColor,
  },
  white: {
    backgroundColor: Color.whiteColor,
  },
  top: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bottom: {
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
});
