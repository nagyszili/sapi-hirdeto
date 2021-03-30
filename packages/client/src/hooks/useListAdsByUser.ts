import { useRef } from 'react';

import { useAdsByUser } from '../apollo/ad/useAdsByUser';

export const useListAdsByUser = (perPage?: number, page?: number) => {
  const pageRef = useRef(page || 0);

  const { data: ads, loading: loadingAds, fetchMore, refetch } = useAdsByUser({
    page: pageRef.current,
    perPage,
  });

  const fetchMoreAds = () => {
    pageRef.current = pageRef.current + 1;
    fetchMore({
      variables: {
        page: pageRef.current,
        perPage,
      },
    });
  };

  const refetchAds = (page = 0, adsPerPage = perPage) => {
    refetch({ page, perPage: adsPerPage });
  };

  return {
    ads: ads?.findAdsByUser,
    loadingAds,
    fetchMoreAds,
    refetchAds,
    page: pageRef,
  };
};
