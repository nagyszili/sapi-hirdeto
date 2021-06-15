import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { ImageComponent } from '../../utils/images';
import { secondaryColor, primaryColor } from '../../utils/theme/colors';

interface Props {
  topNotchSize?: number;
}

export const HomeHeader: React.FC<Props> = ({ topNotchSize }) => {
  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={styles(topNotchSize).container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ImageComponent name="white-logo" style={styles().logo} />
    </LinearGradient>
  );
};

const styles = (topNotchSize?: number) =>
  StyleSheet.create({
    container: {
      minHeight: 60 + (topNotchSize || 0),
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 110,
      height: 31,
      position: 'absolute',
      bottom: 16,
    },
  });
