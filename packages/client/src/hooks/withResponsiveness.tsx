import * as React from 'react';

import { useComponentSize } from './useComponentSize';

export function withResponsiveness<Props>(
  SmallComponent: React.ComponentType<Props>,
  LargeComponent: React.ComponentType<Props>
) {
  return (props: Props, ref?: any) => {
    const componentSize = useComponentSize();

    switch (componentSize) {
      case 'small':
        return <SmallComponent ref={ref} {...props} />;
      case 'large':
        return <LargeComponent ref={ref} {...props} />;
    }
  };
}
