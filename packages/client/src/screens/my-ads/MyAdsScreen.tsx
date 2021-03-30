import * as React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { AdsByUser_findAdsByUser } from '../../apollo/types/AdsByUser';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { Fetching } from '../../components/Fetching';
import { useListAdsByUser } from '../../hooks/useListAdsByUser';
import { greyLightColor } from '../../utils/theme/colors';
import { AdListItem } from '../ads/ListAds/AdListItem/AdListItem';

export const MyAdsScreen: React.FC<{}> = () => {
  const { ads, loadingAds, fetchMoreAds, refetchAds } = useListAdsByUser(10);

  const { data: user, loading: loadingUser } = useCurrentUser();

  if (loadingAds || loadingUser) {
    return <Fetching />;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: AdsByUser_findAdsByUser;
    index: number;
  }) => <AdListItem item={item} index={index} user={user?.currentUser} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={ads}
        numColumns={2}
        renderItem={renderItem}
        onEndReached={() => fetchMoreAds()}
        onEndReachedThreshold={3}
        refreshing={loadingAds}
        onRefresh={() => refetchAds()}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        extraData={user?.currentUser}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyLightColor,
  },
});
