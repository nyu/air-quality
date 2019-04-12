// routes/d_routes.js
const Sequelize		 = require('sequelize');
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

const passphrase = "smartcities";

const atts = ["location",
	"time",
	"timezone",
	"name",
	"temp",		//Temperature
	"humidity",	//Humidity
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	"pm2_5",
	"pm5",
	"CO2",		//Carbone Dioxide
	"CO",		//Carbone Monoxide
	"O2",
	"CH4",		//Methane
	"SO2",
	"H2S",
	"NO",
	"NO2",
	"O3",
	"AH"];

module.exports = function(app,db) {	
	//POST Request
	app.post('/datapi/data', (req, res) => {
		console.log(req.body);
		if(req.body["teapot"] == passphrase){
			//Process Request: 
			try{
				var tAtts = Array.apply(null, Array(atts.length)).map(function (x, i) {
					return req.body[atts[i]];
				});
				console.log(tAtts);

				var point = Dataset.create({
					location: tAtts[0],
					time: tAtts[1],
					timezone: tAtts[2],
					name: tAtts[3],
					temp: tAtts[4],		//Temperature
					humidity: tAtts[5],	//Humidity
					////////////////////////////////////////////////////////////////////////
					////////////////////////////////////////////////////////////////////////
					pm2_5: tAtts[6],
					pm5: tAtts[7],
					CO2: tAtts[8],		//Carbone Dioxide
					CO: tAtts[9],		//Carbone Monoxide
					O2: tAtts[10],
					CH4: tAtts[11],		//Methane
					SO2: tAtts[12],
					H2S: tAtts[13],
					NO: tAtts[14],
					NO2: tAtts[15],
					O3: tAtts[16],
					AH: tAtts[17]	
				});
				return res.send("Post 200");

			}catch(e){
				return res.send("Post 408"); //Something went wrong
			}
		}
		return res.send("Post 418");	//old teapot
	});


	app.get('/datapi', (req, res) =>{
		console.log(req.body);
		res.send("Get 200");
	});
};