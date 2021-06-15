import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { Button } from '../../../components/Buttons/Button';
import { CategoryFilter } from '../../../components/Filters/CategoryFilter';
import { LocationFilter } from '../../../components/Filters/LocationFilter';
import { SelectInput } from '../../../components/Filters/Select';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { ImageUploadContainer } from '../../../components/ImageUpload/ImageUploadContainer/ImageUploadContainer.web';
import { TextArea } from '../../../components/TextArea/TextArea.web';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Text } from '../../../components/themed/Text';
import * as Color from '../../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../../utils/theme/layout';
import {
  adDescriptionErrorMessage,
  adTitleErrorMessage,
  adPriceErrorMessage,
  phoneNumberErrorMessage,
  userNameErrorMessage,
} from '../../../utils/validators';
import { CategoryAttributes } from '../CategoryAttributes';
import { CreateAdComponentProps } from './CreateAdComponent.props';

export const CreateAdComponent: React.FC<CreateAdComponentProps> = ({
  pageTitle,
  titleRef,
  titleInitialValue,
  descriptionRef,
  descriptionInitialValue,
  priceRef,
  priceInitialValue,
  userNameRef,
  phoneNumberRef,
  user,
  currencies,
  currency,
  negotiableOptions,
  negotiable,
  setNegotiable,
  setCurrency,
  mainCategories,
  mainCategoryIdentifier,
  setMainCategoryIdentifier,
  categories,
  categoryIdentifier,
  setCategoryIdentifier,
  selectedCategory,
  selectedCounty,
  setSelectedCounty,
  selectedLocation,
  setSelectedLocation,
  images,
  setImages,
  submit,
  submitButtonTitle,
  setThumbnail,
  thumbnail,
  setDeletedImages,
  categoryError,
  mainCategoryError,
  countyError,
  locationError,
  getError,
  getSelectedAttribute,
  getPossibleValues,
  onChangeAttribute,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <GradientHeader />

      <View style={styles.content}>
        <Text style={styles.title} black semiBold>
          {pageTitle}
        </Text>

        <View style={[styles.topContainers, { zIndex: 100 }]}>
          <View style={styles.generalInfoContainer}>
            <Text style={styles.generalInfoTitle} large black semiBold>
              {texts['generalInfo']}
            </Text>
            <View style={styles.titleInputRow}>
              <Text style={styles.label} greyDark>
                {texts['title']}
              </Text>
              <TextInput
                placeholder={texts['createAdTitlePlaceholder']}
                placeholderTextColor="#969696b3"
                ref={titleRef}
                initialValue={titleInitialValue}
                errorMessage={adTitleErrorMessage}
              />
            </View>
            <View style={[styles.row, { zIndex: 100 }]}>
              <Text style={styles.label} greyDark>
                {texts['mainCategory']}
              </Text>
              <CategoryFilter
                categories={mainCategories}
                selectedCategory={mainCategoryIdentifier}
                setSelectedCategory={setMainCategoryIdentifier}
                defaultValue={texts['select']}
                error={mainCategoryError}
              />
            </View>
            <View style={[styles.row, { zIndex: 99 }]}>
              <Text style={styles.label} greyDark>
                {texts['subCategory']}
              </Text>
              <CategoryFilter
                categories={categories}
                selectedCategory={categoryIdentifier}
                setSelectedCategory={setCategoryIdentifier}
                defaultValue={texts['select']}
                error={categoryError}
              />
            </View>
            <View style={[styles.locationContainer, { zIndex: 98 }]}>
              <LocationFilter
                selectedCounty={selectedCounty}
                setSelectedCounty={setSelectedCounty}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                countyError={countyError}
                locationError={locationError}
              />
            </View>
          </View>

          <View style={styles.photosContainer}>
            <Text style={styles.photosTitle} large black semiBold>
              {texts['photo']}
            </Text>
            <ImageUploadContainer
              setImages={setImages}
              images={images}
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
              setDeletedImages={setDeletedImages}
            />
          </View>
        </View>

        {selectedCategory && (
          <View style={[styles.attributesContainer, { zIndex: 99 }]}>
            <View style={styles.attributesContent}>
              <CategoryAttributes
                selectedCategory={selectedCategory}
                getError={getError}
                getPossibleValues={getPossibleValues}
                getSelectedAttribute={getSelectedAttribute}
                onChangeAttribute={onChangeAttribute}
              />
            </View>
          </View>
        )}

        <View style={[styles.detailsContainer, { zIndex: 98 }]}>
          <Text style={styles.generalInfoTitle} large black semiBold>
            {texts['details']}
          </Text>
          <Text style={styles.label} greyDark>
            {texts['description']}
          </Text>
          <TextArea
            ref={descriptionRef}
            placeholder={texts['description']}
            initialValue={descriptionInitialValue}
            errorMessage={adDescriptionErrorMessage}
          />

          <View style={[styles.priceContainer, { zIndex: 97 }]}>
            <View>
              <Text style={styles.label} greyDark>
                {texts['price']}
              </Text>
              <TextInput
                placeholder={texts['price']}
                ref={priceRef}
                containerStyle={styles.price}
                placeholderTextColor="#969696b3"
                initialValue={priceInitialValue}
                isNumberInput
                errorMessage={adPriceErrorMessage}
              />
            </View>

            <View style={styles.smallPicker}>
              <SelectInput
                elements={currencies}
                setSelectedElement={setCurrency}
                selectedElement={currency}
              />
            </View>
            <View style={styles.smallPicker}>
              <SelectInput
                elements={negotiableOptions}
                setSelectedElement={setNegotiable}
                selectedElement={negotiable}
              />
            </View>
          </View>
        </View>

        <View style={[styles.contactContainer, { zIndex: 96 }]}>
          <Text style={styles.generalInfoTitle} large black semiBold>
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

        <View style={[styles.submitContainer, { zIndex: 10 }]}>
          {/* <HoverText style={styles.preview} onPress={() => {}} black small>
            {texts['preview']}
          </HoverText> */}
          <Button
            style={styles.button}
            textStyle={{ fontWeight: '600' }}
            text={submitButtonTitle}
            onPress={submit}
          />
        </View>
      </View>

      <View style={{ zIndex: 10, width: '100%' }}>
        <Footer />
      </View>
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
    width: '100%',
  },
  content: {
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    width: '100%',
    height: '100%',
    marginVertical: 56,
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
  },
  topContainers: {
    flexDirection: 'row',
  },
  attributesContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginVertical: 12,
    padding: 33,
  },
  attributesContent: {
    width: 270,
  },
  detailsContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 33,
    paddingRight: 46,
    paddingTop: 35,
    paddingBottom: 55,
  },
  generalInfoContainer: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginRight: 12,
    marginBottom: 12,
    paddingHorizontal: 33,
    paddingTop: 35,
    paddingBottom: 55,
  },
  photosContainer: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    paddingHorizontal: 33,
    paddingTop: 35,
    paddingBottom: 32,
    marginLeft: 12,
    marginBottom: 12,
  },
  generalInfoTitle: {
    marginBottom: 32,
  },
  photosTitle: {
    marginBottom: 23,
  },
  titleInputRow: {
    marginBottom: 24,
  },
  row: {
    marginBottom: 24,
    width: '50%',
  },
  label: {
    fontSize: 15,
    marginBottom: 7,
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 40,
    paddingHorizontal: 32,
    paddingVertical: 19,
  },
  button: {
    margin: 0,
    width: 152,
    height: 38,
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    alignItems: 'flex-end',
  },
  price: {
    marginRight: 24,
    height: 46,
  },
  smallPicker: {
    width: 150,
    marginRight: 24,
  },
  contactContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 33,
    paddingRight: 46,
    paddingTop: 35,
    paddingBottom: 55,
  },
  locationContainer: {
    width: '50%',
  },
});
