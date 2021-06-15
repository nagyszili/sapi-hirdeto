import { useReactiveVar } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { useCreateAd } from '../../apollo/ad/useCreateAd';
import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { isLoggedInVar } from '../../apollo/reactiveVariables';
import { ImageInput } from '../../apollo/types/graphql-global-types';
import { showLoginModal } from '../../apollo/ui/modalMutations';
import { setLoading } from '../../apollo/ui/uiMutations';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { useUpdateCurrentUser } from '../../apollo/user/useUpdateCurrentUser';
import { Fetching } from '../../components/Fetching';
import { useAttributesInput } from '../../hooks/useAttributesInput';
import { useSelectInput } from '../../hooks/useSelectInput';
import { currencies, negotiableOptions } from '../../utils/constants';
import { greyLightColor } from '../../utils/theme/colors';
import {
  adCategoryError,
  adMainCategoryError,
  adLocationError,
  adCountyError,
} from '../../utils/validators';
import { CreateAdComponent } from './CreateAdComponent';

export const CreateAdScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: user } = useCurrentUser();
  const [updateCurrentUser] = useUpdateCurrentUser();
  const { data: mainCategories, loading } = useAllMainCategories();
  const [createAd] = useCreateAd();

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const userNameRef = useRef<any>();
  const priceRef = useRef<any>();
  const phoneNumberRef = useRef<any>();
  const {
    error: categoryError,
    selectedElement: categoryIdentifier,
    onChange: setCategoryIdentifier,
    getValue: getCategoryIdentifier,
  } = useSelectInput({ initialValue: '', errorMessage: adCategoryError });

  const {
    error: mainCategoryError,
    selectedElement: mainCategoryIdentifier,
    onChange: setMainCategoryIdentifier,
    getValue: getMainCategoryIdentifier,
  } = useSelectInput({ initialValue: '', errorMessage: adMainCategoryError });

  const [images, setImages] = useState<ImageInput[]>([]);
  const [thumbnail, setThumbnail] = useState<ImageInput | undefined>(undefined);

  const [currency, setCurrency] = useState(currencies[0].value);
  const [negotiable, setNegotiable] = useState(negotiableOptions[0].value);
  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    mainCategoryIdentifier
  );
  const {
    error: locationError,
    selectedElement: selectedLocation,
    onChange: setSelectedLocation,
    getValue: getSelectedLocation,
  } = useSelectInput({
    initialValue: undefined,
    errorMessage: adLocationError,
  });

  const {
    error: countyError,
    selectedElement: selectedCounty,
    onChange: setSelectedCounty,
    getValue: getSelectedCounty,
  } = useSelectInput({ initialValue: '', errorMessage: adCountyError });

  const selectedCategory =
    categories?.findCategoriesByMainCategoryIdentifier.find(
      (cat) => cat.identifier === categoryIdentifier
    );

  const {
    getAttributes,
    getError,
    getSelectedAttribute,
    onChangeAttribute,
    getPossibleValues,
  } = useAttributesInput({ selectedCategory });

  useEffect(() => {
    setCategoryIdentifier('');
  }, [mainCategoryIdentifier]);

  if (loading || !mainCategories) {
    return <Fetching />;
  }

  const clearForm = () => {
    titleRef.current.clearValue();
    descriptionRef.current.clearValue();
    priceRef.current.clearValue();
    setMainCategoryIdentifier('');
    setImages([]);
    setCurrency(currencies[0].value);
    setNegotiable(negotiableOptions[0].value);
    setSelectedCounty('');
    setSelectedLocation(undefined);
    setThumbnail(undefined);
  };

  const _createAd = async () => {
    const title = titleRef.current.getValue();
    const description = descriptionRef.current.getValue();
    const price = priceRef.current.getValue();
    const userName = userNameRef.current.getValue();
    const phoneNumber = phoneNumberRef.current.getValue();
    const category = getCategoryIdentifier();
    const mainCategory = getMainCategoryIdentifier();
    const location = getSelectedLocation();
    const county = getSelectedCounty();
    const attributeValues = getAttributes();
    if (
      title &&
      description &&
      price &&
      userName &&
      phoneNumber &&
      category &&
      mainCategory &&
      county &&
      location &&
      selectedCategory?.id &&
      selectedLocation?.name &&
      attributeValues
    ) {
      if (isLoggedIn && user) {
        setLoading(true);
        try {
          const result = await createAd({
            variables: {
              name: title,
              categoryId: selectedCategory.id,
              price: parseInt(price, 10),
              location: selectedLocation,
              thumbnail,
              images,
              currency,
              negotiable,
              description,
              attributeValues,
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
              navigation.navigate('Main', {
                screen: 'Home',
                params: { screen: 'HomeScreen' },
              });
            }
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
          alert(error);
        }
      } else {
        showLoginModal();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CreateAdComponent
        categoryError={categoryError}
        mainCategoryError={mainCategoryError}
        countyError={countyError}
        locationError={locationError}
        pageTitle={texts['createNewAd']}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        priceRef={priceRef}
        userNameRef={userNameRef}
        phoneNumberRef={phoneNumberRef}
        user={user?.currentUser}
        currencies={currencies}
        currency={currency}
        setCurrency={setCurrency}
        negotiableOptions={negotiableOptions}
        negotiable={negotiable}
        setNegotiable={setNegotiable}
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
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        submit={_createAd}
        submitButtonTitle={texts['uploadAd']}
        images={images}
        setThumbnail={setThumbnail}
        setImages={setImages}
        thumbnail={thumbnail}
        getError={getError}
        getSelectedAttribute={getSelectedAttribute}
        onChangeAttribute={onChangeAttribute}
        getPossibleValues={getPossibleValues}
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
