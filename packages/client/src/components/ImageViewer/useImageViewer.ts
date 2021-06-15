import { useState, useEffect } from 'react';

import placeholder from '../../../assets/images/placeholderImage.png';
import { AdByIdentifier_findAdByIdentifier_images } from '../../apollo/types/AdByIdentifier';

interface Props {
  images: AdByIdentifier_findAdByIdentifier_images[];
}
export const useImageViewer = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fullImages, setFullImages] = useState(
    [...images]
      .sort((a, b) => a.priority - b.priority)
      .map((img) => ({ src: img.url }))
  );
  useEffect(() => {
    setFullImages(
      [...images]
        .sort((a, b) => a.priority - b.priority)
        .map((img) => ({ src: img.url }))
    );
    setCurrentImage(0);
    setCurrentFullImage(0);
  }, [images]);
  const [isFullImageVisible, setIsFullImageVisible] = useState(false);
  const [currentFullImage, setCurrentFullImage] = useState(0);
  const gotoImg = (index: number) => {
    setCurrentFullImage(index);
  };

  const onClose = () => {
    setIsFullImageVisible(false);
    setCurrentFullImage(0);
  };

  const openImgsViewer = () => {
    if (images.length) {
      setCurrentFullImage(currentImage);
      setIsFullImageVisible(true);
    }
  };

  const onLeftClick = () =>
    setCurrentImage((oldValue) =>
      oldValue === 0 ? images.length - 1 : --oldValue
    );

  const onRightClick = () =>
    setCurrentImage((oldValue) =>
      oldValue === images.length - 1 ? 0 : ++oldValue
    );

  const loadFallbackImage = (index: number) => {
    setFullImages((oldImages) =>
      oldImages.map((image, key) =>
        key === index ? { src: placeholder } : image
      )
    );
  };

  return {
    loadFallbackImage,
    onRightClick,
    onLeftClick,
    openImgsViewer,
    onClose,
    gotoImg,
    fullImages,
    currentImage,
    currentFullImage,
    isFullImageVisible,
    setCurrentFullImage,
    setCurrentImage,
  };
};
