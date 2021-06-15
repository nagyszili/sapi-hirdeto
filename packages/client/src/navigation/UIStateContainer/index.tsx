import { withResponsiveness } from '../../hooks/withResponsiveness';
import { UIStateContainer as Large } from './UIStateContainer.large';
import { UIStateContainer as Small } from './UIStateContainer.small';

export const UIStateContainer: React.FC<{}> = (props) =>
  withResponsiveness<{}>(Small, Large)(props);
