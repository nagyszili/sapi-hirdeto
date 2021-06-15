/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AttributeValueInput {
  key: string;
  value: string;
  type: string;
}

export interface Filter {
  type: string;
  name: string;
  from?: number | null;
  to?: number | null;
  selectedAttributeValues?: string[] | null;
}

export interface ImageInput {
  priority: number;
  image: any;
}

export interface ImageUpdate {
  url?: string | null;
  image?: any | null;
  priority: number;
}

export interface LocationInput {
  longitude: number;
  latitude: number;
  name: string;
  county: string;
}

export interface LocationQueryInput {
  type: string;
  name: string;
  county?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
