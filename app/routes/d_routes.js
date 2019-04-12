// routes/d_routes.js

module.exports = function(app,db) {	
	app.post('/data', (req, res) => {
		console.log(req.body)

		res.send("Post 200");
	});
};