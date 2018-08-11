var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("home");
	});
	
	app.get("/plant/:id", function(req, res) {
		var id = parseInt(req.params.id);

		db.Plant.findById(id).then(project => {
			console.log(project.dataValues);
			res.render("plant", project.dataValues);
		})

	});

	app.get("/test", function(req, res) {
		db.Category.bulkCreate([
			{name: "Flowers"},
			{name: "Trees"},
			{name: "Shrubs"}
		]).then(function() {
			db.Plant.bulkCreate([
				{name: "Rose", description: "Good smelling flower", instructions: "Water it", category: "Flowers"},
				{name: "Pine Tree", description: "Looks like a Christmas Tree", instructions: "Plant it out side in the ground", category: "Trees"},
				{name: "Fern", description: "Healthy looking bush", instructions: "Don't let it die", category: "Shrubs"}
			])
		}).then(function() {
			db.Category.findAll({}).then(function(categories) {
				console.log(categories);
				res.render("test", {category: categories});
			})
		});		
	})
};