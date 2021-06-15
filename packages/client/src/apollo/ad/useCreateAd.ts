import { gql, useMutation } from '@apollo/client';

import { CreateAdVariables, CreateAd } from '../types/CreateAd';

export const CREATE_AD = gql`
  mutation CreateAd(
    $name: String!
    $price: Float!
    $currency: String!
    $negotiable: Boolean!
    $description: String!
    $images: [ImageInput!]
    $thumbnail: ImageInput
    $location: LocationInput!
    $categoryId: String!
    $attributeValues: [AttributeValueInput!]
  ) {
    createAd(
      name: $name
      price: $price
      categoryId: $categoryId
      currency: $currency
      negotiable: $negotiable
      description: $description
      images: $images
      thumbnail: $thumbnail
      location: $location
      attributeValues: $attributeValues
    ) {
      id
      identifier
      name
      price
      currency
      description
      createdAt
      updatedAt
      thumbnail
      numberOfImages
      user {
        id
      }
      location {
        name
        county
      }
    }
  }
`;

export const useCreateAd = () =>
  useMutation<CreateAd, CreateAdVariables>(CREATE_AD, {
    refetchQueries: ['AdsByUser', 'AllAds', 'CurrentUser'],
  });
