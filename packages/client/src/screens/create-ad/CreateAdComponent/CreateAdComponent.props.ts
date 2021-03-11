import { AllMainCategories_findAllMainCategories } from '../../../apollo/types/AllMainCategories';
import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../../apollo/types/CategoriesByMainCategoryIdentifier';
import {
  AttributeValueInput,
  LocationInput,
  AdImageInput,
} from '../../../apollo/types/graphql-global-types';
import { Currency } from '../CreateAdScreen';

export interface CreateAdComponentProps {
  titleRef: React.MutableRefObject<any>;
  descriptionRef: React.MutableRefObject<any>;
  priceRef: React.MutableRefObject<any>;
  currencies: Currency[];
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  mainCategories: AllMainCategories_findAllMainCategories[];
  mainCategoryIdentifier: string;
  setMainCategoryIdentifier: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier[];
  categoryIdentifier: string;
  setCategoryIdentifier: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  selectedCounty: string;
  attributes: AttributeValueInput[];
  setAttributes: React.Dispatch<React.SetStateAction<AttributeValueInput[]>>;
  setSelectedCounty: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationInput | undefined>
  >;
  setImages: React.Dispatch<React.SetStateAction<AdImageInput[]>>;
  createAd: () => Promise<void>;
}
