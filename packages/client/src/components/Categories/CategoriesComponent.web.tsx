import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';

import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Text } from '../../components/themed/Text';

interface Props {
  mainCategoryIdentifier: string;
  categories: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier[];
  setCategoryIdentifier: (identifier: string) => void;
}
interface Category {
  name: string;
  identifier: string;
}
interface ItemType {
  mainCategoryIdentifier: string;
  item: Category;
  setCategoryIdentifier: (identifier: string) => void;
}

export const CategoriesComponent: React.FC<Props> = ({
  mainCategoryIdentifier,
  categories,
  setCategoryIdentifier,
}) => {
  let items = [{ name: 'All', identifier: 'all' }];
  items = items.concat(
    categories.map((category) => ({
      name: category.name,
      identifier: category.identifier,
    })),
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <Item
            item={item}
            setCategoryIdentifier={setCategoryIdentifier}
            mainCategoryIdentifier={mainCategoryIdentifier}
          />
        )}
        keyExtractor={(item) => item.identifier}
        horizontal
      />
    </View>
  );
};

const Item = ({
  item,
  setCategoryIdentifier,
  mainCategoryIdentifier,
}: ItemType) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        setCategoryIdentifier(item.identifier);
        navigation.navigate('AdsScreen', {
          categoryIdentifier: item.identifier,
          mainCategoryIdentifier,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    margin: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
  },
});
