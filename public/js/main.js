// ajax call to POST new_plant. send it so i can get it via req.body
$(document).ready(function() {
	function searchPlant(plantName) {
		console.log("running", plantName);
		var queryURL = `https://plantsdb.xyz/search?limit=1&Common_name=${plantName}`;
		var plantArray = [];

		$.ajax({
			url: queryURL,
			method: "GET"

		}).then(function (response) {

			for (i = 0; i < response.data.length; i++) {
				var Accepted_Symbol_x, Category, Class, Common_Name, Division, Drought_Tolerance, Duration, Family, Family_Common_Name, Family_Symbol, Fire_Resistance, Fire_Tolerance, Flower_Color, Fodder_Product, Frost_Free_Days_Minimum, Fruit_Color, Fruit_Conspicuous, Fruit_Seed_Abundance, Fruit_Seed_Period_Begin, Fruit_Seed_Period_End, Fruit_Seed_Persistence, Genus, Invasive, Kingdom, Lifespan, Moisture_Use, Nitrogen_Fixation, Scientific_Name_x, Scientific_Name_y, Seed_Spread_Rate, Seeds_per_Pound, Shade_Tolerance, Species, State_and_Province, SubClass, plantSymbol, Temperature_Minimum_F, id, xOrder, Subclass




				Accepted_Symbol_x = response.data[i].Accepted_Symbol_x
				Category = response.data[i].Category
				Class = response.data[i].Class
				Common_Name = response.data[i].Common_Name
				Division = response.data[i].Division
				Drought_Tolerance = response.data[i].Drought_Tolerance
				Duration = response.data[i].Duration
				Family = response.data[i].Family
				Family_Common_Name = response.data[i].Family_Common_Name
				Family_Symbol = response.data[i].Family_Symbol
				Fire_Resistance = response.data[i].Fire_Resistance
				Fire_Tolerance = response.data[i].Fire_Tolerance
				Flower_Color = response.data[i].Flower_Color
				Fodder_Product = response.data[i].odder_Product
				Frost_Free_Days_Minimum = response.data[i].Frost_Free_Days_Minimum
				Fruit_Color = response.data[i].Fruit_Color
				Fruit_Conspicuous = response.data[i].Fruit_Conspicuous
				Fruit_Seed_Abundance = response.data[i].Fruit_Seed_Abundance
				Fruit_Seed_Period_Begin = response.data[i].Fruit_Seed_Period_Begin
				Fruit_Seed_Period_End = response.data[i].Fruit_Seed_Period_End
				Fruit_Seed_Persistence = response.data[i].Fruit_Seed_Persistence
				Genus = response.data[i].Genus
				Invasive = response.data[i].Invasive
				Kingdom = response.data[i].Kingdom
				Lifespan = response.data[i].Lifespan
				Moisture_Use = response.data[i].Moisture_Use
				Nitrogen_Fixation = response.data[i].Nitrogen_Fixation
				Scientific_Name_x = response.data[i].Scientific_Name_x
				Scientific_Name_y = response.data[i].Scientific_Name_y
				Seed_Spread_Rate = response.data[i].Seed_Spread_Rate
				Seeds_per_Pound = response.data[i].Seeds_per_Pound
				Shade_Tolerance = response.data[i].Shade_Tolerance
				Species = response.data[i].Species
				State_and_Province = response.data[i].State_and_Province
				SubClass = response.data[i].SubClass
				plantSymbol = response.data[i].lantSymbol
				Temperature_Minimum_F = response.data[i].Temperature_Minimum_F
				id = response.data[i].id
				xOrder = response.data[i].xOrder
				//    console.log(Genus+" " + Invasive +" "+  Kingdom + " " +Lifespan + "  " +Moisture_Use + " " + Scientific_Name_x + " "+ Species + " " + State_and_Province +" "+ Subclass + " "+ plantSymbol + " " +Accepted_Symbol_x + " " + Class + " " + Common_Name + " " +Category + ""+ Class + "" + Division+ ""+Family );
				//    console.log (id + " " + Class);
				//    console.log(Accepted_Symbol_x+"  "+ Category+"  "+Class + "" + Division+ ""+Family);
				plantArray.push("Common Name: ", Common_Name, "Genus: ", Genus, "Kingdom: ", Kingdom, "Lifespan: ", Lifespan, " Scientific Name: ", Scientific_Name_x, "Species:  ", Species, "State and Province: ", State_and_Province, "Class: ", Class, " Category: ", Category, "Division: ", Division, "Family: ", Family, "ID: ", id, " ");
				console.log("qr info  " + plantArray);
			}
			createQr(plantArray);
		});
	}

	//search button function to fire when clicked
	$("#QR").on("click", function () {
		event.preventDefault();
		// reseting plantArray each time search is clicked
		plantArray = [];
		//storing searched plant in variable to throw into searchPlant function
		var plant = $("#SearchFlower").val().trim();
		searchPlant(plant);

	});




// $("#QR").on("click", function (event) {
// 	event.preventDefault();
// 	createQr(plantArray);

// });
function createQr(plantArrayData) {
    var queryURL = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl= " + plantArrayData + "";
	// var queryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example";
	$('#qRCodeImg').attr("src", queryURL);

	// $.ajax({

	// 	url: queryURL,
	// 	method: "GET",

	// }).then(function (response) {
	// 	console.log(response);
	// 	// var buf = new Buffer(response, 'base64');
	// 	// console.log(buf);

	// });
}


	
	function deletePlant(id) {
		// Ajax call to delete plant with the id equal to the id passed 
		$.ajax({
			url: "/admin/delete/" + id,
			method: "DELETE",
		}).then(function() {
		// Reload the page
			location.reload();
		});
	};

	function editPlant(id, plant_edit) {
		//ajax call to edit plant in the data base
		$.ajax({
			url: "/admin/edit/" + id,
			method: "PUT",
			data: plant_edit
		}).then()
	}


	function addPlant(plant) {
		// Create a Plant in the database
		$.post("/admin/plant/create", plant, function(reply) {
		// Reload Page
			location.reload();
		});
	}

	function displayPlant(plant) {
		$(".selected").empty();

		var selected = `
<button class="editBtn" data-id=${plant.id}>Edit<button>
<h1>${plant.name}</h1>
<p>${plant.description}<p>
<p>${plant.instructions}<p>`

		// Display plant info on the webpage
		$(".selected").append(selected);
	}
	
	// This Button will be a Submit button
	$("#plantBtn").on("click", function() {
		console.log("this was hit!")
		// Create a plant object by grabbing the inputs of the admin.
		// The property values will need to be made by using jquery to grab the input values of the admin user
		var plant = {
			name: "Rose",
			description: "A very beautiful flower",
			instructions: "Water it, or else it will die"
		};
		
		// Add plant to the database
		addPlant(plant);
	});

	// When the Delete button is pressed
	$(".hold_plants .deleteBtn").on("click", function() {
		// Grab the plant's id
		var id = parseInt($(this).attr("data-id"));
		
		// Delete the Plant from the database
		deletePlant(id);
	})

	// When the Plant Button is Clicked
	$(".hold_plants .plant_click").on("click", function() {
		// Get the info of the plant from the data base
		
		var id = parseInt($(this).attr("data-id"));
		
		$.get("/admin/plant/" + id).then(function(plant) {
			displayPlant(plant);
		});

		// Put the plant data into html code
		
	});

	$(".selected .editBtn").on("click", function() {
		var id = parseInt($(this).attr("data-id"));
		console.log("Hope this works")
		var plant_edit = {
			name: "Lily",
			description: "Either a flower or sometimes a person!",
			instructions: "This needs to sit in Water"
		};

		editPlant(id, plant_edit);
		
		$.get("/admin/plant/" + id).then(function(plant) {
			displayPlant(plant);
		});
	})

});
