import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

export const generateRNFile = (uri: string, name: string) => {
  const mimeType: string = mime.lookup(uri).split('/');
  const type = `image/${mimeType[1] || '*'}`;
  return uri
    ? new ReactNativeFile({
        uri,
        type,
        name: name + `.${mimeType[1]}`,
      })
    : null;
};

export const bufferToArrayBuffer = (buf: Buffer) => {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
};

export const newFile = (imageBuffer: Buffer, name: string, type: string) =>
  new File([bufferToArrayBuffer(imageBuffer)], name, { type });
