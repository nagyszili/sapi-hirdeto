import { ImageInput } from '../../../apollo/types/graphql-global-types';

export interface ImageUploadContainerProps {
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
  images: ImageInput[];
}
