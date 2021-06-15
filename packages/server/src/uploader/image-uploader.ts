import { PassThrough } from 'stream';

export const IMAGE_UPLOADER = 'image uploader';

export type UploadStream = {
  writeStream: PassThrough;
  link: Promise<string>;
};

export interface ImageUploader {
  createUploadStream: (key: string, mimetype?: string) => UploadStream;
  uploadImage?: (image: any, key: string, mimetype?: string) => Promise<string>;
  deleteImage?: (key: string) => Promise<boolean>;
}
