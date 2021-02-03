import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export const navigate = (name: string, params?: any) => {
  // @ts-ignore
  navigationRef.current?.navigate(name, params);
};

export const navigationRef = React.createRef<
  | ((instance: NavigationContainerRef | null) => void)
  | React.RefObject<NavigationContainerRef>
  | null
  | undefined
>();
