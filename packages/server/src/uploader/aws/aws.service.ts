import * as AWS from 'aws-sdk';
import { PassThrough } from 'stream';
import { ImageUploader } from '../image-uploader';
import { config } from '../../config/config';

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  region?: string;
};

export class AwsService implements ImageUploader {
  private s3: AWS.S3;
  private config: S3UploadConfig;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: config.get('awsAccessKeyId'),
      secretAccessKey: config.get('awsSecretAccessKey'),
      params: { Bucket: config.get('awsBucketName') },
    });

    this.config = {
      accessKeyId: config.get('awsAccessKeyId'),
      secretAccessKey: config.get('awsSecretAccessKey'),
      bucketName: config.get('awsBucketName'),
    };
  }

  public getAwsS3() {
    return this.s3;
  }

  public getConfig() {
    return this.config;
  }

  public createUploadStream(key: string, mimetype?: string) {
    const pass = new PassThrough();

    return {
      writeStream: pass,
      link: this.s3
        .upload({
          Bucket: this.config.bucketName,
          Key: key,
          Body: pass,
          ContentType: mimetype,
          ACL: 'public-read',
        })
        .promise()
        .then((value) => value.Location)
        .catch((error) => {
          throw error;
        }),
    };
  }

  public async uploadImage(image: any, key: string) {
    return this.s3
      .upload({
        Bucket: this.config.bucketName,
        Key: key,
        Body: image,
        ACL: 'public-read',
      })
      .promise()
      .then((data) => data.Location)
      .catch((error) => {
        throw error;
      });
  }
}
