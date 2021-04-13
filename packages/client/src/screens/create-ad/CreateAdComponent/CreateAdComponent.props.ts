import { AllMainCategories_findAllMainCategories } from '../../../apollo/types/AllMainCategories';
import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../../apollo/types/CategoriesByMainCategoryIdentifier';
import { CurrentUser_currentUser } from '../../../apollo/types/CurrentUser';
import {
  AttributeValueInput,
  LocationInput,
  ImageInput,
} from '../../../apollo/types/graphql-global-types';
import { Element } from '../../../components/Filters/Select/SelectInput.props';

export interface CreateAdComponentProps {
  titleRef: React.MutableRefObject<any>;
  descriptionRef: React.MutableRefObject<any>;
  priceRef: React.MutableRefObject<any>;
  userNameRef: React.MutableRefObject<any>;
  phoneNumberRef: React.MutableRefObject<any>;
  user?: CurrentUser_currentUser;
  currencies: Element[];
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
  selectedLocation?: LocationInput;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationInput | undefined>
  >;
  images: ImageInput[];
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
  createAd: () => Promise<void>;
}
