import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import {
  AdByIdentifier_findAdByIdentifier,
  AdByIdentifier_findAdByIdentifier_attributeValues,
} from '../../apollo/types/AdByIdentifier';
import { Filter } from '../../apollo/types/graphql-global-types';
import { attributeName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../utils/constants';
import * as Color from '../../utils/theme/colors';
import { HoverText } from '../themed/HoverText';
import { Text } from '../themed/Text';

interface Props {
  ad: AdByIdentifier_findAdByIdentifier;
}

export const AdAttributeTable: React.FC<Props> = ({ ad }) => {
  const navigation = useNavigation();

  const getFilter = (
    attribute: AdByIdentifier_findAdByIdentifier_attributeValues
  ) => {
    const attr = ad.category.attributes.find(
      (_attr) => _attr.title === attribute.key
    );
    if (attr && attr.type !== ATTRIBUTE_TYPES.RANGE) {
      const filter: Filter = {
        type: attr.type,
        name: attr.title,
        selectedAttributeValues: [attribute.value],
      };
      return filter;
    }
  };

  return (
    <View style={styles.attributesTable}>
      {ad.attributeValues?.map((attribute, index) => (
        <View
          key={index}
          style={[
            styles.attributeRow,
            {
              backgroundColor:
                index % 2 === 0 ? Color.greyLightColor : Color.whiteColor,
            },
          ]}
        >
          <Text style={styles.attributeLabe}>
            {attributeName(attribute.key)}
          </Text>
          <View>
            <HoverText
              disabled={!getFilter(attribute)}
              disableHover={!getFilter(attribute)}
              onPress={() =>
                navigation.navigate('AdsScreen', {
                  categoryIdentifier: ad.category.identifier,
                  mainCategoryIdentifier: ad.category.mainCategory.identifier,
                  filters: getFilter(attribute),
                })
              }
              style={styles.attributeValue}
              semiBold
            >
              {attribute.value}
            </HoverText>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  attributesTable: {
    marginTop: 16,
    borderRadius: 6,
    flex: 1,
    overflow: 'hidden',
  },
  attributeRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 38,
  },
  attributeLabe: {
    width: '60%',
    fontSize: 15,
    lineHeight: 22,
    color: Color.greyTextColor,
  },
  attributeValue: {
    fontSize: 15,
    lineHeight: 22,
    color: Color.blackColor,
  },
});
