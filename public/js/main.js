
$(document).ready(function () {

	function deletePlant(id) {

		$.ajax({
			url: "/admin/delete/" + id,
			method: "DELETE",
		}).then(function () {
			
			location.reload();
		});
	};

	function editPlant(id, plant_edit) {
		
		$.ajax({
			url: "/admin/edit/" + id,
			type: "PUT",
			data: plant_edit
		});
		location.reload();
	}


	function addPlant(plant) {
		
		$.post("/admin/plant/create", plant, function (reply) {
			
			var plant_added = `<h2 class="plant_click" data-id=${reply.id}>${reply.name}</h2><button class="deleteBtn" data-id=${reply.id}>X</button>`;
			$(".hold_plants").append(plant_added);
			plantListener();
		});
	}

	function editListener() {
		$(".selected .editBtn").on("click", function () {
			var plant_clicked = $(this);
			var id = parseInt(plant_clicked.attr("data-id"));
		
			var plant_edit = {
				name: "Lily",
				description: "Either a flower or sometimes a person!",
				instructions: "This needs to sit in Water"
			};

			editPlant(id, plant_edit);
		})
	}

	function displayPlant(plant) {
		$(".selected").empty();

		var selected = `
<button class="editBtn" data-id=${plant.id}>Edit<button>
<h1>${plant.name}</h1>
<p>${plant.description}<p>
<p>${plant.instructions}<p>`

		
		$(".selected").append(selected);
		editListener();
	}

	
	$("#plantBtn").on("click", function () {
	
		var plant = {
			name: "Rose",
			description: "A very beautiful flower",
			instructions: "Water it, or else it will die"
		};

		addPlant(plant);
	});

	$(".hold_plants .deleteBtn").on("click", function () {
		
		var id = parseInt($(this).attr("data-id"));

		deletePlant(id);
	});

	function plantListener() {
		$(".hold_plants .plant_click").on("click", function () {
	
			var id = parseInt($(this).attr("data-id"));
	
			$.get("/admin/plant/" + id).then(function (plant) {
				displayPlant(plant);
			});
		});
	}
	
	plantListener();
});
