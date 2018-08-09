var db = require("./../models");
var request = require('request');
var axios = require('axios');
var base64Img = require('base64-img');

module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("home");
	});

	app.post('/api/generateQR', function(req, res){
		var plantArrayData = req.body.plantArrayData;
		var queryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + plantArrayData + "";

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