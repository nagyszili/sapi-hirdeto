import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { useAdByIdentifier } from '../../apollo/ad/useAdByIdentifier';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { Fetching } from '../../components/Fetching';
import { Text } from '../../components/themed/Text';
import { AdDetailsScreenRouteProp } from '../../navigation/types';
import { getErrorMessage } from '../../utils/errors';
import { greyLightColor } from '../../utils/theme/colors';
import { AdDetailsComponent } from './AdDetailsComponent';

export const AdDetailsScreen: React.FC<{}> = () => {
  const route = useRoute<AdDetailsScreenRouteProp>();

  const { data: ad, loading, error } = useAdByIdentifier(
    route.params.identifier,
  );

  const { data: user, loading: userLoading } = useCurrentUser();

  if (loading || userLoading) {
    return <Fetching />;
  }

  if (!ad || error) {
    return error ? (
      <Text>{getErrorMessage(error)}</Text>
    ) : (
      <Text>Ad not found!</Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AdDetailsComponent
        ad={ad.findAdByIdentifier}
        favorite={
          !!user?.currentUser.favorites?.find(
            (favorite) => favorite.id === ad.findAdByIdentifier.id,
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyLightColor,
    alignItems: 'center',
  },
});
