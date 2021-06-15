import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import texts from '../../../assets/texts/texts.json';
import { whiteColor } from '../../utils/theme/colors';
import { Text } from '../themed/Text';
import { MainCategoryContainerProps } from './MainCategoryContainer.props';
import { MainCategoryItem } from './MainCategoryItem';
const { width: screenWidth } = Dimensions.get('window');

export const MainCategoryContainer: React.FC<MainCategoryContainerProps> = ({
  mainCategories,
  setMainCategoryIdentifier,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }: any) => (
    <View style={styles.categoryPage}>
      {item.map((category: any, key: number) => (
        <MainCategoryItem
          key={key}
          item={category}
          setMainCategoryIdentifier={setMainCategoryIdentifier}
        />
      ))}
    </View>
  );

  const getSlideItems: any = () => {
    const categoryPages: any[] = [];
    let categoryPage: any[] = [];
    mainCategories.forEach((category, index) => {
      if (categoryPage.length < 6) {
        categoryPage.push(category);
      }
      if (categoryPage.length === 6 || index + 1 === mainCategories.length) {
        categoryPages.push(categoryPage);
        categoryPage = [];
      }
    });
    return categoryPages;
  };

  const getNumOfPages = () => Math.ceil(mainCategories.length / 6);

  return (
    <View style={styles.container}>
      <Text style={styles.title} semiBold black>
        {texts['adCategories']}
      </Text>
      <View style={styles.slideContainer}>
        <Carousel
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={getSlideItems()}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={setActiveSlide}
          initialNumToRender={5}
        />
        <Pagination
          dotsLength={getNumOfPages()}
          activeDotIndex={activeSlide}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationInactiveDot}
          inactiveDotOpacity={0.3}
          inactiveDotScale={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: whiteColor,
    width: '100%',
  },
  title: {
    fontSize: 20,
    marginVertical: 25,
  },
  slideContainer: {
    width: '100%',
  },
  categoryPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    margin: 0,
    padding: 0,
    backgroundColor: 'rgb(0, 0, 0)',
  },
  paginationInactiveDot: {
    backgroundColor: 'rgb(0, 0, 0)',
    margin: 0,
  },
});
