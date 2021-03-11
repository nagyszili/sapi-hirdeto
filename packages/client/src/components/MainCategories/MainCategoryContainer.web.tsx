import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { whiteColor } from '../../utils/theme/colors';
import { maxContentWidth } from '../../utils/theme/layout';
import { Text } from '../themed/Text';
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
      <Text style={styles.categoryTitle} semiBold black>
        {texts['adCategories']}
      </Text>
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={styles.list}
          data={mainCategories}
          renderItem={({ item }) =>
            renderItem({ item, setMainCategoryIdentifier })
          }
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    width: '100%',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: maxContentWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingBottom: 45,
  },
  categoryTitle: {
    fontSize: 28,
    marginVertical: 45,
  },
});
