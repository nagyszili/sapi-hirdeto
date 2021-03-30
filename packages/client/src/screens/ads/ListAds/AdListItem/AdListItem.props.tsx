import { AllAds_findAllAds } from '../../../../apollo/types/AllAds';
import {
  CurrentUser_currentUser_favorites,
  CurrentUser_currentUser,
} from '../../../../apollo/types/CurrentUser';

export interface AdListItemProps {
  item: AllAds_findAllAds | CurrentUser_currentUser_favorites;
  index: number;
  user?: CurrentUser_currentUser;
}
