import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { secondaryColor, primaryColor } from '../../utils/theme/colors';
import { Text } from '../themed/Text';

export const HomeHeader: React.FC<{}> = () => {
  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.logo} semiBold white>
        {texts['projectName']}
      </Text>
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
    fontSize: 30,
    marginTop: 15,
  },
});
