import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface Props {
  numberOfImages?: number | string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const NumberOfImagesComponent: React.FC<Props> = ({
  numberOfImages,
  containerStyle,
}) => {
  return (
    <LinearGradient
      colors={[Color.secondaryColor, Color.primaryColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.imageIconContainer, containerStyle]}
    >
      <Icon name="camera" size={18} color={Color.whiteColor} />
      <Text semiBold style={styles.imageIconText}>
        {numberOfImages}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageIconContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 5,
    width: 45,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIconText: {
    color: Color.whiteColor,
    fontSize: 13,
    marginLeft: 4,
  },
});
