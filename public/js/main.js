$(document).ready(function () {
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
				plantArray.push("Common Name: "+ Common_Name+ "Genus: "+ Genus+ "Kingdom: "+ Kingdom+ "Lifespan: "+ Lifespan+ " Scientific Name: "+ Scientific_Name_x+ "Species:  "+ Species+ "State and Province: "+ State_and_Province+ "Class: "+ Class+ " Category: "+ Category+ "Division: "+ Division+ "Family: "+ Family+ "ID: "+ id+ " ");
				console.log("qr info  " + plantArray);
				$("#searchPInfo").append(plantArray);
			}
			
		});
	}

	$("#searchPlantDB").on("click", function(){
		event.preventDefault();
		$("#searchPInfo").empty();
		plantArray = [];
		var plant = $("#searchP").val().trim();
		searchPlant(plant);
		
		 
		console.log(plantArray)
	});





	// $("#QR").on("click"+ function (event) {
	// 	event.preventDefault();
	// 	createQr(plantArray);

	// });


	function createQr(id) {
		var queryURL = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=http://localhost:8080/plant/" + id;
		// var queryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example";
		$.ajax({

			url: queryURL,
			 method: "GET",
		
			}).then(function (response) {
				console.log("qr"+response);
			// 	// var buf = new Buffer(response, 'base64');
			// 	// console.log(buf);
			console.log(queryURL);
			$('#QRimg').attr("src", queryURL);
			// });
		})
		
	}


	function deletePlant(id) {
		
		$.ajax({
			url: "/admin/delete/" + id,
			method: "DELETE",
		});

		$(`a[data-id=${id}]`).remove();
	};

	function editPlant(id, plant_edit) {

		$.ajax({
			url: "/admin/edit/" + id,
			type: "PUT",
			data: plant_edit
		}).then(function() {
			location.reload();
		});
		
	}

	$("#addBtn").on("click", function() {
		
		addPlant();
		
	})

	function addPlant() {
		
		var plant = {
			name: $("#Name").val(),
			description: $("#Description").val(),
			instructions: $("#Instructions").val()
		};

		$("#Name").val("");
		$("#Description").val(" ");
		$("#Instructions").val(" ");

		$.post("/admin/plant/create", plant, function (reply) {
			// var plant_added = `<h2 class="plant_click" data-id=${reply.id}>${reply.name}</h2><button class="deleteBtn" data-id=${reply.id}>X</button>`;
		var plant_added = `<a class="plant_click dropdown-item" data-id=${reply.id}>${reply.name}</a>`;
			$("#Plants").append(plant_added);
			plantListener();
		});
	}

	function editListener() {
		$(".editBtn").on("click", function () {
			var plant_clicked = $(this);
			var id = parseInt(plant_clicked.attr("data-id"));

			var plant_edit = {
				name: $("#editName"),
				description: $("#editDescription"),
				instructions: $("#editInstructions")
			};

			editPlant(id, plant_edit);
		})
	}

	function displayPlant(plant) {
		
		$("#display_name").text(plant.name);
		$("#display_description").text(plant.description);
		$("#display_instructions").text(plant.instructions);
		$("#deleteBtn").attr("data-id", plant.id);
		$("#editBtn").attr("data-id", plant.id);

		createQr(plant.id);
		editListener();
		console.log(createQr(plant.id));
	}

	$("#deleteBtn").on("click", function () {
		var id = $(this).attr("data-id");
		
		deletePlant(id);
	});

	function plantListener() {
		$("#Plants .plant_click").on("click", function () {

			var id = parseInt($(this).attr("data-id"));

			$.get("/admin/plant/" + id).then(function (plant) {
				displayPlant(plant);
			});
		});
	}
	plantListener();
});