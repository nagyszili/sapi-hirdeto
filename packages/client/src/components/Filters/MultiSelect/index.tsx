import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { MultiSelect as Large } from './MultiSelect.large';
import { MultiSelectProps } from './MultiSelect.props';
import { MultiSelect as Small } from './MultiSelect.small';

export const MultiSelect: React.FC<MultiSelectProps> = (props) =>
  withResponsiveness<MultiSelectProps>(Small, Large)(props);
