import { Document } from 'mongoose';

export const modelToObject = (
  model: Document,
  additionalAttribute?: Record<string, unknown>,
): any => {
  return { ...model.toObject({ getters: true }), ...additionalAttribute };
};
