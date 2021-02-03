import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';

interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
  setMainCategoryId: (mainCategoryId: string) => void;
}

interface MainCategory {
  item: AllMainCategories_findAllMainCategories;
  setMainCategoryId: (mainCategoryId: string) => void;
}

export const MainCategoryContainer: React.FC<Props> = ({
  mainCategories,
  setMainCategoryId,
}) => {
  const renderItem = ({ item, setMainCategoryId }: MainCategory) => (
    <Item item={item} setMainCategoryId={setMainCategoryId} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={mainCategories}
        renderItem={({ item }) => renderItem({ item, setMainCategoryId })}
        keyExtractor={(item) => item.id}
        horizontal
      />
      <View />
    </View>
  );
};

const Item = ({ item, setMainCategoryId }: MainCategory) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => {
      setMainCategoryId(item.id);
    }}
  >
    <View style={styles.category}>
      <Image
        style={styles.categoryImage}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    margin: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginVertical: 15,
  },
  categoryName: {
    fontSize: 16,
  },
  title: {
    width: 150,
    fontSize: 16,
    textAlign: 'center',
  },
});
