import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { MainHeader as Large } from './MainHeader.large';
import { MainHeaderProps } from './MainHeader.props';
import { MainHeader as Small } from './MainHeader.small';

export const MainHeader: React.FC<MainHeaderProps> = (props) =>
  withResponsiveness<MainHeaderProps>(Small, Large)(props);
