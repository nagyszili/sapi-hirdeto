import * as React from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';

import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';

interface Props {
  style?: ViewStyle;
  iconSize?: number;
  onPress?: () => void;
}

export const FloatingActionButton: React.FC<Props> = ({
  style,
  iconSize,
  onPress,
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Icon name="whatsapp" color={Color.whiteColor} size={iconSize || 45} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#41C352',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 62,
    height: 62,
    shadowColor: 'rgba(65, 195, 82, 0.45)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});
