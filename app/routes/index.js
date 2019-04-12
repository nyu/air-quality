// routes/index.js

const dRoutes = require('./d_routes');

module.exports = function(app, db) {
	dRoutes(app, db);
	//more groups here (possibly)
};