import { AllMainCategories_findAllMainCategories } from '../../../apollo/types/AllMainCategories';

export interface MainCategoryItemProps {
  item: AllMainCategories_findAllMainCategories;
  setMainCategoryIdentifier: (mainCategoryIdentifier: string) => void;
}
