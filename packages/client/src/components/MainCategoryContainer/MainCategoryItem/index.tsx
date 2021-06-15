import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { MainCategoryItem as Large } from './MainCategoryItem.large';
import { MainCategoryItemProps } from './MainCategoryItem.props';
import { MainCategoryItem as Small } from './MainCategoryItem.small';

export const MainCategoryItem: React.FC<MainCategoryItemProps> = (props) =>
  withResponsiveness<MainCategoryItemProps>(Small, Large)(props);
