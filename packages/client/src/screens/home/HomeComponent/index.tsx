import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { HomeComponent as Large } from './HomeComponent.large';
import { HomeComponentProps } from './HomeComponent.props';
import { HomeComponent as Small } from './HomeComponent.small';

export const HomeComponent: React.FC<HomeComponentProps> = (props) =>
  withResponsiveness<HomeComponentProps>(Small, Large)(props);
