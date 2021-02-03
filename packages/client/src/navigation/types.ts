import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Main: undefined;
  AdsScreen: {
    mainCategoryId?: string;
    categoryId?: string;
    queryString?: string;
    searchInDescription?: boolean;
  };
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  Home: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
};

export type AdsScreenRouteProp = RouteProp<RootStackParamList, 'AdsScreen'>;
