// routes/d_routes.js

module.exports = function(app,db) {	
	app.post('/datapi/data', (req, res) => {
		console.log(req.body);

		res.send("Post 200");
	});
	app.get('/datapi', (req, res) =>{
		console.log(req.body);
		res.send("Get 200");
	});
};