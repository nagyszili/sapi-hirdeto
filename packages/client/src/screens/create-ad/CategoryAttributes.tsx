import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { AttributeValueInput } from '../../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../../utils/constants';
import { SelectInput } from './SelectInput';

interface Props {
  attributes: AttributeValueInput[];
  selectedCategory: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  setAttributes: React.Dispatch<React.SetStateAction<AttributeValueInput[]>>;
}

export const CategoryAttributes: React.FC<Props> = ({
  selectedCategory,
  setAttributes,
  attributes: selectedAttributes,
}) => {
  return (
    <View key={selectedCategory.id} style={styles.container}>
      {selectedCategory.attributes &&
        selectedCategory.attributes.map((attribute, key) =>
          attribute.type === ATTRIBUTE_TYPES.RANGE ? (
            <TextInput
              key={key}
              placeholder={attribute.title}
              style={styles.inputStyle}
              onChangeText={(value) =>
                setAttributes((oldAttributes) =>
                  oldAttributes.find(
                    (oldAttribute) => oldAttribute.key === attribute.title,
                  )
                    ? oldAttributes.map((oldAttribute) =>
                        oldAttribute.key === attribute.title
                          ? {
                              ...oldAttribute,
                              value: value.replace(/[^0-9]/g, ''),
                            }
                          : oldAttribute,
                      )
                    : [
                        ...oldAttributes,
                        { key: attribute.title, value, type: attribute.type },
                      ],
                )
              }
            />
          ) : attribute.type === ATTRIBUTE_TYPES.CHECKBOX ? (
            <View key={key} />
          ) : (
            <SelectInput
              key={key}
              attribute={attribute}
              selectedAttributes={selectedAttributes}
              setAttributes={setAttributes}
            />
          ),
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 11,
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
});
