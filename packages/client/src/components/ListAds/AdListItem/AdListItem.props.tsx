import { AllAds_findAllAds } from '../../../apollo/types/AllAds';

export interface AdListItemProps {
  item: AllAds_findAllAds;
  index: number;
  favorite: boolean;
}
