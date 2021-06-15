import { AdsByIds_findAdsByIds } from '../../../apollo/types/AdsByIds';
import { CurrentUser_currentUser } from '../../../apollo/types/CurrentUser';
import { FavoriteAds_findFavoriteAdsByUser } from '../../../apollo/types/FavoriteAds';

export interface FavoritesComponentProps {
  loading?: boolean;
  user?: CurrentUser_currentUser;
  ads?: AdsByIds_findAdsByIds[] | FavoriteAds_findFavoriteAdsByUser[];
}
