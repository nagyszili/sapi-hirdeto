import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { RadioRowComponent } from '../../components/Buttons/RadioRowComponent';
import { useSort } from '../../hooks/useSort';
import * as Color from '../../utils/theme/colors';
import { ModalCommonProps } from '../types';

export const SortModal: React.FC<ModalCommonProps> = ({
  setTitle,
  hideModal,
}) => {
  React.useLayoutEffect(() => {
    setTitle(texts['sort']);
  }, []);

  const { setSelectedElement, getSelectedElement, elements } = useSort();

  const onPress = (value: string) => {
    setSelectedElement(value);
    hideModal && hideModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {elements.map((element, key) => (
          <RadioRowComponent
            key={key}
            onPress={() => onPress(element.value)}
            text={element.label}
            isSelected={getSelectedElement() === element.value}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: Color.greyLightColor,
  },
  content: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
