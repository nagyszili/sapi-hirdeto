import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Filter } from '../../apollo/types/graphql-global-types';

export interface AdsComponentProps {
  searchString?: string;
  search: (query: string) => void;
  searchInDescription: boolean;
  setSearchInDescription: (searchInDescription: boolean) => void;
  mainCategories?: AllMainCategories_findAllMainCategories[];
  selectedMainCategory?: string;
  setSelectedMainCategory?: (category: string) => void;
  categories?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier[];
  selectedCategory?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  setSelectedCategory?: (category: string) => void;
  filters?: Filter[];
}
