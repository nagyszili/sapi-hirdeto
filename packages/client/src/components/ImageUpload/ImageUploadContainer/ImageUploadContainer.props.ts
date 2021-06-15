import { ImageUpdate } from '../../../apollo/types/graphql-global-types';

export interface ImageUploadContainerProps {
  setImages: React.Dispatch<React.SetStateAction<ImageUpdate[]>>;
  images: ImageUpdate[];
  setThumbnail: React.Dispatch<React.SetStateAction<ImageUpdate | undefined>>;
  thumbnail: ImageUpdate | undefined;
  setDeletedImages?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}
