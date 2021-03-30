import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Select from 'react-select';

import texts from '../../../../assets/texts/texts.json';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { DropdownIndicator } from '../Select/DropdownIndicator';
import { MultiSelectProps } from './MultiSelect.props';

export const MultiSelect: React.FC<MultiSelectProps> = ({
  elements,
  placeholder,
  setSelectedElements,
  selectedElements,
  label,
}) => {
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedElements(selectedOption);
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
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Select
        isDisabled={elements.length <= 1}
        defaultValue={elements[0]}
        value={getSelectedElements()}
        placeholder={placeholder}
        components={{ DropdownIndicator }}
        styles={customStyles}
        onChange={handleChange}
        options={elements}
        isMulti
        closeMenuOnSelect={false}
        noOptionsMessage={() => texts['noMatch']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  label: {
    fontSize: 15,
    color: Color.greyDarkColor,
    marginBottom: 7,
  },
});

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? Color.greyLightColor : Color.whiteColor,
    ':hover': {
      backgroundColor: Color.greyLightColor,
    },
    ':focus': {
      backgroundColor: Color.greyLightColor,
    },
    color: Color.greyDarkColor,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  }),
  control: (provided: any) => ({
    ...provided,
    flex: 1,
    height: 46,
    width: '100%',
    borderColor: Color.greyColor,
    ':hover': {
      borderColor: Color.greyColor,
    },
    ':focus': {
      borderColor: Color.greyColor,
    },
    boxShadow: 'none',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    paddingLeft: 10,
    flexWrap: 'no-wrap',
    overflow: 'hidden',
  }),
  menu: (provided: any) => ({
    ...provided,
    overflow: 'hidden',
    margin: 0,
  }),

  placeholder: () => ({
    color: Color.greyDarkColor,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  }),
  singleValue: () => ({
    color: Color.greyDarkColor,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  }),
};
