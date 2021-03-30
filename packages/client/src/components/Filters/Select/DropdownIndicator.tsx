import * as React from 'react';
import { components } from 'react-select';

import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="sort" color={Color.greyMediumColor} />
    </components.DropdownIndicator>
  );
};
