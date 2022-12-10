# IntershipManager
The whole lifecycle of internship agreements in one app !

This is the **REST API** connecting to the InternshipManager front end application to manage **CRUD** operations.

## Installation

Built using [node](https://nodejs.org/en/)@v16.10.0 !

### Setting up NestJS

If you don't already have NestJS as a global dependency, execute the following :

```bash
$ npm install -g @nestjs/cli
```

You may need to restart your console to be able to use the NestJS commands.

### Setting up dependencies

Use npm to download all the dependencies :

```bash
$ npm install
```

### Setting up your config file

In `/src/config/`, make a copy of the file `config.template.json` and rename it to `config.json`. 
Set the following field :

```json
"server": {
  "port": 3001
},
```

This is the port the server will run on.
You may replace `3001` by any port you wish to run the server on.

### Setting up the database

This server uses [Mongodb](https://www.mongodb.com/) for persistent data storage. To initiate the database, you must have an instance of mongo running. You may use the dockerfile located in `docker/` at the root of the project and run the command `$ docker-compose up -d` to create and run a mongo instance as a background task (get [Docker](https://www.docker.com/)).
In the `src/config/config.json`, set the following field :

```json
"mongodb": {
  "uri": "mongodb://localhost:27017/internship-manager"
}
```

In the event you wish to run mongo on another port or use another collection, make sure to update the **uri** in the config file.

## Running the app

To start the app in development mode, use :
```bash
$ npm run start:dev
```

To start the app in production mode, use :
```bash
$ npm run start:prod
```

Any other command used to start might have *undefined behaviour* at runtime, as above commands may set environment variables required at runtime.

Check the [license](LICENSE).
