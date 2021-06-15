import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { CreateAdComponent as Large } from './CreateAdComponent.large';
import { CreateAdComponentProps } from './CreateAdComponent.props';
import { CreateAdComponent as Small } from './CreateAdComponent.small';

export const CreateAdComponent: React.FC<CreateAdComponentProps> = (props) =>
  withResponsiveness<CreateAdComponentProps>(Small, Large)(props);
