import * as React from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';

import { CategoryFilter } from '../../../components/Filters/CategoryFilter';
import { LocationFilter } from '../../../components/Filters/LocationFilter';
import { Select } from '../../../components/Filters/Select';
import { ImagePickerComponent } from '../../../components/ImagePicker';
import { TextInput } from '../../../components/TextInput/TextInput';
import { CategoryAttributes } from '../CategoryAttributes';
import { CreateAdComponentProps } from './CreateAdComponent.props';

export const CreateAdComponent: React.FC<CreateAdComponentProps> = ({
  titleRef,
  priceRef,
  descriptionRef,
  currencies,
  currency,
  setCurrency,
  mainCategories,
  mainCategoryIdentifier,
  setMainCategoryIdentifier,
  categories,
  categoryIdentifier,
  attributes,
  setCategoryIdentifier,
  selectedCategory,
  selectedCounty,
  setAttributes,
  setSelectedCounty,
  setSelectedLocation,
  setImages,
  createAd,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <ImagePickerComponent setImages={setImages} />
        </View>

        <View style={styles.row}>
          <TextInput placeholder="Title" ref={titleRef} />
        </View>
        <View style={styles.row}>
          <TextInput placeholder="Description" ref={descriptionRef} />
        </View>

        <View style={styles.row}>
          <TextInput placeholder="Price" ref={priceRef} />
          <Select
            elements={currencies}
            setSelectedElement={setCurrency}
            selectedElement={currency}
          />
        </View>
        <View style={styles.row}>
          <CategoryFilter
            style={{ backgroundColor: 'red' }}
            categories={mainCategories}
            selectedCategory={mainCategoryIdentifier}
            setSelectedCategory={setMainCategoryIdentifier}
          />
          {categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              selectedCategory={categoryIdentifier}
              setSelectedCategory={setCategoryIdentifier}
            />
          )}
        </View>
        {selectedCategory && (
          <CategoryAttributes
            attributes={attributes}
            selectedCategory={selectedCategory}
            setAttributes={setAttributes}
          />
        )}
        <View style={styles.row}>
          <LocationFilter
            selectedCounty={selectedCounty}
            setSelectedCounty={setSelectedCounty}
            setSelectedLocation={setSelectedLocation}
          />
        </View>

        <Button title="Save" onPress={createAd} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
