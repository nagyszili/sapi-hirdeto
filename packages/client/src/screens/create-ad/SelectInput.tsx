import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes } from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { AttributeValueInput } from '../../apollo/types/graphql-global-types';

interface Props {
  selectedAttributes: AttributeValueInput[];
  attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes;
  setAttributes: React.Dispatch<React.SetStateAction<AttributeValueInput[]>>;
}

export const SelectInput: React.FC<Props> = ({
  attribute,
  setAttributes,
  selectedAttributes,
}) => {
  const getElements = () => {
    let elements: any[] = [];
    if (attribute.dependsBy) {
      const dependentAttr = selectedAttributes.find(
        (selectedAttribute) => selectedAttribute.key === attribute.dependsBy,
      );

      for (const possibleValue of attribute.possibleValues) {
        if (possibleValue.dependingKey === dependentAttr?.value) {
          elements = possibleValue.values.map((value) => ({
            label: value,
            value,
          }));
        }
      }
    } else {
      elements = attribute.possibleValues[0].values.map((value) => ({
        label: value,
        value,
      }));
    }
    return elements;
  };

  attribute.possibleValues.forEach((possibleValue) =>
    possibleValue.dependingKey
      ? possibleValue.values.forEach((value) => ({
          label: value,
          value,
        }))
      : possibleValue.values.forEach((value) => ({
          label: value,
          value,
        })),
  );

  const onSelect = (item: any) => {
    setAttributes((oldAttributes) =>
      oldAttributes.find((oldAttribute) => oldAttribute.key === attribute.title)
        ? oldAttributes.map((oldAttribute) =>
            oldAttribute.key === attribute.title
              ? { ...oldAttribute, value: item.value }
              : oldAttribute,
          )
        : [
            ...oldAttributes,
            { key: attribute.title, value: item.value, type: attribute.type },
          ],
    );
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholderStyle={styles.placeholderStyle}
        items={getElements()}
        containerStyle={styles.containerStyle}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    minWidth: 250,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 6,
  },
  containerStyle: {
    height: 40,
    margin: 5,
  },
  placeholderStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
