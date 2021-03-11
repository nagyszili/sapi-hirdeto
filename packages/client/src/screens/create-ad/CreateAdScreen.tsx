import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useCreateAd } from '../../apollo/ad/useCreateAd';
import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import {
  LocationInput,
  AttributeValueInput,
  AdImageInput,
} from '../../apollo/types/graphql-global-types';
import { setLoading } from '../../apollo/ui/uiMutations';
import { Fetching } from '../../components/Fetching';
import { greyLightColor } from '../../utils/theme/colors';
import { CreateAdComponent } from './CreateAdComponent/CreateAdComponent';

export interface Currency {
  name: string;
  identifier: string;
  id: number;
}

const currencies: Currency[] = [
  { name: 'lei', identifier: 'lei', id: 0 },
  { name: 'EURO', identifier: 'euro', id: 1 },
];

export const CreateAdScreen: React.FC<{}> = () => {
  const { data: mainCategories, loading } = useAllMainCategories();
  const [createAd] = useCreateAd();

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const priceRef = useRef<any>();

  const [categoryIdentifier, setCategoryIdentifier] = useState('');
  const [mainCategoryIdentifier, setMainCategoryIdentifier] = useState('');
  const [images, setImages] = useState<AdImageInput[]>([]);
  const [currency, setCurrency] = useState(currencies[0].name);
  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    mainCategoryIdentifier,
  );

  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationInput>();

  const [attributes, setAttributes] = useState<AttributeValueInput[]>([]);

  useEffect(() => {
    setAttributes([]);
  }, [categoryIdentifier]);

  useEffect(() => {
    setCategoryIdentifier('');
  }, [mainCategoryIdentifier]);

  if (loading || !mainCategories) {
    return <Fetching />;
  }

  const selectedCategory = categories?.findCategoriesByMainCategoryIdentifier.find(
    (cat) => cat.identifier === categoryIdentifier,
  );

  const _createAd = async () => {
    const title = titleRef.current.getValue();
    const description = descriptionRef.current.getValue();
    const price = priceRef.current.getValue();

    if (
      title !== '' &&
      selectedCategory?.id &&
      parseInt(price, 10) > 0 &&
      selectedLocation
    ) {
      setLoading(true);
      const result = await createAd({
        variables: {
          name: title,
          categoryId: selectedCategory.id,
          price: parseInt(price, 10),
          location: selectedLocation,
          images,
          currency,
          description,
          attributeValues: attributes,
        },
      });
      if (result.data) {
        setLoading(false);
      } else if (result.errors) {
        setLoading(false);
        alert('Error');
      }
    } else {
      alert('Please complete all fields!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CreateAdComponent
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        priceRef={priceRef}
        currencies={currencies}
        currency={currency}
        setCurrency={setCurrency}
        mainCategories={mainCategories.findAllMainCategories}
        mainCategoryIdentifier={mainCategoryIdentifier}
        setMainCategoryIdentifier={setMainCategoryIdentifier}
        categories={
          categories ? categories.findCategoriesByMainCategoryIdentifier : []
        }
        categoryIdentifier={categoryIdentifier}
        setCategoryIdentifier={setCategoryIdentifier}
        selectedCategory={selectedCategory}
        selectedCounty={selectedCounty}
        setSelectedCounty={setSelectedCounty}
        attributes={attributes}
        setAttributes={setAttributes}
        setSelectedLocation={setSelectedLocation}
        createAd={_createAd}
        setImages={setImages}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyLightColor,
    alignItems: 'center',
  },
});
