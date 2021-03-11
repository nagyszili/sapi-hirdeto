import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Icon } from '../utils/icons';
import { primaryColor } from '../utils/theme/colors';

interface Props {
  title?: string | React.ReactElement<{}>;
  onSelect: () => void;
  selected: boolean;
}

export const CheckBoxComponent: React.FC<Props> = ({
  title,
  onSelect,
  selected,
}) => {
  return (
    <CheckBox
      containerStyle={styles.checkboxContainer}
      checked={selected}
      title={title}
      activeOpacity={1}
      onPress={onSelect}
      checkedColor={primaryColor}
      checkedIcon={
        <Icon name="checkbox-checked" size={24} color={primaryColor} />
      }
      uncheckedIcon={
        <Icon name="checkbox-unchecked" size={24} color={primaryColor} />
      }
    />
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    height: 20,
  },
});
