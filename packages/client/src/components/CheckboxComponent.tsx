import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Icon } from '../utils/icons';

interface Props {
  name: string;
  onSelect: () => void;
  selected: boolean;
}

export const CheckBoxComponent: React.FC<Props> = ({
  name,
  onSelect,
  selected,
}) => {
  return (
    <View style={styles.container}>
      <CheckBox
        checked={selected}
        title={name}
        activeOpacity={1}
        onPress={onSelect}
        checkedColor="gray"
        checkedIcon={<Icon name="checkbox-checked" size={24} color="gray" />}
        uncheckedIcon={
          <Icon name="checkbox-unchecked" size={24} color="gray" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
