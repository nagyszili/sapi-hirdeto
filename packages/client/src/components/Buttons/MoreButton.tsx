import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';

interface Props {
  onPress?: () => void;
}

export const MoreButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon name="more" color={Color.primaryColor} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Color.greyColor,
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
