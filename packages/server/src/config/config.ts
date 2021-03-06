import * as convict from 'convict';
import * as yaml from 'js-yaml';
import * as appRoot from 'app-root-path';
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
});

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.safeLoad });

const envFilePath = `${appRoot}/packages/server/.env.yml`;
if (fs.existsSync(envFilePath)) {
  config.loadFile(envFilePath);
}

config.validate({ allowed: 'error' });
