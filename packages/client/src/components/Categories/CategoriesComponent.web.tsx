import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { CategoriesByMainCategoryId_findCategoriesByMainCategoryId } from '../../apollo/types/CategoriesByMainCategoryId';

interface Props {
  mainCategoryId: string;
  categories: CategoriesByMainCategoryId_findCategoriesByMainCategoryId[];
  setCategoryId: (id: string) => void;
}
interface Category {
  name: string;
  id: string;
}
interface ItemType {
  mainCategoryId: string;
  item: Category;
  setCategoryId: (id: string) => void;
}

export const CategoriesComponent: React.FC<Props> = ({
  mainCategoryId,
  categories,
  setCategoryId,
}) => {
  let items = [{ name: 'All', id: 'all' }];
  items = items.concat(
    categories.map((category) => ({ name: category.name, id: category.id })),
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <Item
            item={item}
            setCategoryId={setCategoryId}
            mainCategoryId={mainCategoryId}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

const Item = ({ item, setCategoryId, mainCategoryId }: ItemType) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        setCategoryId(item.id);
        navigation.navigate('AdsScreen', {
          categoryId: item.id,
          mainCategoryId,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
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
