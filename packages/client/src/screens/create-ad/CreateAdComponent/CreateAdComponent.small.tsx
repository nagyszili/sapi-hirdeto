import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { Button } from '../../../components/Buttons/Button';
import { CategoryFilter } from '../../../components/Filters/CategoryFilter';
import { LocationFilter } from '../../../components/Filters/LocationFilter';
import { SelectInput } from '../../../components/Filters/Select';
import { ImageUploadContainer } from '../../../components/ImageUpload/ImageUploadContainer/ImageUploadContainer';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Text } from '../../../components/themed/Text';
import * as Color from '../../../utils/theme/colors';
import {
  adTitleErrorMessage,
  adDescriptionErrorMessage,
  adPriceErrorMessage,
  userNameErrorMessage,
  phoneNumberErrorMessage,
} from '../../../utils/validators';
import { CategoryAttributes } from '../CategoryAttributes';
import { CreateAdComponentProps } from './CreateAdComponent.props';

export const CreateAdComponent: React.FC<CreateAdComponentProps> = ({
  titleRef,
  pageTitle,
  titleInitialValue,
  priceRef,
  priceInitialValue,
  descriptionRef,
  descriptionInitialValue,
  userNameRef,
  user,
  phoneNumberRef,
  currencies,
  currency,
  setCurrency,
  negotiableOptions,
  negotiable,
  setNegotiable,
  mainCategories,
  mainCategoryIdentifier,
  setMainCategoryIdentifier,
  categories,
  categoryIdentifier,
  setCategoryIdentifier,
  selectedCategory,
  selectedCounty,
  setSelectedCounty,
  setSelectedLocation,
  selectedLocation,
  setThumbnail,
  thumbnail,
  setImages,
  images,
  submit,
  submitButtonTitle,
  setDeletedImages,
  locationError,
  countyError,
  mainCategoryError,
  categoryError,
  getError,
  getSelectedAttribute,
  getPossibleValues,
  onChangeAttribute,
}) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title} black semiBold>
          {pageTitle}
        </Text>

        <View style={styles.groupContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['generalInfo']}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label} greyDark>
              {texts['title']}
            </Text>
            <TextInput
              placeholder={texts['createAdTitlePlaceholder']}
              ref={titleRef}
              placeholderTextColor="#969696b3"
              initialValue={titleInitialValue}
              errorMessage={adTitleErrorMessage}
            />
          </View>

          <View style={styles.row}>
            <CategoryFilter
              label={texts['mainCategory']}
              categories={mainCategories}
              selectedCategory={mainCategoryIdentifier}
              setSelectedCategory={setMainCategoryIdentifier}
              defaultValue={texts['select']}
              error={mainCategoryError}
            />
          </View>

          <View style={styles.row}>
            <CategoryFilter
              label={texts['subCategory']}
              categories={categories}
              selectedCategory={categoryIdentifier}
              setSelectedCategory={setCategoryIdentifier}
              defaultValue={texts['select']}
              error={categoryError}
            />
          </View>

          <LocationFilter
            selectedCounty={selectedCounty}
            setSelectedCounty={setSelectedCounty}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            countyError={countyError}
            locationError={locationError}
          />
        </View>

        {selectedCategory && (
          <View style={styles.groupContainer}>
            <CategoryAttributes
              selectedCategory={selectedCategory}
              getError={getError}
              getPossibleValues={getPossibleValues}
              getSelectedAttribute={getSelectedAttribute}
              onChangeAttribute={onChangeAttribute}
            />
          </View>
        )}

        <View style={styles.groupContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['photo']}
          </Text>

          <ImageUploadContainer
            images={images}
            setImages={setImages}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            setDeletedImages={setDeletedImages}
          />
        </View>

        <View style={styles.groupContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['details']}
          </Text>
          <Text style={styles.label} greyDark>
            {texts['description']}
          </Text>
          <TextInput
            rowStyle={styles.description}
            ref={descriptionRef}
            placeholder={texts['description']}
            multiline
            maxLength={9000}
            numberOfLines={5}
            textAlignVertical="top"
            initialValue={descriptionInitialValue}
            errorMessage={adDescriptionErrorMessage}
          />

          <View style={styles.priceContainer}>
            <Text style={styles.label} greyDark>
              {texts['price']}
            </Text>
            <TextInput
              placeholder={texts['price']}
              ref={priceRef}
              placeholderTextColor="#969696b3"
              isNumberInput
              keyboardType="numeric"
              initialValue={priceInitialValue}
              errorMessage={adPriceErrorMessage}
            />
          </View>

          <SelectInput
            elements={currencies}
            setSelectedElement={setCurrency}
            selectedElement={currency}
          />

          <View style={{ marginTop: 12 }}>
            <SelectInput
              elements={negotiableOptions}
              setSelectedElement={setNegotiable}
              selectedElement={negotiable}
            />
          </View>
        </View>

        <View style={styles.groupContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['contact']}
          </Text>

          <View style={[styles.row, { zIndex: 95 }]}>
            <Text style={styles.label} greyDark>
              {texts['name']}
            </Text>
            <TextInput
              placeholder={texts['fullName']}
              initialValue={user?.name}
              placeholderTextColor="#969696b3"
              ref={userNameRef}
              errorMessage={userNameErrorMessage}
            />
          </View>

          <View style={[styles.row, { zIndex: 94 }]}>
            <Text style={styles.label} greyDark>
              {texts['phoneNumber']}
            </Text>
            <TextInput
              placeholder="074xxxxxxx"
              initialValue={user?.phoneNumber}
              placeholderTextColor="#969696b3"
              ref={phoneNumberRef}
              keyboardType="numeric"
              isNumberInput
              errorMessage={phoneNumberErrorMessage}
            />
          </View>
        </View>

        <View style={styles.submitContainer}>
          {/* <HoverText onPress={() => {}} black small>
            {texts['preview']}
          </HoverText> */}
          <Button
            style={styles.button}
            textStyle={{ fontWeight: '600' }}
            text={submitButtonTitle}
            onPress={submit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.greyLightColor,
  },
  title: {
    fontSize: 22,
    marginLeft: 24,
    marginBottom: 25,
    marginTop: 34,
  },
  row: {
    marginBottom: 24,
  },
  groupContainer: {
    width: '100%',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 35,
    marginVertical: 6,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
  },
  containerTitle: {
    fontSize: 17,
    marginBottom: 23,
  },
  label: {
    fontSize: 15,
    marginBottom: 7,
  },
  description: {
    height: 230,
  },
  price: {
    height: 46,
  },
  priceContainer: {
    marginTop: 24,
    marginBottom: 12,
  },
  submitContainer: {
    backgroundColor: Color.whiteColor,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 6,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginLeft: 24,
    width: 152,
    height: 38,
  },
  attributesContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginVertical: 12,
    padding: 33,
  },
});
