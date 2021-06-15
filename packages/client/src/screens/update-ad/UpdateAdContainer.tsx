import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { useUpdateAd } from '../../apollo/ad/useUpdateAd';
import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { AdByIdentifier_findAdByIdentifier } from '../../apollo/types/AdByIdentifier';
import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CurrentUser_currentUser } from '../../apollo/types/CurrentUser';
import {
  ImageUpdate,
  AttributeValueInput,
} from '../../apollo/types/graphql-global-types';
import { setLoading } from '../../apollo/ui/uiMutations';
import { useUpdateCurrentUser } from '../../apollo/user/useUpdateCurrentUser';
import { Fetching } from '../../components/Fetching';
import { useAttributesInput } from '../../hooks/useAttributesInput';
import { useSelectInput } from '../../hooks/useSelectInput';
import { currencies, negotiableOptions } from '../../utils/constants';
import {
  adLocationError,
  adCountyError,
  adCategoryError,
  adMainCategoryError,
} from '../../utils/validators';
import { CreateAdComponent } from '../create-ad/CreateAdComponent';

interface Props {
  ad: AdByIdentifier_findAdByIdentifier;
  user: CurrentUser_currentUser;
  mainCategories: AllMainCategories_findAllMainCategories[];
  initialAttributes?: AttributeValueInput[];
}

export const UpdateAdContainer: React.FC<Props> = ({
  ad,
  user,
  mainCategories,
  initialAttributes,
}) => {
  const navigation = useNavigation();
  const [updateCurrentUser] = useUpdateCurrentUser();
  const [updateAd] = useUpdateAd();
  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const priceRef = useRef<any>();
  const userNameRef = useRef<any>();
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

  const [deletedImages, setDeletedImages] =
    useState<string[] | undefined>(undefined);
  const [images, setImages] = useState<ImageUpdate[]>(initialImages() || []);
  const [thumbnail, setThumbnail] = useState<ImageUpdate | undefined>(
    initialThumbnail()
  );

  const [currency, setCurrency] = useState(ad?.currency || currencies[0].value);
  const [negotiable, setNegotiable] = useState(
    ad?.negotiable || negotiableOptions[0].value
  );
  const { data: categories, loading: categoryLoading } =
    useCategoriesByMainCategoryIdentifier(mainCategoryIdentifier);

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

  const [first, setFirst] = useState(true);

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
  } = useAttributesInput({
    selectedCategory,
    initialAttributes,
    ad,
  });

  useEffect(() => {
    setMainCategoryIdentifier(ad.category.mainCategory.identifier);
    setCategoryIdentifier(ad.category.identifier);
    setSelectedCounty(ad.location.county);
    setSelectedLocation({
      name: ad.location.name,
      county: ad.location.county,
      longitude: ad.location.longitude,
      latitude: ad.location.latitude,
    });
    setCurrency(ad.currency);
    setNegotiable(ad.negotiable);
  }, [ad, user]);

  const _updateAd = async () => {
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
      setLoading(true);
      try {
        const result = await updateAd({
          variables: {
            id: ad.id,
            name: title,
            categoryId: selectedCategory.id,
            price: parseInt(price, 10),
            location: selectedLocation,
            thumbnail: getThumbnail(),
            deletedImages,
            images: getImages(),
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
        alert('Error');
      }
    }
  };

  if (categoryLoading && first) {
    return <Fetching />;
  }
  if (first) {
    setFirst(false);
  }

  function initialImages() {
    return ad.images
      ?.map((image) => ({
        url: image.url,
        priority: image.priority,
      }))
      .sort((a, b) => a.priority - b.priority);
  }

  function getImages() {
    if (images.length) {
      const newImages = images.filter(
        (image) =>
          !ad.images?.some(
            (adImage) =>
              image.url === adImage.url && adImage.priority === image.priority
          )
      );
      return newImages.length > 0 ? images : undefined;
    }

    return undefined;
  }

  function initialThumbnail(): ImageUpdate | undefined {
    return (
      (ad?.thumbnail && {
        url: ad.thumbnail?.url,
        priority: ad.thumbnail.priority,
      }) ||
      undefined
    );
  }

  function getThumbnail() {
    return images.length > 0
      ? ad.thumbnail?.url !== thumbnail?.url ||
        ad.thumbnail?.priority !== thumbnail?.priority
        ? thumbnail
        : undefined
      : null;
  }

  return (
    <CreateAdComponent
      categoryError={categoryError}
      mainCategoryError={mainCategoryError}
      countyError={countyError}
      locationError={locationError}
      pageTitle={texts.editAd}
      titleRef={titleRef}
      titleInitialValue={ad.name}
      descriptionRef={descriptionRef}
      descriptionInitialValue={ad.description}
      priceRef={priceRef}
      priceInitialValue={ad.price.toString()}
      userNameRef={userNameRef}
      phoneNumberRef={phoneNumberRef}
      user={user}
      currencies={currencies}
      currency={currency}
      setCurrency={setCurrency}
      negotiableOptions={negotiableOptions}
      negotiable={negotiable}
      setNegotiable={setNegotiable}
      mainCategories={mainCategories}
      mainCategoryIdentifier={mainCategoryIdentifier}
      setMainCategoryIdentifier={setMainCategoryIdentifier}
      categories={categories?.findCategoriesByMainCategoryIdentifier || []}
      categoryIdentifier={categoryIdentifier}
      setCategoryIdentifier={setCategoryIdentifier}
      selectedCategory={selectedCategory}
      selectedCounty={selectedCounty}
      setSelectedCounty={setSelectedCounty}
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
      submit={_updateAd}
      submitButtonTitle={texts['save']}
      images={images}
      setThumbnail={setThumbnail}
      setImages={setImages}
      thumbnail={thumbnail}
      setDeletedImages={setDeletedImages}
      getError={getError}
      getSelectedAttribute={getSelectedAttribute}
      onChangeAttribute={onChangeAttribute}
      getPossibleValues={getPossibleValues}
    />
  );
};
