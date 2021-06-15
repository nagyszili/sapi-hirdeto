import { AdsByIds_findAdsByIds } from '../../../../apollo/types/AdsByIds';
import { AdsByUser_findAdsByUser } from '../../../../apollo/types/AdsByUser';
import { AllAds_findAllAds } from '../../../../apollo/types/AllAds';
import { CurrentUser_currentUser } from '../../../../apollo/types/CurrentUser';
import { FavoriteAds_findFavoriteAdsByUser } from '../../../../apollo/types/FavoriteAds';

export interface AdItemProps {
  item:
    | AllAds_findAllAds
    | AdsByIds_findAdsByIds
    | AdsByUser_findAdsByUser
    | FavoriteAds_findFavoriteAdsByUser;
  user?: CurrentUser_currentUser;
  hideAdToFavorite?: boolean;
}
