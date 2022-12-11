import { IConfig } from './config.model';
import { readFileSync } from 'fs';
import * as path from 'path';

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
    // This shouldn't happen
    console.log('\x1b[31mFATAL: Cannot load config.\x1b[0m');
    config = null;
    break;
}

// Export config
export default config;
