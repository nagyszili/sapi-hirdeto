import Constants from 'expo-constants';
import React from 'react';
import { MetaTags as ReactMetaTags } from 'react-meta-tags';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  imageWidth?: string;
  imageHeight?: string;
}

export const MetaTags: React.FC<Props> = ({
  title = 'Sapi-Hirdető',
  description = 'Vásárolj vagy hirdess nálunk!',
  image,
  url = `${Constants?.manifest?.extra?.clientUrl}`,
  imageHeight = '500',
  imageWidth = '500',
}) => {
  return (
    <ReactMetaTags>
      {description && <meta property="og:description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      {imageWidth && <meta property="og:image:width" content={imageWidth} />}
      {imageHeight && <meta property="og:image:height" content={imageHeight} />}
      <meta property="og:locale" content="hu_HU" />
      <meta property="og:site_name" content="Sapi-Hirdető" />
      <meta property="og:type" content="website" />
      <meta property="og:app_id" content="481847872929237" />
      <meta property="fb:app_id" content="481847872929237" />
    </ReactMetaTags>
  );
};
