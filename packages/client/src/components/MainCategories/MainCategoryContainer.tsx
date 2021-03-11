import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { MainCategoryContainerProps } from './MainCategoryContainer.props';
import {
  MainCategoryItemProps,
  MainCategoryItem,
} from './MainCategoryItem/MainCategoryItem';

export const MainCategoryContainer: React.FC<MainCategoryContainerProps> = ({
  mainCategories,
  setMainCategoryIdentifier,
}) => {
  const renderItem = ({
    item,
    setMainCategoryIdentifier,
  }: MainCategoryItemProps) => (
    <MainCategoryItem
      item={item}
      setMainCategoryIdentifier={setMainCategoryIdentifier}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={mainCategories}
        renderItem={({ item }) =>
          renderItem({ item, setMainCategoryIdentifier })
        }
        keyExtractor={(item) => item.id}
        horizontal
      />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
