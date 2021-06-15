import * as convict from 'convict';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export const config = convict({
  server: {
    port: {
      doc: 'The port to bind',
      format: 'port',
      default: 3000,
      env: 'BACKEND_PORT',
    },
  },
  db: {
    url: {
      doc: 'The access url for mongodb',
      format: 'String',
      default: '',
      env: 'MONGO_DB_ACCESS_URL',
    },
  },
  jwtSecret: {
    doc: 'The secret used for signing JWT tokens',
    format: String,
    default: '',
    env: 'JWT_SIGNING_SECRET',
  },
  runSeeders: {
    doc: 'If this value is true, run the seeders at start.',
    format: Boolean,
    default: false,
    env: 'RUN_SEEDERS',
  },
  google: {
    apiKey: {
      doc: 'Api key to access google Identity Toolkit API, Directions API. Used for phone number validation and delivery time estimation.',
      format: String,
      default: '',
      env: 'GOOGLE_API_KEY',
    },
  },
  facebookUrl: {
    doc: 'The facebook graph API url',
    format: String,
    default: '',
    env: 'FACEBOOK_API_URL',
  },
  awsAccessKeyId: {
    doc: 'AWS access key id',
    format: String,
    default: '',
    env: 'AWS_ACCESS_KEY_ID',
  },
  awsSecretAccessKey: {
    doc: 'AWS secret access key',
    format: String,
    default: '',
    env: 'AWS_SECRET_ACCESS_KEY',
  },
  awsBucketName: {
    doc: 'AWS bucket name',
    format: String,
    default: '',
    env: 'AWS_BUCKET_NAME',
  },
  debugMode: {
    doc: 'If this value is true, the logger is turned on.',
    format: Boolean,
    default: false,
    env: 'DEBUG_MODE',
  },
});

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.safeLoad });

const envFilePath = './.env.yml';
if (fs.existsSync(envFilePath)) {
  config.loadFile(envFilePath);
}

config.validate({ allowed: 'error' });
