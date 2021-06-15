import { AdsByUser_findAdsByUser } from '../../../apollo/types/AdsByUser';
import { CurrentUser_currentUser } from '../../../apollo/types/CurrentUser';

export interface MyAdsComponentProps {
  user?: CurrentUser_currentUser;
  ads?: AdsByUser_findAdsByUser[];
  fetchMoreAds: () => void;
  refetchAds: (page?: number, adsPerPage?: number | undefined) => void;
}
