import { AllMainCategories_findAllMainCategories } from '../../../apollo/types/AllMainCategories';
import { LocationQueryInput } from '../../../apollo/types/graphql-global-types';

export interface HomeComponentProps {
  mainCategories: AllMainCategories_findAllMainCategories[];
  setLocation?: (location?: LocationQueryInput | null) => void;
  location?: LocationQueryInput | null;
  shouldScrollToTop?: boolean | null;
  creatorId?: string | null;
}
