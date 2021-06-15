import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useAdByIdentifier } from '../../apollo/ad/useAdByIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { AttributeValueInput } from '../../apollo/types/graphql-global-types';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { Fetching } from '../../components/Fetching';
import { Text } from '../../components/themed/Text';
import { UpdateAdScreenRouteProp } from '../../navigation/types';
import { getErrorMessage } from '../../utils/errors';
import { greyLightColor } from '../../utils/theme/colors';
import { UpdateAdContainer } from './UpdateAdContainer';

export const UpdateAdScreen: React.FC<{}> = () => {
  const route = useRoute<UpdateAdScreenRouteProp>();
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUser();
  const {
    data: ad,
    loading: adLoading,
    error: adError,
  } = useAdByIdentifier(route.params.identifier, user?.currentUser.id);
  const { data: mainCategories, loading: mainCategoryLoading } =
    useAllMainCategories();

  if (adLoading || userLoading || mainCategoryLoading) {
    return <Fetching />;
  }

  if (!ad || !mainCategories || !user || adError || userError) {
    return adError ? (
      <Text>{getErrorMessage(adError)}</Text>
    ) : userError ? (
      <Text>{getErrorMessage(userError)}</Text>
    ) : (
      <Text>Ad not found!</Text>
    );
  }

  const initialAttributes = (): AttributeValueInput[] => {
    return (
      ad?.findAdByIdentifier.attributeValues?.map((attributeValue) => {
        const attribute = ad.findAdByIdentifier.category.attributes.find(
          (attribute) => attribute.title === attributeValue.key
        );
        return {
          type: attribute?.type || '',
          key: attributeValue.key,
          value: attributeValue.value,
        };
      }) || []
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <UpdateAdContainer
        ad={ad.findAdByIdentifier}
        mainCategories={mainCategories.findAllMainCategories}
        user={user.currentUser}
        initialAttributes={initialAttributes()}
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
