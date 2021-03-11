import { AdByIdentifier_findAdByIdentifier } from '../../apollo/types/AdByIdentifier';

export interface AdDetailsComponentProps {
  ad: AdByIdentifier_findAdByIdentifier;
  favorite: boolean;
}
