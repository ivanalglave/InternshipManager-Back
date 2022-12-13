import { IConfig } from './config.model';
import { readFileSync } from 'fs';
import * as path from 'path';
import { exit } from 'process';

// Store file local path in var for lisibility
const CONFIG_DEV = 'config.json';
const CONFIG_PROD = 'config.prod.json';

let config;
// Load config based on env
switch (process.env.NODE_ENV) {
  case 'dev':
    // Load 'dev' config
    config = JSON.parse(
      readFileSync(path.join(__dirname, CONFIG_DEV), 'utf-8'),
    ) as IConfig;
    break;
  case 'prod':
    // Load 'prod' config
    config = JSON.parse(
      readFileSync(path.join(__dirname, CONFIG_PROD), 'utf-8'),
    ) as IConfig;
    break;
  default:
    // This happens when the environment isn't set
    console.log(
      '\x1b[31mFATAL: Cannot load config.\nInvalid application environment. Did you read the \x1b[4mREADME\x1b[0m\x1b[31m ?\x1b[0m',
    );
    exit(-1);
}

// Export config
export default config;
