import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { ImageComponent } from '../../utils/images';
import { secondaryColor, primaryColor } from '../../utils/theme/colors';

export const HomeHeader: React.FC<{}> = () => {
  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ImageComponent name="white-logo" style={styles.logo} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
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
