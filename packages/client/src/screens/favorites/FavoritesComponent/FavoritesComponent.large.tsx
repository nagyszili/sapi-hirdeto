import * as React from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { AdsByIds_findAdsByIds } from '../../../apollo/types/AdsByIds';
import { FavoriteAds_findFavoriteAdsByUser } from '../../../apollo/types/FavoriteAds';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { Text } from '../../../components/themed/Text';
import { maxContentWidth, globalPadding } from '../../../utils/theme/layout';
import { AdListItem } from '../../ads/ListAdsContainer/AdListItem';
import { FavoritesComponentProps } from './FavoritesComponent.props';

export const FavoritesComponent: React.FC<FavoritesComponentProps> = ({
  loading,
  user,
  ads,
}) => {
  const renderItem = ({
    item,
  }: {
    item: AdsByIds_findAdsByIds | FavoriteAds_findFavoriteAdsByUser;
  }) => <AdListItem item={item} user={user} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GradientHeader />
      <View style={styles.content}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={ads}
          renderItem={renderItem}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          extraData={user}
          ListEmptyComponent={() => (
            <View style={styles.noFavorite}>
              <Text greyMedium large>
                {texts['noFavoriteAds']}
              </Text>
            </View>
          )}
        />
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    minHeight: '100%',
    width: '100%',
    marginVertical: 50,
  },
  noFavorite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
