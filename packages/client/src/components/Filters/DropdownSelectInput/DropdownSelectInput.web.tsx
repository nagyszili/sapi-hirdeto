import * as React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';

import { useComponentVisible } from '../../../hooks/useComponentVisible';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { DropDown } from '../../DropDown/DropDown.web';
import { Row } from '../../DropDown/Row';
import { Text } from '../../themed/Text';
import { SelectInputProps } from '../Select/SelectInput.props';

export const DropdownSelectInput: React.FC<SelectInputProps> = ({
  label,
  labelStyle,
  elements,
  selectedElement,
  setSelectedElement,
  placeholder,
}) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();

  const onPress = (value: string) => {
    setSelectedElement(value);
    setIsComponentVisible(false);
  };

  return (
    <View style={styles.container} ref={ref}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View>
        <Pressable
          style={styles.component}
          onPress={() => setIsComponentVisible((oldValue) => !oldValue)}
        >
          <Text style={styles.elementLabel} numberOfLines={1}>
            {elements.find((element) => element.value === selectedElement)
              ?.label || placeholder}
          </Text>
          <Icon name="sort" style={styles.icon} />
        </Pressable>

        {isComponentVisible && (
          <DropDown style={styles.dropDown}>
            {elements.map((element, key) => (
              <Row
                key={key}
                showBottomLine={elements.length > key + 1}
                text={element.label}
                onPress={() => onPress(element.value)}
              />
            ))}
          </DropDown>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: Color.greyDarkColor,
    marginBottom: 7,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 47,
  },
  component: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    height: 46,
    width: 220,
    borderRadius: 6,
    borderColor: Color.greyColor,
    borderWidth: 1,
    backgroundColor: Color.whiteColor,
  },
  elementLabel: {
    marginRight: 12,
    fontSize: 15,
    color: Color.greyDarkColor,
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  },
  icon: {
    color: Color.greyMediumColor,
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  },
  dropDown: {
    top: 46,
    overflow: 'hidden',
  },
});
