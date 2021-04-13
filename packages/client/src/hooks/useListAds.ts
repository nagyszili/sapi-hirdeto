import { useRef, useEffect } from 'react';

import { useAllAds } from '../apollo/ad/useAllAds';
import { useCountAds } from '../apollo/ad/useCountAds';
import { useActiveCurrency } from '../apollo/filters/useActiveCurrency';
import { useSortType } from '../apollo/sort/useSortType';
import { Filter } from '../apollo/types/graphql-global-types';

export const useListAds = (
  adsPerPage: number,
  categoryIdentifier?: string,
  mainCategoryIdentifier?: string,
  queryString?: string,
  inDescription?: boolean,
  filters?: Filter[],
  page?: number
) => {
  const { data: currency } = useActiveCurrency();
  const { data: sort } = useSortType();

  const pageRef = useRef(page || 0);

  const { data: ads, loading: loadingAds, fetchMore, refetch } = useAllAds({
    categoryIdentifier:
      categoryIdentifier === 'all' ? null : categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    inDescription,
    sortField: sort?.sortType.sortField,
    sortOrder: sort?.sortType.sortOrder,
    page: pageRef.current,
    perPage: adsPerPage,
    currency: currency!.currency,
    filters,
  });

  const { data: numberOfAds, loading: loadingCount } = useCountAds({
    categoryIdentifier:
      categoryIdentifier === 'all' ? null : categoryIdentifier,
    mainCategoryIdentifier,
    queryString,
    inDescription,
    currency: currency!.currency,
    filters,
  });

  useEffect(() => {
    pageRef.current = 0;
  }, [
    queryString,
    mainCategoryIdentifier,
    categoryIdentifier,
    filters,
    inDescription,
  ]);

  useEffect(() => {
    refetchAds(pageRef.current);
  }, [currency!.currency]);

  const fetchMoreAds = () => {
    pageRef.current = pageRef.current + 1;
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
