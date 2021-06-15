import { ListTypeEnum } from '../../../../apollo/types';
import { AllAds_findAllAds } from '../../../../apollo/types/AllAds';
import { CurrentUser_currentUser } from '../../../../apollo/types/CurrentUser';

export interface ListAdsProps {
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  numberOfAds?: number;
  ads?: AllAds_findAllAds[];
  refetch?: (page?: number, perPage?: number) => void;
  fetchMore?: () => void;
  loading?: boolean;
  user?: CurrentUser_currentUser;
  page: React.MutableRefObject<number>;
  adsPerPage: number;
  listType?: ListTypeEnum;
}
