// server.js

const express        = require('express');
const Sequelize		 = require('sequelize');
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;

const sequelize 	 = new Sequelize('AirQualityData', 'iothosti', 'PM2.5', {
	host:'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,

	storage: 'AirQualityData.sqlite',
});

const Dataset = sequelize.define('dataset', {
	location: Sequelize.STRING,
	time: Sequelize.STRING,
	timezone: Sequelize.STRING,
	name: Sequelize.STRING,
	temp: Sequelize.STRING,		//Temperature
	humidity: Sequelize.STRING,	//Humidity
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	pm2_5: Sequelize.STRING,
	pm5: Sequelize.STRING,
	CO2: Sequelize.STRING,		//Carbone Dioxide
	CO: Sequelize.STRING,		//Carbone Monoxide
	O2: Sequelize.STRING,
	CH4: Sequelize.STRING,		//Methane
	SO2: Sequelize.STRING,
	H2S: Sequelize.STRING,
	NO: Sequelize.STRING,
	NO2: Sequelize.STRING,
	O3: Sequelize.STRING,
	AH: Sequelize.STRING		//Absolute Humidity
});

app.use(bodyParser.urlencoded( {extended: true} ))

require('./app/routes')(app, {});
Dataset.sync();
app.listen(port, ()=> {
	console.log('we are live on ' + port);
});