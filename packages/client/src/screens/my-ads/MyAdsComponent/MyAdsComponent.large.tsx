import * as React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { AdsByUser_findAdsByUser } from '../../../apollo/types/AdsByUser';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { Text } from '../../../components/themed/Text';
import { greyLightColor } from '../../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../../utils/theme/layout';
import { AdListItem } from '../../ads/ListAdsContainer/AdListItem';
import { MyAdsComponentProps } from './MyAdsComponent.props';

export const MyAdsComponent: React.FC<MyAdsComponentProps> = ({
  user,
  ads,
  fetchMoreAds,
}) => {
  const renderItem = ({ item }: { item: AdsByUser_findAdsByUser }) => (
    <View style={styles.content}>
      <View style={styles.item}>
        <AdListItem item={item} user={user} hideAdToFavorite />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        renderItem={renderItem}
        onEndReached={() => fetchMoreAds()}
        onEndReachedThreshold={1}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        extraData={user}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <GradientHeader />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.footer} />
            <Footer />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.noAds}>
            <Text greyMedium large>
              {texts['noUploadedAds']}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyLightColor,
  },
  content: {
    alignItems: 'center',
  },
  item: {
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    width: '100%',
  },
  noAds: {
    height: 1000,
    alignItems: 'center',
  },
  footer: {
    height: '100%',
  },
  header: {
    marginBottom: 50,
  },
});
