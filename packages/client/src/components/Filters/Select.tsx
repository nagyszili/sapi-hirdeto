import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { StyleSheet, Platform, ActionSheetIOS, Pressable } from 'react-native';

import { Text } from '../../components/themed/Text';

interface Props {
  elements: Element[];
  selectedElement?: string;
  setSelectedElement: (element: string) => void;
}

interface Element {
  name: string;
  identifier: string;
  id: number;
}

export const Select: React.FC<Props> = ({
  selectedElement,
  elements,
  setSelectedElement,
}) => {
  const showActionSheetIOS = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...elements.map((element) => element.name)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        const iosSelectedElement = elements.find(
          (element) => element.id === buttonIndex - 1,
        );
        iosSelectedElement && setSelectedElement(iosSelectedElement.identifier);
      },
    );

  const elementPickerIOS = () => (
    <Pressable
      onPress={() => {
        showActionSheetIOS();
      }}
    >
      <Text>Element: {selectedElement}</Text>
    </Pressable>
  );

  const elementPicker = () => (
    <Picker
      mode="dropdown"
      selectedValue={selectedElement}
      style={styles.picker}
      onValueChange={(item) => {
        setSelectedElement(item as string);
      }}
    >
      {elements.map((element, key) => (
        <Picker.Item
          key={key}
          label={element.name}
          value={element.identifier}
        />
      ))}
    </Picker>
  );
  return <>{Platform.OS === 'ios' ? elementPickerIOS() : elementPicker()}</>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    height: 50,
    width: 150,
  },
});
