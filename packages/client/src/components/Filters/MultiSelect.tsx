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
      defaultValue={[]}
      multipleText="%d item selected"
      containerStyle={styles.containerStyle}
      itemStyle={styles.itemStyle}
      onChangeItem={(item) => {
        setSelectedElements(item);
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    margin: 5,
  },
  placeholderStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
});
