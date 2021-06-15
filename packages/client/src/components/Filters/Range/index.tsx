import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { RangeFilter as Large } from './RangeFilter.large';
import { RangeFilterProps } from './RangeFilter.props';
import { RangeFilter as Small } from './RangeFilter.small';

export const RangeFilter: React.FC<RangeFilterProps> = (props) =>
  withResponsiveness<RangeFilterProps>(Small, Large)(props);
