import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';

import shopPattern from '../../../../assets/images/shopPatternTransparent.png';
import { initialHomeSortType } from '../../../apollo/initialValues';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { MainCategoryContainer } from '../../../components/MainCategoryContainer';
import { SearchBarComponent } from '../../../components/SearchBar';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { CURRENCY } from '../../../utils/constants';
import { greyLightColor } from '../../../utils/theme/colors';
import { ListAdsContainer } from '../../ads/ListAdsContainer/ListAdsContainer';
import { HomeComponentProps } from './HomeComponent.props';

export const HomeComponent: React.FC<HomeComponentProps> = ({
  mainCategories,
  location,
  setLocation,
  shouldScrollToTop,
  creatorId,
}) => {
  const navigation = useNavigation();
  const { scrollRef, scrollToTop } = useScrollToTop();

  const setMainCategoryIdentifier = (mainCategoryIdentifier: string) =>
    navigation.navigate('AdsScreen', {
      mainCategoryIdentifier,
    });

  const search = (queryString: string) => {
    navigation.navigate('AdsScreen', {
      query: queryString || undefined,
      location,
    });
  };

  useEffect(() => {
    if (shouldScrollToTop) {
      scrollToTop();
      navigation.setParams({ top: false });
    }
  });

  return (
    <ScrollView ref={scrollRef}>
      <View style={styles.container}>
        <GradientHeader />
        <SearchBarComponent
          search={search}
          location={location}
          setLocation={setLocation}
        />
        <MainCategoryContainer
          mainCategories={mainCategories}
          setMainCategoryIdentifier={setMainCategoryIdentifier}
        />
        <View style={styles.list}>
          <ListAdsContainer
            sort={initialHomeSortType}
            location={location}
            scrollToTop={scrollToTop}
            creatorId={creatorId}
            currency={CURRENCY.LEI}
          />
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? { backgroundImage: `url(${shopPattern})` }
      : {}),
  },
  list: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 45,
    backgroundColor: greyLightColor,
  },
});
