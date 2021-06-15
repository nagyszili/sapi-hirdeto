import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

export const AdNotFoundComponent: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="search" size={45} />
      </View>
      <Text extraLarge black style={styles.largeText}>
        {texts['adNotFound']}
      </Text>
      <Text extraSmall greyDark>
        {texts['changeSearchParameters']}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.greyLightColor,
    alignItems: 'center',
    paddingVertical: 69,
  },
  largeText: {
    marginBottom: 4,
  },
  iconContainer: {
    width: 84,
    height: 84,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Color.whiteColor,
  },
});
