import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, ActionSheetIOS, Pressable, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { SelectInputProps } from './SelectInput.props';

export const SelectInput: React.FC<SelectInputProps> = ({
  selectedElement,
  elements,
  label,
  setSelectedElement,
}) => {
  const navigation = useNavigation();

  const showActionSheetIOS = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...elements.map((element) => element.label)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        const iosSelectedElement = elements.find(
          (_, index) => index === buttonIndex - 1
        );
        iosSelectedElement && setSelectedElement(iosSelectedElement.value);
      }
    );

  const iosPicker = () => (
    <Pressable style={styles.picker} onPress={() => showActionSheetIOS()}>
      <Text style={styles.pickerText} greyDark>
        {elements.find((element) => element.value === selectedElement)?.label ||
          elements[0].label}
      </Text>
      <Icon name="sort" color={Color.greyMediumColor} />
    </Pressable>
  );

  const androidPicker = () => (
    <RNPickerSelect
      onValueChange={(value) => setSelectedElement(value)}
      items={elements}
      value={selectedElement}
      placeholder={{}}
    >
      <View style={styles.picker}>
        <Text style={styles.pickerText} greyDark>
          {elements.find((element) => element.value === selectedElement)
            ?.label || elements[0].label}
        </Text>
        <Icon name="sort" color={Color.greyMediumColor} />
      </View>
    </RNPickerSelect>
  );

  // return <>{Platform.OS === 'ios' ? iosPicker() : androidPicker()}</>;

  const isDisabled = () => elements.length <= 1;

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.picker, isDisabled() && styles.disabled]}
        disabled={isDisabled()}
        onPress={() => {
          navigation.navigate('FullScreenSelect', {
            elements,
            setSelectedElement,
            selectedElement,
            label,
          });
        }}
      >
        <Text style={styles.pickerText} greyDark>
          {elements.find(
            (element) =>
              JSON.stringify(element.value) === JSON.stringify(selectedElement)
          )?.label || elements[0].label}
        </Text>
        <Icon name="sort" color={Color.greyMediumColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
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
