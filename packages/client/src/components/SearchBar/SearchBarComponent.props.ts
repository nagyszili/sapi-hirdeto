import { LocationQueryInput } from '../../apollo/types/graphql-global-types';

export interface SearchBarComponentProps {
  searchString?: string;
  search: (query: string) => void;
  setLocation?: (location?: LocationQueryInput | null) => void;
  location?: LocationQueryInput | null;
}
