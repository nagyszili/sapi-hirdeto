import { gql, useMutation } from '@apollo/client';

import { UpdateAd, UpdateAdVariables } from '../types/UpdateAd';

export const UPDATE_AD = gql`
  mutation UpdateAd(
    $id: String!
    $name: String!
    $price: Float!
    $currency: String!
    $negotiable: Boolean!
    $description: String!
    $images: [ImageUpdate!]
    $location: LocationInput!
    $categoryId: String!
    $attributeValues: [AttributeValueInput!]
    $deletedImages: [String!]
    $thumbnail: ImageUpdate
  ) {
    updateAd(
      id: $id
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
      deletedImages: $deletedImages
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

export const useUpdateAd = () =>
  useMutation<UpdateAd, UpdateAdVariables>(UPDATE_AD, {
    refetchQueries: ['AllAds', 'AdByIdentifier'],
  });
