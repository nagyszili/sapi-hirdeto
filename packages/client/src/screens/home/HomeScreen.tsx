import * as React from 'react';
import { SafeAreaView } from 'react-native';

import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { Fetching } from '../../components/Fetching';
import { HomeComponent } from './HomeComponent';

export const HomeScreen: React.FC<{}> = () => {
  const { data: mainCategories, loading } = useAllMainCategories();

  if (loading || !mainCategories) {
    return <Fetching />;
  }
  return (
    <SafeAreaView>
      <HomeComponent mainCategories={mainCategories.findAllMainCategories} />
    </SafeAreaView>
  );
};
