import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { ImageComponent } from '../../../utils/images';
import * as Color from '../../../utils/theme/colors';
import { HoverText } from '../../themed/HoverText';
import { Text } from '../../themed/Text';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { imageResize } from '../imageManipulators';
import { UploadProfilePictureProps } from './UploadProfilePicture.props';

export const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  profilePic,
  setProfilePic,
}) => {
  const [drag, setDrag] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const handleDragOut = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDrag(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addImage(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  const onChange = ({ target: { files } }: any) => addImage(files);

  const toArrayBuffer = (buf: Buffer) => {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  };

  const addImage = (files: any) =>
    Object.values(files).forEach(async (file: any) => {
      if (file && file.type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = async () => {
          const imageType = file.type.split('/');

          const arrayBuffer = reader.result as ArrayBuffer;
          const array = new Uint8Array(arrayBuffer);

          const profileBuffer = await imageResize(Buffer.from(array), 250, 100);
          setProfilePic(
            new File(
              [toArrayBuffer(profileBuffer)],
              `${Date.now()}.${imageType[1] || 'jpg'}`,
              {
                type: file.type,
              }
            )
          );
        };
        reader.readAsArrayBuffer(file);
      }
    });

  const openDialog = () => inputRef.current && inputRef.current.click();

  return (
    <div
      style={
        profilePic
          ? customStyles.container
          : drag
          ? customStyles.containerActive
          : customStyles.containerInactive
      }
      ref={dropRef}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        required
        onChange={onChange}
        accept="image/*"
      />

      <View style={styles.content}>
        {profilePic ? (
          <View style={styles.imagesContainer}>
            <ProfilePicture
              image={
                typeof profilePic === 'string'
                  ? profilePic
                  : URL.createObjectURL(profilePic)
              }
            />
          </View>
        ) : (
          <View style={styles.imagesContainer}>
            <ImageComponent
              name="profilePicPlaceholder"
              style={styles.imageUpload}
            />
          </View>
        )}

        <Text style={styles.text}>
          {texts['dragAPictureOr']}{' '}
          <HoverText onPress={openDialog} style={styles.hoverText}>
            {texts['browse']}
          </HoverText>
        </Text>
        <Text extraSmall greyMedium>
          {texts['supportedPictures']}
        </Text>
      </View>
    </div>
  );
};

const customStyles = {
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  containerActive: {
    border: 'dashed 2px',
    borderRadius: 4,
    borderColor: 'rgba(224, 11, 11, 0.25)',
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  containerInactive: {
    border: 'dashed 2px',
    borderRadius: 4,
    borderColor: 'rgba(150, 150, 150, 0.29)',
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: '100%',
    width: '100%',
  },
};

const styles = StyleSheet.create({
  imagesContainer: {
    paddingBottom: 27,
  },
  content: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#585757',
    fontSize: 15,
    marginBottom: 6,
  },
  hoverText: {
    color: Color.errorColor,
  },
  imageUpload: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderColor: Color.greyColor,
    borderWidth: 1,
  },
});
