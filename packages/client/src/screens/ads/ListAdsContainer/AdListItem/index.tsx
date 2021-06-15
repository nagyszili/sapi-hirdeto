import { withResponsiveness } from '../../../../hooks/withResponsiveness';
import { AdItemProps } from '../AdItemProps';
import { AdListItem as Large } from './AdListItem.large';
import { AdListItem as Small } from './AdListItem.small';

export const AdListItem: React.FC<AdItemProps> = (props) =>
  withResponsiveness<AdItemProps>(Small, Large)(props);
