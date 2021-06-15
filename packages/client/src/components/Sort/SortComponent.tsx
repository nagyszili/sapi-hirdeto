import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { useSort } from '../../hooks/useSort';
import * as Color from '../../utils/theme/colors';
import { DropdownSelectInput } from '../Filters/DropdownSelectInput/DropdownSelectInput.web';

export const SortComponent: React.FC<{}> = () => {
  const { setSelectedElement, getSelectedElement, elements } = useSort();

  return (
    <DropdownSelectInput
      elements={elements}
      setSelectedElement={setSelectedElement}
      selectedElement={getSelectedElement()}
      label={`${texts['sort']}:`}
      labelStyle={styles.webLabel}
    />
  );
};

const styles = StyleSheet.create({
  webLabel: {
    marginRight: 12,
    fontSize: 15,
    color: Color.greyDarkColor,
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  },
});
