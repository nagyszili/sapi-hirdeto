import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { sortTypeVar, isLoggedInVar } from '../../../apollo/reactiveVariables';
import { SortType, ListTypeEnum } from '../../../apollo/types';
import {
  Filter,
  LocationQueryInput,
} from '../../../apollo/types/graphql-global-types';
import { useCurrentUser } from '../../../apollo/user/useCurrentUser';
import { AdNotFoundComponent } from '../../../components/AdNotFound';
import { Fetching } from '../../../components/Fetching';
import { useListAds } from '../../../hooks/useListAds';
import { ListAds } from './ListAds';

interface Props {
  categoryIdentifier?: string;
  mainCategoryIdentifier?: string;
  queryString?: string;
  searchInDescription?: boolean;
  filters?: Filter[];
  location?: LocationQueryInput | null;
  ListHeaderComponent?: any;
  sort?: SortType;
  scrollToTop?: () => void;
  currency?: string;
  creatorId?: string | null;
  listType?: ListTypeEnum;
}

export const ListAdsContainer: React.FC<Props> = ({
  categoryIdentifier,
  mainCategoryIdentifier,
  queryString,
  searchInDescription,
  filters,
  ListHeaderComponent,
  location,
  sort,
  scrollToTop,
  creatorId,
  currency,
  listType,
}) => {
  const { data: user } = useCurrentUser();
  const sortVar = useReactiveVar(sortTypeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [adsPerPage] = useState(10);
  const {
    ads,
    numberOfAds,
    loadingAds,
    loadingCount,
    fetchMoreAds,
    refetchAds,
    page,
  } = useListAds({
    adsPerPage,
    categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    inDescription: searchInDescription,
    filters,
    location,
    creatorId,
    sort: sort || sortVar,
    currency,
  });

  useEffect(() => {
    scrollToTop && scrollToTop();
  }, [page.current]);

  if (loadingAds || loadingCount) {
    return (
      <View style={styles.paddingContainer}>
        <Fetching />
      </View>
    );
  }

  return (
    <ListAds
      page={page}
      adsPerPage={adsPerPage}
      numberOfAds={numberOfAds}
      ads={ads}
      fetchMore={fetchMoreAds}
      refetch={refetchAds}
      loading={loadingAds}
      user={isLoggedIn ? user?.currentUser : undefined}
      listType={listType}
      ListHeaderComponent={() =>
        React.cloneElement(ListHeaderComponent, { numberOfAds })
      }
      ListEmptyComponent={() => (
        <View style={styles.paddingContainer}>
          <AdNotFoundComponent />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    width: '100%',
  },
});
