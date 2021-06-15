import { withResponsiveness } from '../../../hooks/withResponsiveness';
import { SelectInput as Large } from './SelectInput.large';
import { SelectInputProps } from './SelectInput.props';
import { SelectInput as Small } from './SelectInput.small';

export const SelectInput: React.FC<SelectInputProps> = (props) =>
  withResponsiveness<SelectInputProps>(Small, Large)(props);
