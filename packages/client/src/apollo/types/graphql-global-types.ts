/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AdImageInput {
  isThumbnail: boolean;
  image: any;
}

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

export interface LocationInput {
  longitude: number;
  latitude: number;
  name: string;
  county: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
