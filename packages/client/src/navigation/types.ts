import { RouteProp } from '@react-navigation/native';

import { LocationInput, Filter } from '../apollo/types/graphql-global-types';

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
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  CreateAd: undefined;
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
  AdDetailsScreen: {
    identifier: string;
  };
};

export type ProfileParamList = {
  Profile: undefined;
};

export type CreateAdParamList = {
  CreateAd: undefined;
};

export type AdsScreenRouteProp = RouteProp<RootStackParamList, 'AdsScreen'>;

export type AdDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'AdDetailsScreen'
>;
