import { useComponentSize } from '../../hooks/useComponentSize';
import { linkingConfig as largeLinkingConfig } from './LinkingConfiguration.large';
import { linkingConfig as smallLinkingConfig } from './LinkingConfiguration.small';
import { LinkingConfig } from './types';

const linkingConfig = {
  small: smallLinkingConfig,
  large: largeLinkingConfig,
};

export const useLinkingConfig = (): LinkingConfig => {
  const componentSize = useComponentSize();
  return linkingConfig[componentSize];
};
