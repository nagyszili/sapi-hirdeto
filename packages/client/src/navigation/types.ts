import { RouteProp } from '@react-navigation/native';

import {
  Filter,
  LocationQueryInput,
} from '../apollo/types/graphql-global-types';
import { Element } from '../components/Filters/Select/SelectInput.props';

export type RootStackParamList = {
  HomeScreen: {
    location?: LocationQueryInput | null;
    top?: boolean | null;
    creatorId?: string | null;
  };
  AdsScreen: {
    page?: number | null;
    perPage?: number | null;
    sortField?: string | null;
    sortOrder?: string | null;
    query?: string | null;
    mainCategoryIdentifier?: string | null;
    categoryIdentifier?: string | null;
    inDescription?: boolean | null;
    location?: LocationQueryInput | null;
    creatorId?: string | null;
    filters?: Filter[] | null;
  };
  AdDetailsScreen: {
    identifier: string;
  };
  UpdateAdScreen: {
    identifier: string;
  };
  NotFound: undefined;
  FiltersScreen: {
    query?: string | null;
    mainCategoryIdentifier?: string | null;
    categoryIdentifier?: string | null;
    inDescription?: boolean | null;
    filters?: Filter[] | null;
  };
  FullScreenSelect: {
    elements: Element[];
    selectedElement?: any;
    setSelectedElement: (element: any) => void;
    placeholder?: string;
    label?: string;
    isSearchable?: boolean;
  };
  FullScreenMultiSelect: {
    elements: Element[];
    selectedElements: any[];
    setSelectedElements: (elements: any[]) => void;
    placeholder?: string;
    label?: string;
    isSearchable?: boolean;
  };
};

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

export type AdsScreenRouteProp = RouteProp<RootStackParamList, 'AdsScreen'>;

export type UpdateAdScreenRouteProp = RouteProp<
  RootStackParamList,
  'UpdateAdScreen'
>;

export type AdDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'AdDetailsScreen'
>;

export type FullScreenSelectRouteProp = RouteProp<
  RootStackParamList,
  'FullScreenSelect'
>;

export type FullScreenMultiSelectRouteProp = RouteProp<
  RootStackParamList,
  'FullScreenMultiSelect'
>;

export type FiltersScreenRouteProp = RouteProp<
  RootStackParamList,
  'FiltersScreen'
>;
