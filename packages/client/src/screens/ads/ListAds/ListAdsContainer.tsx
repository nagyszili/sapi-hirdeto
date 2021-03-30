import * as React from 'react';
import { useState } from 'react';
import { Platform, Text } from 'react-native';

import { Filter } from '../../../apollo/types/graphql-global-types';
import { useCurrentUser } from '../../../apollo/user/useCurrentUser';
import { Fetching } from '../../../components/Fetching';
import { PaginationComponent } from '../../../components/PaginationComponent.web';
import { useListAds } from '../../../hooks/useListAds';
import { ListAds } from './ListAds';

interface Props {
  categoryIdentifier?: string;
  mainCategoryIdentifier?: string;
  queryString?: string;
  searchInDescription?: boolean;
  filters?: Filter[];
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export const ListAdsContainer: React.FC<Props> = ({
  categoryIdentifier,
  mainCategoryIdentifier,
  queryString,
  searchInDescription,
  filters,
  ListHeaderComponent,
}) => {
  // const navigation = useNavigation();
  const { data: user } = useCurrentUser();

  const [adsPerPage] = useState(10);
  const {
    ads,
    numberOfAds,
    loadingAds,
    loadingCount,
    fetchMoreAds,
    refetchAds,
    page,
  } = useListAds(
    adsPerPage,
    categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    searchInDescription,
    filters
  );

  // useEffect(() => {
  //   navigation.setParams({ page: page.current });
  // }, [page.current]);

  // useEffect(() => {
  //   navigation.setParams({ perPage: adsPerPage });
  // }, [adsPerPage]);

  if (loadingAds || loadingCount) {
    return <Fetching />;
  }

  if (!ads || ads.length === 0 || numberOfAds === undefined) {
    return <Text>No ads found</Text>;
  }

  return (
    <>
      <ListAds
        numberOfAds={numberOfAds}
        ads={ads}
        fetchMore={fetchMoreAds}
        refetch={refetchAds}
        loading={loadingAds}
        user={user?.currentUser}
        ListHeaderComponent={ListHeaderComponent}
      />
      {Platform.OS === 'web' && (
        <PaginationComponent
          numberOfAds={numberOfAds}
          refetch={refetchAds}
          page={page}
          adsPerPage={adsPerPage}
        />
      )}
    </>
  );
};
