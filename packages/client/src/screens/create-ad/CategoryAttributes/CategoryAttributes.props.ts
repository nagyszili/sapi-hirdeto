import {
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
} from '../../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Element } from '../../../components/Filters/Select/SelectInput.props';

export interface CategoryAttributesProps {
  selectedCategory: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  getError: (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => string | undefined;
  getSelectedAttribute: (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => string | undefined;
  onChangeAttribute: (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => (value: string) => void;
  getPossibleValues: (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => Element[];
}
