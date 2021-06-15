import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { MyAdsComponent as Large } from './MyAdsComponent.large';
import { MyAdsComponentProps } from './MyAdsComponent.props';
import { MyAdsComponent as Small } from './MyAdsComponent.small';

export const MyAdsComponent: React.FC<MyAdsComponentProps> = (props) =>
  withResponsiveness<MyAdsComponentProps>(Small, Large)(props);
