# NYU Air Quality Project

*This is the source code for the website of the NYU Shanghai air quality monitoring network.*

Currently live at [airquality.engineering.nyu.edu](http://airquality.engineering.nyu.edu/).

## Development

This is how to run the code locally for development.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Packages

Install the needed packages by running the following commands.

```
$ cd server; yarn

$ cd ../worker; yarn

$ cd ..
```

### Running

Open three terminal sessions, one in the root folder, one in `server/`, and one in `worker/`.

In the root folder run `docker-compose up db --build`.

In `server/` simply run `yarn dev`.

In `worker/` run `yarn start`. Note that after making changes you'll have to re-run this command.

Now visit [localhost:3000](http://localhost:3000/) in your browser to check out the website. If you want to look at the MongoDB database it's available on port 27017.

## Production

This is how to run this on a production server.

### Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running

Just run this command in the project's directory. To restart you can run the same command again!

```
$ docker-compose up -d --build
```
