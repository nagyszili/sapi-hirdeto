import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface Props {
  text?: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const RadioRowComponent: React.FC<Props> = ({
  text,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text>{text}</Text>
      <View style={[styles.radioButton, isSelected && styles.selectedRadio]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 11,
    marginVertical: 7,
    height: 46,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: Color.greyColor,
    borderWidth: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: Color.whiteColor,
    borderWidth: 1,
    borderColor: Color.greyColor,
  },
  selectedRadio: {
    borderWidth: 6,
    borderColor: Color.primaryColor,
  },
});
