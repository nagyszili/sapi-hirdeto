import { useRoute, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { LocationQueryInput } from '../../apollo/types/graphql-global-types';
import { Fetching } from '../../components/Fetching';
import { HomeScreenRouteProp } from '../../navigation/types';
import * as Color from '../../utils/theme/colors';
import { HomeComponent } from './HomeComponent';

export const HomeScreen: React.FC<{}> = () => {
  const { data: mainCategories, loading } = useAllMainCategories();
  const navigation = useNavigation();

  const route = useRoute<HomeScreenRouteProp>();

  const setLocation = (location?: LocationQueryInput | null) => {
    navigation.setParams({ location });
  };

  if (loading || !mainCategories) {
    return <Fetching />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeComponent
        mainCategories={mainCategories.findAllMainCategories}
        location={route?.params?.location}
        creatorId={route?.params?.creatorId}
        setLocation={setLocation}
        shouldScrollToTop={route?.params?.top}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.greyLightColor,
  },
});
