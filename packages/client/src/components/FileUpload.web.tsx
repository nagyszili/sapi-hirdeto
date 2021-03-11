import React from 'react';

import { AdImageInput } from '../apollo/types/graphql-global-types';

interface Props {
  setImages: React.Dispatch<React.SetStateAction<AdImageInput[]>>;
}

export const FileUpload: React.FC<Props> = ({ setImages }) => {
  const onChange = ({ target: { files } }: any) => {
    Object.values(files).forEach((image) => {
      setImages((oldValue) => [...oldValue, { isThumbnail: true, image }]);
    });
  };

  return (
    <>
      <input type="file" required onChange={onChange} multiple />
    </>
  );
};
