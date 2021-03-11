import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';

export interface MainCategoryContainerProps {
  mainCategories: AllMainCategories_findAllMainCategories[];
  setMainCategoryIdentifier: (mainCategoryIdentifier: string) => void;
}
