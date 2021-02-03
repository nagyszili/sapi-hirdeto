import * as React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  elements: {
    label: any;
    value: any;
    icon?: () => JSX.Element;
    hidden?: boolean;
    disabled?: boolean;
    selected?: boolean;
  }[];
  selectedElements?: string[];
  setSelectedElements: (elements: string[]) => void;
}

export const MultiSelect: React.FC<Props> = ({
  elements,
  setSelectedElements,
}) => {
  return (
    <DropDownPicker
      placeholderStyle={styles.placeholderStyle}
      items={elements}
      multiple
      multipleText="%d items have been selected."
      defaultValue={[]}
      containerStyle={{ height: 40 }}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      onChangeItem={(item) => {
        setSelectedElements(item);
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  placeholderStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
