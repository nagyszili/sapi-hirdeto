import { gql, useMutation } from '@apollo/client';

import { CreateAdVariables, CreateAd } from '../types/CreateAd';

export const CREATE_AD = gql`
  mutation CreateAd(
    $name: String!
    $price: Float!
    $currency: String!
    $description: String!
    $images: [AdImageInput!]
    $location: LocationInput!
    $categoryId: String!
    $attributeValues: [AttributeValueInput!]
  ) {
    createAd(
      name: $name
      price: $price
      categoryId: $categoryId
      currency: $currency
      description: $description
      images: $images
      location: $location
      attributeValues: $attributeValues
    ) {
      id
      identifier
      name
    }
  }
`;

export const useCreateAd = () =>
  useMutation<CreateAd, CreateAdVariables>(CREATE_AD);
