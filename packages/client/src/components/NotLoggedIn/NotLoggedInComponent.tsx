import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { showLoginModal } from '../../apollo/ui/modalMutations';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { Button } from '../Buttons/Button';
import { Text } from '../themed/Text';

export const NotLoggedInComponent: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="my-profile" size={40} />
      </View>
      <View style={styles.textContainer}>
        <Text extraLarge black style={styles.largeText}>
          {texts['notLoggedIn']}
        </Text>
        <Text style={styles.smallText} extraSmall greyDark>
          {texts['pleaseLogin']}
        </Text>
      </View>

      <Button
        onPress={() => showLoginModal()}
        text={texts['login']}
        style={styles.button}
        textStyle={styles.buttonText}
      />
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
  smallText: {
    textAlign: 'center',
  },
  textContainer: {
    width: '70%',
    alignItems: 'center',
    marginBottom: 32,
  },
  button: {
    width: 242,
    height: 46,
  },
  buttonText: {
    fontSize: 15,
  },
});
