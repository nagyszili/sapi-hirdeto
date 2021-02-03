import * as React from 'react';
import { useState } from 'react';

import { Filter } from '../../apollo/types/graphql-global-types';
import { useListAds } from '../../hooks/useListAds';
import { Fetching } from './../Fetching';
import { ListAds } from './ListAds';

interface Props {
  categoryId?: string;
  mainCategoryId?: string;
  queryString?: string;
  searchInDescription?: boolean;
  filters: Filter[];
}

export const ListAdsContainer: React.FC<Props> = ({
  categoryId,
  mainCategoryId,
  queryString,
  searchInDescription,
  filters,
}) => {
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
    categoryId,
    mainCategoryId,
    queryString,
    searchInDescription,
    filters,
  );

  if (!ads || loadingAds || numberOfAds === undefined) {
    return <Fetching />;
  }

  return (
    <ListAds
      ads={ads}
      fetchMore={fetchMoreAds}
      refetch={refetchAds}
      loading={loadingAds}
      page={page}
      numberOfAds={numberOfAds}
      adsPerPage={adsPerPage}
    />
  );
};
