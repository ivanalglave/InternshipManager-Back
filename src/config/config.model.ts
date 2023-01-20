interface IServerConfig {
  uri: string;
  port: number;
}

interface IResources {
  root: string;
  agreements: string;
}

interface IMongodbConfig {
  uri: string;
}

interface IMailgunConfig {
  apiKey: string;
  domain: string;
}

export interface IConfig {
  server: IServerConfig;
  resources: IResources;
  mongodb: IMongodbConfig;
  mailgun: IMailgunConfig;
}
