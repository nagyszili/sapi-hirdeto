import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { isLoggedInVar } from '../../apollo/reactiveVariables';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { Fetching } from '../../components/Fetching';
import { NotLoggedInComponent } from '../../components/NotLoggedIn/NotLoggedInComponent';
import { useListAdsByUser } from '../../hooks/useListAdsByUser';
import { greyLightColor } from '../../utils/theme/colors';
import { MyAdsComponent } from './MyAdsComponent';

export const MyAdsScreen: React.FC<{}> = () => {
  const { ads, loadingAds, fetchMoreAds, refetchAds } = useListAdsByUser(10);

  const { data: user, loading: loadingUser } = useCurrentUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (!isLoggedIn) {
    return <NotLoggedInComponent />;
  }

  if (loadingAds || loadingUser) {
    return <Fetching />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MyAdsComponent
        user={user?.currentUser}
        ads={ads}
        fetchMoreAds={fetchMoreAds}
        refetchAds={refetchAds}
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
