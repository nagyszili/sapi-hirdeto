import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';

import { useCreateAd } from '../../apollo/ad/useCreateAd';
import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import {
  LocationInput,
  AttributeValueInput,
  AdImageInput,
} from '../../apollo/types/graphql-global-types';
import { setLoading } from '../../apollo/ui/uiMutations';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { useUpdateCurrentUser } from '../../apollo/user/useUpdateCurrentUser';
import { Fetching } from '../../components/Fetching';
import { Element } from '../../components/Filters/Select/SelectInput.props';
import { greyLightColor } from '../../utils/theme/colors';
import { CreateAdComponent } from './CreateAdComponent/CreateAdComponent';

const currencies: Element[] = [
  { label: 'lei', value: 'lei' },
  { label: '€', value: 'euro' },
];

export const CreateAdScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { data: user } = useCurrentUser();
  const [updateCurrentUser] = useUpdateCurrentUser();
  const { data: mainCategories, loading } = useAllMainCategories();
  const [createAd] = useCreateAd();

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const priceRef = useRef<any>();
  const userNameRef = useRef<any>();
  const phoneNumberRef = useRef<any>();

  const [categoryIdentifier, setCategoryIdentifier] = useState('');
  const [mainCategoryIdentifier, setMainCategoryIdentifier] = useState('');
  const [images, setImages] = useState<AdImageInput[]>([]);
  const [currency, setCurrency] = useState(currencies[0].value);
  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    mainCategoryIdentifier
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
    (cat) => cat.identifier === categoryIdentifier
  );

  const clearForm = () => {
    titleRef.current.clearValue();
    descriptionRef.current.clearValue();
    priceRef.current.clearValue();
    setMainCategoryIdentifier('');
    setImages([]);
    setCurrency(currencies[0].value);
    setSelectedCounty('');
    setSelectedLocation(undefined);
  };

  const _createAd = async () => {
    const title = titleRef.current.getValue();
    const description = descriptionRef.current.getValue();
    const price = priceRef.current.getValue();
    const userName = userNameRef.current.getValue();
    const phoneNumber = phoneNumberRef.current.getValue();

    if (
      userName !== '' &&
      phoneNumber !== '' &&
      title !== '' &&
      title.length > 12 &&
      selectedCategory?.id &&
      parseInt(price, 10) > 0 &&
      description.length > 60 &&
      description.length < 9000 &&
      selectedLocation
    ) {
      setLoading(true);
      try {
        const result = await createAd({
          variables: {
            name: title,
            categoryId: selectedCategory.id,
            price: parseInt(price, 10),
            location: selectedLocation,
            images,
            currency,
            description,
            attributeValues: attributes.filter((attribute) => attribute.value),
          },
        });

        const userResult = await updateCurrentUser({
          variables: { name: userName, phoneNumber },
        });

        if (result && userResult) {
          setLoading(false);
          clearForm();
          if (Platform.OS === 'web') {
            navigation.navigate('HomeScreen');
          } else {
            navigation.navigate('Main', { screen: 'Home' });
          }
        }
      } catch (error) {
        console.error(error);
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
        userNameRef={userNameRef}
        phoneNumberRef={phoneNumberRef}
        user={user?.currentUser}
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
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        createAd={_createAd}
        images={images}
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
