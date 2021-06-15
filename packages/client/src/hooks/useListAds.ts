import { useReactiveVar } from '@apollo/client';
import { useRef, useEffect } from 'react';

import { useAllAds } from '../apollo/ad/useAllAds';
import { useCountAds } from '../apollo/ad/useCountAds';
import { currencyVar } from '../apollo/reactiveVariables';
import { SortType } from '../apollo/types';
import {
  Filter,
  LocationQueryInput,
} from '../apollo/types/graphql-global-types';
import { useComponentSize } from './useComponentSize';

interface Props {
  adsPerPage: number;
  categoryIdentifier?: string;
  mainCategoryIdentifier?: string;
  queryString?: string;
  inDescription?: boolean;
  filters?: Filter[];
  location?: LocationQueryInput | null;
  creatorId?: string | null;
  sort?: SortType;
  currency?: string;
}

export const useListAds = ({
  adsPerPage,
  categoryIdentifier,
  mainCategoryIdentifier,
  queryString,
  inDescription,
  filters,
  location,
  creatorId,
  sort,
  currency,
}: Props) => {
  const activeCurrency = useReactiveVar(currencyVar);

  const size = useComponentSize();

  const pageRef = useRef(0);

  useEffect(() => {
    pageRef.current = 0;
    refetchAds();
  }, [
    creatorId,
    queryString,
    mainCategoryIdentifier,
    categoryIdentifier,
    filters,
    inDescription,
    sort,
    location,
    size,
  ]);
  const {
    data: ads,
    loading: loadingAds,
    fetchMore,
    refetch,
  } = useAllAds({
    categoryIdentifier:
      categoryIdentifier === 'all' ? null : categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    inDescription: !!inDescription,
    sortField: sort?.sortField,
    sortOrder: sort?.sortOrder,
    page: pageRef.current,
    perPage: adsPerPage,
    creatorId: creatorId || null,
    currency: currency || activeCurrency,
    location,
    filters,
  });

  const { data: numberOfAds, loading: loadingCount } = useCountAds({
    categoryIdentifier:
      categoryIdentifier === 'all' ? null : categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    inDescription,
    currency: currency || activeCurrency,
    location,
    creatorId,
    filters,
  });

  useEffect(() => {
    !currency && refetchAds(pageRef.current);
  }, [activeCurrency]);

  const fetchMoreAds = () => {
    pageRef.current = pageRef.current + 1;
    fetchMore &&
      fetchMore({
        variables: {
          page: pageRef.current,
        },
      });
  };

  const refetchAds = (page = 0, perPage = adsPerPage) => {
    refetch({ page, perPage });
  };

  return {
    ads: ads?.findAllAds,
    numberOfAds: numberOfAds?.countAllAds,
    loadingCount,
    loadingAds,
    fetchMoreAds,
    refetchAds,
    page: pageRef,
  };
};
