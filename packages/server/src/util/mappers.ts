import { Document } from 'mongoose';
import { Category } from 'src/category/category.type';
import { User } from 'src/user/user.type';
import { MainCategory } from 'src/main-category/main-category.type';
import { AdListItem } from 'src/ad/ad-list-item.type';
import { UserAdsList } from 'src/user/user-ads-list.type';

export const modelToObject = (
  model: Document,
  additionalAttribute?: Record<string, unknown>,
): any => {
  return { ...model.toObject({ getters: true }), ...additionalAttribute };
};

export const mapModelsToObject = (models: Document[]): any => {
  return models.map((doc) => modelToObject(doc));
};

export const mapObjectsToAds = (ads: any[]): AdListItem[] => {
  return ads.map((ad) => mapObjectToAd(ad));
};

export const mapObjectToAd = (ad: any): AdListItem => ({
  id: ad._id,
  identifier: ad.identifier,
  name: ad.name,
  price: ad.price,
  negotiable: ad.negotiable,
  status: ad.status,
  currency: ad.currency,
  description: ad.description,
  numberOfImages: ad.images?.length || 0,
  createdAt: ad.createdAt,
  updatedAt: ad.updatedAt,
  actualizedAt: ad.actualizedAt,
  location: ad.location,
  views: ad.views,
  user: mapObjectToUser(ad.user[0] || ad.user),
  thumbnail: ad?.thumbnail?.url,
  attributeValues: ad.attributeValues,
});

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
    role: user.role,
    loginType: user.loginType,
  };
};

export const mapObjectsToMainCategory = (mainCategory: any): MainCategory => {
  return {
    id: mainCategory._id,
    identifier: mainCategory.identifier,
    name: mainCategory.name,
  };
};

export const mapUserToUserAdsList = (user: User): UserAdsList => ({
  ...user,
  favorites: user.favorites.map((ad) => ad.id),
});
