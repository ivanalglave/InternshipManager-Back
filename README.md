# IntershipManager
The whole lifecycle of internship agreements in one app !

This is the **REST API** connecting to the InternshipManager front end application to manage **CRUD** operations.

## Installation

Built using [node](https://nodejs.org/en/)@v16.10.0 !

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

This server uses [Mongodb](https://www.mongodb.com/) for persistent data storage. To initiate the database, you must have an instance of mongo running. You may use the dockerfile located in `docker/` at the root of the project and run the command `docker-compose up -d` to create and run a mongo instance as a background task (get [Docker](https://www.docker.com/)).
In the `src/config/config.json`, set the following field :

```json
"mongodb": {
  "uri": "mongodb://localhost:27017/internship-manager"
}
```

In the event you wish to run mongo on another port or use another collection, make sure to update the **uri** in the config file.

## Running the app

For development purposes, we use :

```bash
$ nest start --watch
```

But you may use, according to what you need :

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Check the [license](LICENSE).
