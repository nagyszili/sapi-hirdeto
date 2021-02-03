import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesByMainCategoryId_findCategoriesByMainCategoryId } from '../../apollo/types/CategoriesByMainCategoryId';
import { Filter } from '../../apollo/types/graphql-global-types';

export interface SearchBarComponentProps {
  searchString?: string;
  search: (query: string) => void;
  searchInDescription: boolean;
  setSearchInDescription: (searchInDescription: boolean) => void;
  mainCategories?: AllMainCategories_findAllMainCategories[];
  selectedMainCategory?: string;
  setSelectedMainCategory?: (category: string) => void;
  categories?: CategoriesByMainCategoryId_findCategoriesByMainCategoryId[];
  selectedCategory?: CategoriesByMainCategoryId_findCategoriesByMainCategoryId;
  setSelectedCategory?: (category: string) => void;
  filters?: Filter[];
  setFilters?: React.Dispatch<React.SetStateAction<Filter[]>>;
}
