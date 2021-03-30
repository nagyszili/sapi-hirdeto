import { AdImageInput } from '../../../apollo/types/graphql-global-types';

export interface ImageUploadContainerProps {
  setImages: React.Dispatch<React.SetStateAction<AdImageInput[]>>;
  images: AdImageInput[];
}
