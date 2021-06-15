import { listTypeVar } from '../reactiveVariables';
import { ListTypeEnum } from '../types';

export const updateListType = (listType: ListTypeEnum) => {
  listTypeVar(listType);
};
