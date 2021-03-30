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
import { SelectInput } from '../../../components/Filters/Select/SelectInput';
import { ImageUploadContainer } from '../../../components/ImageUpload/ImageUploadContainer/ImageUploadContainer';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Text } from '../../../components/themed/Text';
import * as Color from '../../../utils/theme/colors';
import { CategoryAttributes } from '../CategoryAttributes';
import { CreateAdComponentProps } from './CreateAdComponent.props';

export const CreateAdComponent: React.FC<CreateAdComponentProps> = ({
  titleRef,
  priceRef,
  descriptionRef,
  userNameRef,
  user,
  phoneNumberRef,
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
  selectedLocation,
  setImages,
  images,
  createAd,
}) => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title} black semiBold>
          {texts['createNewAd']}
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
              rowStyle={styles.input}
              containerStyle={styles.inputContainer}
              placeholderTextColor="#969696b3"
            />
          </View>

          <View style={styles.row}>
            <CategoryFilter
              label={texts['mainCategory']}
              categories={mainCategories}
              selectedCategory={mainCategoryIdentifier}
              setSelectedCategory={setMainCategoryIdentifier}
              defaultValue={texts['select']}
            />
          </View>

          <View style={styles.row}>
            <CategoryFilter
              label={texts['subCategory']}
              categories={categories}
              selectedCategory={categoryIdentifier}
              setSelectedCategory={setCategoryIdentifier}
              defaultValue={texts['select']}
            />
          </View>

          <LocationFilter
            selectedCounty={selectedCounty}
            setSelectedCounty={setSelectedCounty}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </View>

        {selectedCategory && (
          <View style={styles.groupContainer}>
            <CategoryAttributes
              attributes={attributes}
              selectedCategory={selectedCategory}
              setAttributes={setAttributes}
            />
          </View>
        )}

        <View style={styles.groupContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['photo']}
          </Text>

          <ImageUploadContainer images={images} setImages={setImages} />
        </View>

        <View style={styles.groupContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['details']}
          </Text>
          <Text style={styles.label} greyDark>
            {texts['description']}
          </Text>
          <TextInput
            containerStyle={styles.description}
            rowStyle={styles.description}
            ref={descriptionRef}
            placeholder={texts['description']}
            multiline
            maxLength={9000}
            numberOfLines={5}
            textAlignVertical="top"
          />

          <View style={styles.priceContainer}>
            <Text style={styles.label} greyDark>
              {texts['price']}
            </Text>
            <TextInput
              placeholder={texts['price']}
              ref={priceRef}
              rowStyle={styles.input}
              containerStyle={styles.price}
              placeholderTextColor="#969696b3"
              isNumberInput
              keyboardType="numeric"
            />
          </View>

          <SelectInput
            elements={currencies}
            setSelectedElement={setCurrency}
            selectedElement={currency}
          />
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
              rowStyle={styles.input}
              containerStyle={styles.inputContainer}
              placeholder={texts['fullName']}
              initialValue={user?.name}
              placeholderTextColor="#969696b3"
              ref={userNameRef}
            />
          </View>

          <View style={[styles.row, { zIndex: 94 }]}>
            <Text style={styles.label} greyDark>
              {texts['phoneNumber']}
            </Text>
            <TextInput
              rowStyle={styles.input}
              containerStyle={styles.inputContainer}
              placeholder="074xxxxxxx"
              initialValue={user?.phoneNumber}
              placeholderTextColor="#969696b3"
              ref={phoneNumberRef}
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
            text={texts['uploadAd']}
            onPress={createAd}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
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
  input: {
    height: '100%',
  },
  inputContainer: {
    height: 46,
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
