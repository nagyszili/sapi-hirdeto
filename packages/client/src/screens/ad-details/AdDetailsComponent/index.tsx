import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { AdDetailsComponent as Large } from './AdDetailsComponent.large';
import { AdDetailsComponentProps } from './AdDetailsComponent.props';
import { AdDetailsComponent as Small } from './AdDetailsComponent.small';

export const AdDetailsComponent: React.FC<AdDetailsComponentProps> = (props) =>
  withResponsiveness<AdDetailsComponentProps>(Small, Large)(props);
