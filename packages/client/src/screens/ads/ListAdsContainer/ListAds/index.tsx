import { withResponsiveness } from '../../../../hooks/withResponsiveness';
import { ListAds as Large } from './ListAds.large';
import { ListAdsProps } from './ListAds.props';
import { ListAds as Small } from './ListAds.small';

export const ListAds: React.FC<ListAdsProps> = (props) =>
  withResponsiveness<ListAdsProps>(Small, Large)(props);
