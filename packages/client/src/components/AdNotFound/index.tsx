import { withResponsiveness } from '../../hooks/withResponsiveness';
import { AdNotFoundComponent as Large } from './AdNotFoundComponent.large';
import { AdNotFoundComponent as Small } from './AdNotFoundComponent.small';

export const AdNotFoundComponent: React.FC<{}> = (props) =>
  withResponsiveness<{}>(Small, Large)(props);
