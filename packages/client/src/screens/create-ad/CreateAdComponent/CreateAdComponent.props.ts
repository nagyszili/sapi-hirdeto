import { AllMainCategories_findAllMainCategories } from '../../../apollo/types/AllMainCategories';
import {
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
} from '../../../apollo/types/CategoriesByMainCategoryIdentifier';
import { CurrentUser_currentUser } from '../../../apollo/types/CurrentUser';
import {
  LocationInput,
  ImageUpdate,
} from '../../../apollo/types/graphql-global-types';
import { Element } from '../../../components/Filters/Select/SelectInput.props';

export interface CreateAdComponentProps {
  mainCategoryError?: string;
  categoryError?: string;
  pageTitle: string;
  submitButtonTitle: string;
  titleRef: React.MutableRefObject<any>;
  titleInitialValue?: string | null;
  descriptionRef: React.MutableRefObject<any>;
  descriptionInitialValue?: string | null;
  priceRef: React.MutableRefObject<any>;
  priceInitialValue?: string | null;
  userNameRef: React.MutableRefObject<any>;
  phoneNumberRef: React.MutableRefObject<any>;
  user?: CurrentUser_currentUser;
  currencies: Element[];
  currency: string;
  negotiableOptions: Element[];
  negotiable: string;
  setNegotiable: React.Dispatch<React.SetStateAction<string>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  mainCategories: AllMainCategories_findAllMainCategories[];
  mainCategoryIdentifier: string;
  setMainCategoryIdentifier: (value: string) => void;
  categories: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier[];
  categoryIdentifier: string;
  setCategoryIdentifier: (value: string) => void;
  selectedCategory?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  selectedCounty: string;
  setSelectedCounty: React.Dispatch<React.SetStateAction<string>>;
  selectedLocation?: LocationInput;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationInput | undefined>
  >;
  images: ImageUpdate[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  setThumbnail: React.Dispatch<React.SetStateAction<any | undefined>>;
  thumbnail: ImageUpdate | undefined;
  submit: () => Promise<void>;
  setDeletedImages?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  countyError?: string;
  locationError?: string;

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
