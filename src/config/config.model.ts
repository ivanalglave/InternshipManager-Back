export interface IServerConfig {
  port: number;
}

export interface IMongodbConfig {
  uri: string;
}

export interface IConfig {
  server: IServerConfig;
  mongodb: IMongodbConfig;
}
