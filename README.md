# AirQuality

*This is the source code for the website of the NYU Shanghai air quality monitoring network.*

[airquality.engineering.nyu.edu](https://airquality.engineering.nyu.edu/)


## Development

This is how to run the code locally for development. All data will be mocked.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- `$ yarn` to install packages

### Running

Just run the following command to start a development server with live-reload. **Note that the server must be manually restarted after changes to the backend.**

```
$ yarn dev
```

## Production

This is how to run it on a production server. Of course, this works exactly the same locally, if you want to test it out. **All data is being mocked as well, until I stop being lazy and add a database entry with the request body.**

### Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Create a file called `.env` with the contents set to `SECRET_KEY=<some secret key here>` (the key should be kept private and is used to secure communications)

### Running

You can append the `-d` flag to start it in the backgroun. If you *do* use this flag you can run `docker-compose down` to terminate it.

```
$ docker-compose up --build
```

You will likely need `sudo` for this - you can remove this restriction by running the following command.

```
$ sudo usermod -aG docker $USER
```

### Restarting

Although it's unlikely that this will be updated a lot - if you want to restart with the lowest amount of downtime possible run the following commands instead of anything above.

```
$ docker-compose build
$ docker-compose down
$ docker-compose up -d
```
