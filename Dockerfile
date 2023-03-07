# Nodejs Base image
FROM node
# install and app dependencies
COPY . .
RUN npm install -g @nestjs/cli
RUN npm ci
RUN mkdir /dist
RUN mkdir /dist/config
RUN npm run build
RUN echo '{\n\
  "server": {\n\
    "uri": "localhost",\n\
    "port": 3002\n\
  },\n\
  "resources": {\n\
    "internshipAgreements": "internship-agreements"\n\
  },\n\
  "mongodb": {\n\
    "uri": "mongodb://db:27018/internship-manager"\n\
  },\n\
  "mailgun": {\n\
    "apiKey": "5d9beaef19aaa5bb01aa59bd48a12501-f7d687c0-d4d95492",\n\
    "domain": "sandboxab7a8915c6f942d599319a95f74da7a6.mailgun.org"\n\
  }\n\
}' >> /dist/config/config.json

RUN echo '{\n\
  "server": {\n\
    "uri": "localhost",\n\
    "port": 3002\n\
  },\n\
  "resources": {\n\
    "internshipAgreements": "internship-agreements"\n\
  },\n\
  "mongodb": {\n\
    "uri": "mongodb://db:27018/internship-manager"\n\
  },\n\
  "mailgun": {\n\
    "apiKey": "5d9beaef19aaa5bb01aa59bd48a12501-f7d687c0-d4d95492",\n\
    "domain": "sandboxab7a8915c6f942d599319a95f74da7a6.mailgun.org"\n\
  }\n\
}' >> /dist/config/config.prod.json

RUN mkdir /dist/main
RUN echo '"use strict";\n\
Object.defineProperty(exports, "__esModule", { value: true });\n\
const config_1 = require("./config");\n\
const common_1 = require("@nestjs/common");\n\
const core_1 = require("@nestjs/core");\n\
const app_module_1 = require("./app.module");\n\
async function bootstrap() {\n\
    const env = process.env.NODE_ENV;\n\
    const app = await core_1.NestFactory.create(app_module_1.AppModule);\n\
    if (env === 'dev') {\n\
        app.enableCors();\n\
    }\n\
    else if (env === 'prod') {\n\
    }\n\
    else {\n\
    }\n\
    await app.useGlobalPipes(new common_1.ValidationPipe({\n\
        whitelist: true,\n\
        forbidNonWhitelisted: true,\n\
    }));\n\
    await app.listen(config_1.default.server.port);\n\
}\n\
bootstrap();\n\
//# sourceMappingURL=main.js.map' >> /dist/main/main.js
#COPY /app/dist/config/config.template.json /app/dist/config/config.json
# start app
CMD [ "npm", "run","start:dev" ]