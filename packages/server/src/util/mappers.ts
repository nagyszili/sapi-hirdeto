import { Document } from 'mongoose';

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
