import { useReactiveVar } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { isLoggedInVar } from '../../apollo/reactiveVariables';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { MainHeader } from '../../components/Headers/MainHeader';
import { AdDetailsScreen } from '../../screens/ad-details/AdDetailsScreen';
import { AdminScreen } from '../../screens/admin-panel/AdminScreen';
import { AdsScreen } from '../../screens/ads/AdsScreen';
import { CreateAdScreen } from '../../screens/create-ad/CreateAdScreen';
import { FavoritesScreen } from '../../screens/favorites/FavoritesScreen';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { MyAdsScreen } from '../../screens/my-ads/MyAdsScreen';
import { NotFoundScreen } from '../../screens/not-found/NotFoundScreen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';
import { UpdateAdScreen } from '../../screens/update-ad/UpdateAdScreen';
import { ROLES } from '../../utils/constants';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC<{}> = (props: any) => {
  const { data: user } = useCurrentUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        header: () => <MainHeader />,
      }}
      {...props}
    >
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="AdsScreen" component={AdsScreen} />
      <RootStack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} />
      <RootStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <RootStack.Screen name="CreateAdScreen" component={CreateAdScreen} />
      {isLoggedIn && user?.currentUser.role === ROLES.ADMIN && false && (
        <RootStack.Screen name="AdminScreen" component={AdminScreen} />
      )}
      {isLoggedIn && (
        <>
          <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
          <RootStack.Screen name="MyAdsScreen" component={MyAdsScreen} />
          <RootStack.Screen name="UpdateAdScreen" component={UpdateAdScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};
