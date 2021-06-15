export interface PreviewImageProps {
  image: string;
  deleteImage: () => void;
  isThumbnail?: boolean;
  setThumbnail: () => void;
  rotate: () => void;
}
