import { AllAds_findAllAds } from '../../apollo/types/AllAds';

export interface ListAdsProps {
  ads?: AllAds_findAllAds[];
  refetch: (page?: number, perPage?: number) => void;
  fetchMore: () => void;
  loading: boolean;
  numberOfAds: number;
  page: React.MutableRefObject<number>;
  adsPerPage: number;
}
