import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Icon } from '../../utils/icons';
import { blackColor, whiteColor } from '../../utils/theme/colors';

interface Props {
  onPress?: () => void;
}

export const HeaderBackButton: React.FC<Props> = ({ onPress }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => (onPress ? onPress() : navigation.goBack())}
    >
      <Icon name="arrow-left" color={blackColor} size={22} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: whiteColor,
    borderRadius: 100,
  },
});
