import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { InputError } from '../../InputError';
import { Text } from '../../themed/Text';
import { SelectInputProps } from './SelectInput.props';

export const SelectInput: React.FC<SelectInputProps> = ({
  selectedElement,
  elements,
  label,
  labelStyle,
  setSelectedElement,
  error,
}) => {
  const navigation = useNavigation();

  const isDisabled = () => elements.length <= 1;

  return (
    <View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Pressable
        style={[
          styles.picker,
          !!error && { borderColor: Color.errorColor },
          isDisabled() && styles.disabled,
        ]}
        disabled={isDisabled()}
        onPress={() =>
          navigation.navigate('FullScreenSelect', {
            elements,
            setSelectedElement,
            selectedElement,
            label,
          })
        }
      >
        <Text style={styles.pickerText} greyDark>
          {elements.find(
            (element) =>
              JSON.stringify(element.value) === JSON.stringify(selectedElement)
          )?.label || elements[0].label}
        </Text>
        <Icon name="sort" color={Color.greyMediumColor} />
      </Pressable>
      <InputError error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    backgroundColor: Color.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 46,
    paddingLeft: 10,
    paddingRight: 15,
    borderColor: Color.greyColor,
    borderWidth: 1,
    borderRadius: 6,
  },
  pickerText: {
    fontSize: 15,
  },
  pickerIcon: {
    paddingRight: 15,
  },
  label: {
    fontSize: 15,
    color: Color.greyDarkColor,
    marginBottom: 7,
  },
  disabled: {
    backgroundColor: Color.greyLightColor,
  },
});
