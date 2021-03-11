import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { Fetching } from '../../components/Fetching';
import { greyLightColor } from '../../utils/theme/colors';
import { HomeComponent } from './HomeComponent';

export const HomeScreen: React.FC<{}> = () => {
  const { data: mainCategories, loading } = useAllMainCategories();

  if (loading || !mainCategories) {
    return <Fetching />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <HomeComponent mainCategories={mainCategories.findAllMainCategories} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyLightColor,
  },
});
