import { AdByIdentifier_findAdByIdentifier } from '../../../apollo/types/AdByIdentifier';
import { CurrentUser_currentUser } from '../../../apollo/types/CurrentUser';

export interface AdDetailsComponentProps {
  ad: AdByIdentifier_findAdByIdentifier;
  user?: CurrentUser_currentUser;
  isAdBelongsToUser?: boolean;
  setAdStatus: (status: string) => void;
  actualizeAd: () => void;
  canActualize: () => boolean;
  deleteAd: () => void;
}
