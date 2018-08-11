var db = require("../models");

module.exports = function (app) {
	app.get("/admin", function (req, res) {

		db.Plant.findAll({}).then(function (plant) {
			res.render("admin", { plant: plant });
		});
	});

	app.get("/admin/plant/:id", function (req, res) {

		db.Plant.findAll({
			where: {
				id: parseInt(req.params.id)
			}
		}).then(function (data) {
			res.send(data[0]);
		});
	});

	app.post("/admin/plant/create", function (req, res) {

		db.Plant.create(req.body).then(function (data) {
			res.json(data);
		});
	});

	app.delete("/admin/delete/:id", function (req, res) {
		db.Plant.destroy({
			where: {
				id: req.params.id
			}
		}).then(function (data) {

			res.json(data);
		});
	});

	app.put("/admin/edit/:id", function (req, res) {

		db.Plant.update(req.body, {
			where: {
				id: req.params.id
			}
		});
	});

	app.post('/api/generateQR', function(req, res){
		var plantArrayData = req.body.plantArrayData;
		var queryURL = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + plantArrayData + "";
		// var queryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + plantArrayData + "";

		// axios.get(queryURL)
		// 	.then(function (response) {
		// 		console.log(response);
		// 		res.send(response)
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 		res.send(error)
		// 	});

		request(queryURL, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
			console.log(response);
			res.json({qr: body})
		})
		
	});


};
};