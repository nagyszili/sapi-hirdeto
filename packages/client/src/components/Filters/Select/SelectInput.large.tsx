import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Select from 'react-select';

import texts from '../../../../assets/texts/texts.json';
import * as Color from '../../../utils/theme/colors';
import { InputError } from '../../InputError';
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
  error,
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
        value={getSelectedElement() || elements[0]}
        placeholder={placeholder}
        components={{ DropdownIndicator }}
        styles={getCustomStyles(!!error)}
        onChange={handleChange}
        options={elements}
        noOptionsMessage={() => texts['noMatch']}
      />
      <InputError error={error} />
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

const getCustomStyles = (isError?: boolean) => ({
  option: (provided: any, state: any) => ({
    ...provided,
    height: 46,
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
    cursor: 'pointer',
    borderBottomColor: Color.greyColor,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
  }),
  control: (provided: any) => ({
    ...provided,
    flex: 1,
    height: 46,
    width: '100%',
    borderRadius: 6,
    borderColor: isError ? Color.errorColor : Color.greyColor,
    ':hover': {
      borderColor: isError ? Color.errorColor : Color.greyColor,
    },
    ':focus': {
      borderColor: isError ? Color.errorColor : Color.greyColor,
    },
    boxShadow: 'none',
    zIndex: 1,
    cursor: 'pointer',
  }),
  menu: (provided: any) => ({
    ...provided,
    overflow: 'hidden',
    margin: 0,
    borderRadius: 6,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
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
  indicatorSeparator: () => ({}),
});
