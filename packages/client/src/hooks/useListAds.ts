import * as React from 'react';
import { useEffect } from 'react';

import { useAllAds } from '../apollo/ad/useAllAds';
import { useCountAds } from '../apollo/ad/useCountAds';
import { useActiveCurrency } from '../apollo/filters/useActiveCurrency';
import { currencyVar } from '../apollo/reactiveVariables';
import { Filter } from '../apollo/types/graphql-global-types';

export const useListAds = (
  adsPerPage: number,
  categoryId?: string,
  mainCategoryId?: string,
  queryString?: string,
  inDescription?: boolean,
  filters?: Filter[],
) => {
  const { data: currency } = useActiveCurrency();
  const page = React.useRef(0);

  const { data: ads, loading: loadingAds, fetchMore, refetch } = useAllAds({
    categoryId: categoryId === 'all' ? null : categoryId,
    mainCategoryId,
    queryString,
    inDescription,
    page: 0,
    perPage: adsPerPage,
    currency: currency!.currency,
    filters,
  });

  const { data: numberOfAds } = useCountAds({
    categoryId: categoryId === 'all' ? null : categoryId,
    mainCategoryId,
    queryString,
    inDescription,
    currency: currencyVar(),
    filters,
  });

  useEffect(() => {
    page.current = 0;
  }, [queryString, mainCategoryId, categoryId, filters, inDescription]);

  const fetchMoreAds = () => {
    page.current = page.current + 1;
    fetchMore({
      variables: {
        page: page.current,
      },
    });
  };

  const refetchAds = (page = 0, perPage = adsPerPage) => {
    refetch({ page, perPage });
  };

  return {
    ads: ads?.findAllAds,
    numberOfAds: numberOfAds?.countAllAds,
    loadingAds,
    fetchMoreAds,
    refetchAds,
    page,
  };
};
