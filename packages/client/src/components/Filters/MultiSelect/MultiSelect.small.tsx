import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { MultiSelectProps } from './MultiSelect.props';

export const MultiSelect: React.FC<MultiSelectProps> = ({
  elements,
  setSelectedElements,
  selectedElements,
  label,
  labelStyle,
}) => {
  const navigation = useNavigation();

  const isDisabled = () => elements.length <= 1;

  const handleChange = (selectedValues: any) => {
    if (selectedValues) {
      setSelectedElements(selectedValues);
    }
  };

  const getSelectedElements = () => {
    const isAllInElements = selectedElements?.every((selectedElement) =>
      elements?.some((element) => selectedElement.value === element.value)
    );

    if (selectedElements !== undefined && !isAllInElements) {
      handleChange([]);
      return [];
    }
    return selectedElements;
  };

  return (
    <View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <Pressable
        style={[styles.picker, isDisabled() && styles.disabled]}
        disabled={isDisabled()}
        onPress={() => {
          navigation.navigate('FullScreenMultiSelect', {
            elements,
            setSelectedElements,
            selectedElements,
            label,
          });
        }}
      >
        <Text
          style={styles.pickerText}
          greyDark
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {getSelectedElements().length > 0
            ? getSelectedElements().map((element, index) =>
                index + 1 < getSelectedElements().length
                  ? `${element.label}, `
                  : `${element.label}`
              )
            : elements[0].label}
        </Text>
        <Icon name="sort" color={Color.greyMediumColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
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
