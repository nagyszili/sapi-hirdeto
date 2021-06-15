import { useReactiveVar } from '@apollo/client';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import attributeLabels from '../../../assets/texts/attributes.json';
import texts from '../../../assets/texts/texts.json';
import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { currencyVar } from '../../apollo/reactiveVariables';
import { Button } from '../../components/Buttons/Button';
import { CategoryFilter } from '../../components/Filters/CategoryFilter';
import { CurrencyPicker } from '../../components/Filters/CurrencyPicker';
import { FiltersContainer } from '../../components/Filters/FiltersContainer';
import { RangeFilter } from '../../components/Filters/Range';
import { Text } from '../../components/themed/Text';
import { FiltersScreenRouteProp } from '../../navigation/types';
import * as Color from '../../utils/theme/colors';

export const FiltersScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ title: texts['filter'] });
  }, []);
  const { data: mainCategories } = useAllMainCategories();
  const activeCurrency = useReactiveVar(currencyVar);

  const route = useRoute<FiltersScreenRouteProp>();
  const {
    mainCategoryIdentifier,
    categoryIdentifier,
    inDescription,
    filters,
    query,
  } = route?.params;

  const setMainCategoryIdentifier = (mainCategoryIdentifier: string) =>
    navigation.setParams({
      mainCategoryIdentifier,
      categoryIdentifier: '',
      filters: filters?.filter((filter) => filter.name === 'price'),
    });

  const setCategoryIdentifier = (categoryIdentifier: string) =>
    navigation.setParams({
      categoryIdentifier,
      filters: filters?.filter((filter) => filter.name === 'price'),
    });

  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    mainCategoryIdentifier || ''
  );

  const selectedCategory =
    categories?.findCategoriesByMainCategoryIdentifier.find(
      (cat) => cat.identifier === categoryIdentifier
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.groupContainer}>
          <CategoryFilter
            labelStyle={styles.label}
            label={texts['mainCategory']}
            categories={mainCategories?.findAllMainCategories || []}
            selectedCategory={mainCategoryIdentifier || undefined}
            setSelectedCategory={setMainCategoryIdentifier}
            defaultValue={texts['select']}
          />
        </View>

        <View style={styles.groupContainer}>
          <CategoryFilter
            labelStyle={styles.label}
            label={texts['subCategory']}
            categories={
              categories?.findCategoriesByMainCategoryIdentifier || []
            }
            selectedCategory={categoryIdentifier || undefined}
            setSelectedCategory={setCategoryIdentifier}
            defaultValue={texts['select']}
          />
        </View>

        <View style={styles.groupContainer}>
          <RangeFilter
            title="price"
            label={`${attributeLabels['price']} (${
              texts[activeCurrency as keyof typeof texts]
            })`}
            labelStyle={styles.label}
            filters={filters || []}
          />
        </View>

        <View style={styles.groupContainer}>
          <CurrencyPicker labelStyle={styles.label} />
        </View>

        {selectedCategory && (
          <FiltersContainer
            labelStyle={styles.label}
            key={selectedCategory?.id}
            filters={filters || []}
            selectedCategory={selectedCategory}
            filterStyle={styles.groupContainer}
          />
        )}
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          style={styles.buttonLeft}
          onPress={() =>
            navigation.setParams({
              inDescription: undefined,
              filters: undefined,
              categoryIdentifier: undefined,
              mainCategoryIdentifier: undefined,
              query: undefined,
            })
          }
        >
          <Text greyDark small semiBold>
            {texts['reject']}
          </Text>
        </Button>
        <Button
          style={styles.buttonRight}
          onPress={() =>
            navigation.navigate('AdsScreen', {
              inDescription,
              filters,
              categoryIdentifier,
              mainCategoryIdentifier,
              query,
            })
          }
        >
          <Text white small semiBold>
            {texts['apply']}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
  },
  content: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: Color.greyLightColor,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Color.whiteColor,
    borderColor: Color.greyColor,
    borderTopWidth: 0.4,
    borderStyle: 'solid',
  },
  buttonLeft: {
    flex: 0.35,
    height: 46,
    marginRight: 4,
    backgroundColor: Color.greyColor,
  },
  buttonRight: {
    flex: 0.65,
    height: 46,
    marginLeft: 4,
  },
  groupContainer: {
    borderRadius: 6,
    marginVertical: 3,
    padding: 20,
    backgroundColor: Color.whiteColor,
  },
  label: {
    fontSize: 17,
    color: Color.blackColor,
    fontWeight: '600',
  },
});
