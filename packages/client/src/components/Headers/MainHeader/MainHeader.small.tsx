import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { whiteColor } from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { MainHeaderProps } from './MainHeader.props';

export const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} black semiBold>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: whiteColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    position: 'absolute',
    bottom: 16,
  },
});
