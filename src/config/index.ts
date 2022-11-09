import * as _config from './config.template.json';
import { IConfig } from './config.model';

const config = _config as IConfig;

export const server = config.server;
export const mongodb = config.mongodb;
export default config;
