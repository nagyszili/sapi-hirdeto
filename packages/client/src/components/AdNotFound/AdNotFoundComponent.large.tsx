import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

export const AdNotFoundComponent: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="search" size={26} />
      </View>
      <View style={styles.textContainer}>
        <Text extraLarge black style={styles.largeText}>
          {texts['adNotFound']}
        </Text>
        <Text medium greyDark>
          {texts['changeSearchParameters']}
        </Text>
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('AdsScreen', {
            filters: undefined,
            price: undefined,
            location: undefined,
            query: undefined,
          })
        }
        style={styles.reset}
      >
        <Text style={styles.resetText} greyDark>
          {texts['reset']}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 94,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 19,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 32,
  },
  largeText: {
    marginBottom: 4,
  },
  iconContainer: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(228, 228, 228, 0.5)',
  },
  reset: {
    borderRadius: 6,
    height: 38,
    width: 122,
    backgroundColor: Color.greyColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 15,
  },
});
