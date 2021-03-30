import { RouteProp } from '@react-navigation/native';

import { LocationInput, Filter } from '../apollo/types/graphql-global-types';
import { Element } from '../components/Filters/Select/SelectInput.props';

export type RootStackParamList = {
  HomeScreen: undefined;
  AdsScreen: {
    page?: number | null;
    perPage?: number | null;
    sortField?: string | null;
    sortOrder?: string | null;
    query?: string | null;
    mainCategoryIdentifier?: string | null;
    categoryIdentifier?: string | null;
    inDescription?: boolean | null;
    location?: LocationInput | null;
    filters?: Filter[] | null;
  };
  AdDetailsScreen: {
    identifier: string;
  };
  NotFound: undefined;
  FullScreenSelect: {
    elements: Element[];
    selectedElement?: any;
    setSelectedElement: (element: any) => void;
    placeholder?: string;
    label?: string;
    isSearchable?: boolean;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  CreateAd: undefined;
  MyAds: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  Home: undefined;
  AdsScreen: {
    page?: number | null;
    perPage?: number | null;
    sortField?: string | null;
    sortOrder?: string | null;
    query?: string | null;
    mainCategoryIdentifier?: string | null;
    categoryIdentifier?: string | null;
    inDescription?: boolean | null;
    location?: LocationInput | null;
    filters?: Filter[] | null;
  };
};

export type ProfileParamList = {
  Profile: undefined;
};

export type CreateAdParamList = {
  CreateAd: undefined;
};

export type FavoritesParamList = {
  Favorites: undefined;
};

export type MyAdsParamList = {
  MyAds: undefined;
};

export type AdsScreenRouteProp = RouteProp<RootStackParamList, 'AdsScreen'>;

export type AdDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'AdDetailsScreen'
>;

export type FullScreenSelectRouteProp = RouteProp<
  RootStackParamList,
  'FullScreenSelect'
>;
