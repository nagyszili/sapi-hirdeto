import { withResponsiveness } from '../../hooks/withResponsiveness';
import { RootNavigator as Large } from './RootNavigator.large';
import { RootNavigator as Small } from './RootNavigator.small';

export const RootNavigator: React.FC<{}> = (props) =>
  withResponsiveness<{}>(Small, Large)(props);
