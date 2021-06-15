import { withResponsiveness } from '../../hooks/withResponsiveness';
import { SearchBarComponent as Large } from './SearchBarComponent.large';
import { SearchBarComponentProps } from './SearchBarComponent.props';
import { SearchBarComponent as Small } from './SearchBarComponent.small';

export const SearchBarComponent: React.FC<SearchBarComponentProps> = (props) =>
  withResponsiveness<SearchBarComponentProps>(Small, Large)(props);
