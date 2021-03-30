import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Select from 'react-select';

import texts from '../../../../assets/texts/texts.json';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { DropdownIndicator } from './DropdownIndicator';
import { SelectInputProps } from './SelectInput.props';

export const SelectInput: React.FC<SelectInputProps> = ({
  selectedElement,
  elements,
  setSelectedElement,
  placeholder,
  label,
  isSearchable,
}) => {
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedElement(selectedOption.value);
    }
  };

  const getSelectedElement = () => {
    const element = elements.find(
      (element) =>
        JSON.stringify(element.value) === JSON.stringify(selectedElement)
    );

    if (selectedElement !== undefined && !element) {
      setSelectedElement(elements[0].value);
      return elements[0];
    }
    return element;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Select
        isDisabled={elements.length <= 1}
        defaultValue={elements[0]}
        isSearchable={!!isSearchable}
        value={getSelectedElement()}
        placeholder={placeholder}
        components={{ DropdownIndicator }}
        styles={customStyles}
        onChange={handleChange}
        options={elements}
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
    zIndex: 1,
  }),
  menuPortal: (provided: any) => ({
    ...provided,
  }),
  menu: (provided: any) => ({
    ...provided,
    overflow: 'hidden',
    margin: 0,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    paddingLeft: 10,
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    color: Color.greyDarkColor,
    opacity: '70%',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    paddingTop: 10,
  }),

  placeholder: () => ({
    color: Color.greyMediumColor,
    opacity: '70%',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  }),

  singleValue: () => ({
    color: Color.greyDarkColor,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  }),
};
