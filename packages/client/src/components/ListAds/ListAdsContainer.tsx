import * as React from 'react';
import { useState } from 'react';
import { Platform, Text } from 'react-native';

import { Filter } from '../../apollo/types/graphql-global-types';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { useListAds } from '../../hooks/useListAds';
import { PaginationComponent } from '../PaginationComponent.web';
import { Fetching } from './../Fetching';
import { ListAds } from './ListAds';

interface Props {
  categoryIdentifier?: string;
  mainCategoryIdentifier?: string;
  queryString?: string;
  searchInDescription?: boolean;
  filters?: Filter[];
}

export const ListAdsContainer: React.FC<Props> = ({
  categoryIdentifier,
  mainCategoryIdentifier,
  queryString,
  searchInDescription,
  filters,
}) => {
  // const navigation = useNavigation();
  const { data: user } = useCurrentUser();

  const [adsPerPage] = useState(5);
  const {
    ads,
    numberOfAds,
    loadingAds,
    fetchMoreAds,
    refetchAds,
    page,
  } = useListAds(
    adsPerPage,
    categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    searchInDescription,
    filters,
  );

  // useEffect(() => {
  //   navigation.setParams({ page: page.current });
  // }, [page.current]);

  // useEffect(() => {
  //   navigation.setParams({ perPage: adsPerPage });
  // }, [adsPerPage]);

  if (loadingAds) {
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
