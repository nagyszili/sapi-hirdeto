import * as React from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';

import { FileUpload } from '../../../components/FileUpload.web';
import { CategoryFilter } from '../../../components/Filters/CategoryFilter';
import { LocationFilter } from '../../../components/Filters/LocationFilter';
import { Select } from '../../../components/Filters/Select';
import { Footer } from '../../../components/Footer/Footer';
import { TextInput } from '../../../components/TextInput/TextInput';
import { CategoryAttributes } from '../CategoryAttributes';
import { CreateAdComponentProps } from './CreateAdComponent.props';

export const CreateAdComponent: React.FC<CreateAdComponentProps> = ({
  titleRef,
  descriptionRef,
  priceRef,
  currencies,
  currency,
  setCurrency,
  mainCategories,
  mainCategoryIdentifier,
  setMainCategoryIdentifier,
  categories,
  categoryIdentifier,
  setCategoryIdentifier,
  selectedCategory,
  selectedCounty,
  attributes,
  setAttributes,
  setSelectedCounty,
  setSelectedLocation,
  setImages,
  createAd,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.content}>
        <View style={styles.row}>
          <FileUpload setImages={setImages} />
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
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
