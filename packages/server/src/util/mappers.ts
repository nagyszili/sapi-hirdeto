import { Document } from 'mongoose';
import { Category } from 'src/category/category.type';
import { User } from 'src/user/user.type';
import { MainCategory } from 'src/main-category/main-category.type';
import { AdListItem } from 'src/ad/ad-list-item.type';

export const modelToObject = (
  model: Document,
  additionalAttribute?: Record<string, unknown>,
): any => {
  return { ...model.toObject({ getters: true }), ...additionalAttribute };
};

export const mapModelsToObject = (
  models: Document[],
  additionalAttribute?: Record<string, unknown>,
): any => {
  return models.map((doc) => modelToObject(doc, additionalAttribute));
};

export const mapObjectsToAds = (ads: any[]): AdListItem[] => {
  return ads.map((ad) => ({
    id: ad._id,
    identifier: ad.identifier,
    name: ad.name,
    price: ad.price,
    currency: ad.currency,
    description: ad.description,
    images: ad.images,
    numberOfImages: ad.images.length,
    createdAt: ad.createdAt,
    updatedAt: ad.updatedAt,
    location: ad.location,
    views: ad.views,
    thumbnail: ad.thumbnail,
    attributeValues: ad.attributeValues,
  }));
};

export const mapObjectToCategory = (category: any): Category => {
  return {
    id: category._id,
    mainCategory: mapObjectsToMainCategory(category.mainCategory),
    name: category.name,
    identifier: category.identifier,
    attributes: category.attributes,
  };
};

export const mapObjectToUser = (user: any): User => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    favorites: user.favorites,
  };
};

export const mapObjectsToMainCategory = (mainCategory: any): MainCategory => {
  return {
    id: mainCategory._id,
    identifier: mainCategory.identifier,
    name: mainCategory.name,
  };
};
