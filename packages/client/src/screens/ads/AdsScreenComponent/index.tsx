import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { AdsScreenComponent as Large } from './AdsScreenComponent.large';
import { AdsScreenComponentProps } from './AdsScreenComponent.props';
import { AdsScreenComponent as Small } from './AdsScreenComponent.small';

export const AdsScreenComponent: React.FC<AdsScreenComponentProps> = (props) =>
  withResponsiveness<AdsScreenComponentProps>(Small, Large)(props);
