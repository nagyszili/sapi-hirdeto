import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { FavoritesComponent as Large } from './FavoritesComponent.large';
import { FavoritesComponentProps } from './FavoritesComponent.props';
import { FavoritesComponent as Small } from './FavoritesComponent.small';

export const FavoritesComponent: React.FC<FavoritesComponentProps> = (props) =>
  withResponsiveness<FavoritesComponentProps>(Small, Large)(props);
