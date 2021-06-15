import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { useActualizeAd } from '../../apollo/ad/useActualizeAd';
import { useAdByIdentifier } from '../../apollo/ad/useAdByIdentifier';
import { showDeleteModal } from '../../apollo/ui/modalMutations';
import { Fetching } from '../../components/Fetching';
import { Text } from '../../components/themed/Text';
import { useSetAdStatusById } from '../../hooks/useSetAdStatusById';
import { AdDetailsScreenRouteProp } from '../../navigation/types';
import { getErrorMessage } from '../../utils/errors';
import { AdDetailsComponent } from './AdDetailsComponent';

export const AdDetailsScreen: React.FC<{}> = () => {
  const route = useRoute<AdDetailsScreenRouteProp>();

  const { setAdStatus, isAdBelongsToUser, user, userLoading } =
    useSetAdStatusById();

  const {
    data: ad,
    loading,
    error,
  } = useAdByIdentifier(route.params.identifier, user?.currentUser.id);

  const [actualizeAd] = useActualizeAd(ad?.findAdByIdentifier.id || '');

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

  const onSetStatusPress = (status: string) => {
    setAdStatus({
      userId: ad.findAdByIdentifier.user.id,
      adId: ad.findAdByIdentifier.id,
      status,
    });
  };

  const canActualize = () => {
    const diffBetweenDates =
      (new Date().getTime() -
        new Date(ad.findAdByIdentifier.actualizedAt).getTime()) /
      (1000 * 3600 * 24);
    return diffBetweenDates >= 1;
  };

  return (
    <View style={styles.container}>
      <AdDetailsComponent
        ad={ad.findAdByIdentifier}
        user={user?.currentUser}
        setAdStatus={onSetStatusPress}
        actualizeAd={actualizeAd}
        canActualize={canActualize}
        isAdBelongsToUser={isAdBelongsToUser(ad.findAdByIdentifier.user.id)}
        deleteAd={() =>
          showDeleteModal({
            adId: ad.findAdByIdentifier.id,
            userId: ad.findAdByIdentifier.user.id,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
