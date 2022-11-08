import * as _config from './config.json';
import { IConfig } from './config.model';

const config = _config as IConfig;

export const server = config.server;
export default config;
