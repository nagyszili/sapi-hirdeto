import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { ProfileScreen as Large } from './ProfileScreen.large';
import { ProfileScreen as Small } from './ProfileScreen.small';

export const ProfileScreen: React.FC<{}> = (props) =>
  withResponsiveness<{}>(Small, Large)(props);
