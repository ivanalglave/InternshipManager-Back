# Nodejs Base image
FROM node
# install and app dependencies
COPY . ./
RUN npm install -g @nestjs/cli
RUN npm ci
RUN mkdir /dist
RUN mkdir /dist/config
#RUN npm run build
RUN echo '\n\
{\n\
  "server": {\n\
    "uri": "localhost",\n\
    "port": 3001\n\
  },\n\
  "resources": {\n\
    "internshipAgreements": "internship-agreements"\n\
  },\n\
  "mongodb": {\n\
    "uri": "mongodb://db:27017/internship-manager"\n\
  },\n\
  "mailgun": {\n\
    "apiKey": "5d9beaef19aaa5bb01aa59bd48a12501-f7d687c0-d4d95492",\n\
    "domain": "sandboxab7a8915c6f942d599319a95f74da7a6.mailgun.org"\n\
  }\n\
}' >> /dist/config/config.json
#COPY /app/dist/config/config.template.json /app/dist/config/config.json
# start app
EXPOSE 3001
CMD [ "npm", "run","start:dev" ]
